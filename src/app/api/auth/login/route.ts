import { NextRequest, NextResponse } from 'next/server';
import { getAdmin, verifyPassword } from '@/lib/admin';
import { verifyTOTP } from '@/lib/totp';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const { username, password, code } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    // 1. Get admin credentials
    const admin = await getAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: 'Admin account is not registered. Please create one.', requiresRegistration: true },
        { status: 404 }
      );
    }

    if (admin.username !== username) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // 2. Verify password hash using scrypt helper
    const isPasswordValid = await verifyPassword(password, admin.passwordHash);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // 3. Challenge for 2FA TOTP code if it's missing (Two-stage login flow)
    if (!code) {
      return NextResponse.json({ requires2FA: true });
    }

    // 4. Verify 2FA TOTP code
    const isCodeValid = verifyTOTP(admin.totpSecret, code);
    if (!isCodeValid) {
      return NextResponse.json(
        { error: 'Invalid 2FA code. Please verify that your authenticator clock is synced.' },
        { status: 401 }
      );
    }
    
    // 5. Trigger Security Notifications (Email + Inbox System Message)
    const userAgent = request.headers.get('user-agent') || 'Unknown Browser';
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1';
    
    const formattedTime = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'medium',
    });
    
    const alertMessageText = `New successful admin sign-in detected.\n\nDate/Time: ${formattedTime} (IST)\nIP Address: ${ip}\nBrowser: ${userAgent}\n\nIf this login was unauthorized, please change your credentials immediately.`;
    
    // Save to Admin Messages Box
    try {
      const { saveMessage } = await import('@/lib/messages');
      await saveMessage('System Security Alert', 'security@akashkumar.com', alertMessageText);
    } catch (err) {
      console.error('Failed to save security alert message:', err);
    }
    
    // Send email alert to admin
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587');
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    
    if (host && user && pass && admin.email) {
      try {
        const nodemailer = await import('nodemailer');
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });
        
        await transporter.sendMail({
          from: `"Portfolio Security" <${user}>`,
          to: admin.email,
          subject: "[Security Alert] Successful Admin Login Detected",
          text: `Hello ${admin.name || 'Admin'},\n\nA successful sign-in to your portfolio Admin Panel was detected.\n\nTime: ${formattedTime} (IST)\nIP Address: ${ip}\nBrowser: ${userAgent}\n\nIf this was you, you can ignore this alert. Otherwise, please reset your password and check your 2FA keys immediately.`,
          html: `<div style="font-family: sans-serif; padding: 25px; border: 1px solid #fee2e2; border-radius: 12px; background: #fffcfc; max-width: 500px; margin: 0 auto;">
            <h2 style="color: #b91c1c; margin-top: 0; display: flex; items-center: center; gap: 8px;">
              ⚠️ Security Alert: Admin Login Detected
            </h2>
            <p>Hello <strong>${admin.name || 'Admin'}</strong>,</p>
            <p>A successful sign-in to your portfolio Admin Panel was detected.</p>
            
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 20px 0; font-size: 13px; line-height: 1.6;">
              <strong>Time (IST):</strong> ${formattedTime}<br/>
              <strong>IP Address:</strong> ${ip}<br/>
              <strong>Browser/Device:</strong> ${userAgent}
            </div>
            
            <p style="font-size: 13px; color: #475569;">
              If this was you, no action is required. If this login was unauthorized, please change your admin password and inspect your 2FA authenticator settings immediately.
            </p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;"/>
            <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-bottom: 0;">
              Secure Security Monitoring System
            </p>
          </div>`
        });
      } catch (err) {
        console.error('Failed to send security alert email:', err);
      }
    } else {
      console.warn('SMTP or Admin email not configured. Security alert email skipped.');
    }
    
    // Establish session cookie
    await createSession(admin.username);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { error: 'An error occurred during authentication.' },
      { status: 500 }
    );
  }
}