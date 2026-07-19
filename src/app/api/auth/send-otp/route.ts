import { NextRequest, NextResponse } from 'next/server';
import { adminExists } from '@/lib/admin';
import { generateAndSendOTP } from '@/lib/otp';

export async function POST(request: NextRequest) {
  try {
    const exists = await adminExists();
    if (exists) {
      return NextResponse.json(
        { error: 'Admin account is already registered.' },
        { status: 400 }
      );
    }
    
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required.' },
        { status: 400 }
      );
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }
    
    await generateAndSendOTP(email.trim());
    
    // Check if SMTP settings exist
    const isSmtpConfigured = !!(
      process.env.SMTP_HOST && 
      process.env.SMTP_USER && 
      process.env.SMTP_PASSWORD
    );
    
    return NextResponse.json({ 
      success: true, 
      email: email.trim(),
      isSmtpConfigured 
    });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while sending OTP.' },
      { status: 500 }
    );
  }
}
