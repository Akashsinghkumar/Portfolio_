import { NextRequest, NextResponse } from 'next/server';
import { adminExists } from '@/lib/admin';
import { verifyOTP } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const exists = await adminExists();
    if (exists) {
      return NextResponse.json(
        { error: 'Admin account is already registered.' },
        { status: 400 }
      );
    }
    
    const { email, code } = await request.json();
    if (!email || !code) {
      return NextResponse.json(
        { error: 'Email and OTP code are required.' },
        { status: 400 }
      );
    }
    
    const isValid = await verifyOTP(email.trim(), code.trim());
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid or expired OTP code. Please try again.' },
        { status: 400 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while verifying OTP.' },
      { status: 500 }
    );
  }
}
