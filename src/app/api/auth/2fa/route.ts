import { NextRequest, NextResponse } from 'next/server';
import { adminExists } from '@/lib/admin';
import { generateSecret } from '@/lib/totp';
import QRCode from 'qrcode';

export async function GET(request: NextRequest) {
  try {
    const exists = await adminExists();
    if (exists) {
      return NextResponse.json(
        { error: 'Admin account is already registered.' },
        { status: 400 }
      );
    }
    
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username') || 'admin';
    
    const secret = generateSecret();
    
    // Generate TOTP QR URI
    const otpauthUrl = `otpauth://totp/AkashKumarPortfolio:${username}?secret=${secret}&issuer=AkashKumarPortfolio`;
    
    // Generate SVG QR Code
    const qrSvg = await QRCode.toString(otpauthUrl, {
      type: 'svg',
      margin: 1,
      width: 200,
    });
    
    return NextResponse.json({ secret, qrSvg });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred during 2FA generation.' },
      { status: 500 }
    );
  }
}