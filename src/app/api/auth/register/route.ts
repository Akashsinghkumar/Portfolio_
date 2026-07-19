import { NextRequest, NextResponse } from 'next/server';
import { adminExists, registerAdmin } from '@/lib/admin';
import { isEmailVerified } from '@/lib/otp';
import { verifyTOTP } from '@/lib/totp';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    // 1. Verify if an admin account is already registered
    const exists = await adminExists();
    if (exists) {
      return NextResponse.json(
        { error: 'Admin account is already registered.' },
        { status: 400 }
      );
    }

    const { 
      name, 
      mobile, 
      email, 
      profession, 
      username, 
      password, 
      totpSecret, 
      totpCode 
    } = await request.json();

    // 2. Validate required fields
    if (!name || !mobile || !email || !profession || !username || !password || !totpSecret || !totpCode) {
      return NextResponse.json(
        { error: 'All fields, including 2FA code, are required.' },
        { status: 400 }
      );
    }

    // 3. Username validation
    if (username.trim().length < 3) {
      return NextResponse.json(
        { error: 'Username must be at least 3 characters.' },
        { status: 400 }
      );
    }

    // 4. Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' },
        { status: 400 }
      );
    }

    // 5. Verify email OTP has been validated beforehand
    const emailVerified = await isEmailVerified(email.trim());
    if (!emailVerified) {
      return NextResponse.json(
        { error: 'Email verification via OTP is required before registration.' },
        { status: 400 }
      );
    }

    // 6. Verify 2FA TOTP code to ensure it was successfully configured
    const isTotpValid = verifyTOTP(totpSecret, totpCode);
    if (!isTotpValid) {
      return NextResponse.json(
        { error: 'Invalid 2FA code. Please verify that your authenticator clock is synced.' },
        { status: 400 }
      );
    }

    // 7. Register the admin in MongoDB (or local JSON fallback)
    await registerAdmin(
      username.trim(),
      password,
      totpSecret,
      name.trim(),
      mobile.trim(),
      email.trim(),
      profession.trim()
    );

    // 8. Establish the user session cookie
    await createSession(username.trim());

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Registration API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration.' },
      { status: 500 }
    );
  }
}