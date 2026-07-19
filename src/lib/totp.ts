import crypto from 'crypto';

// Decode a Base32 string into a Buffer
function decodeBase32(base32: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  const cleaned = base32.toUpperCase().replace(/=+$/, '');
  let bits = 0;
  let val = 0;
  const buffer = [];
  
  for (let i = 0; i < cleaned.length; i++) {
    const idx = alphabet.indexOf(cleaned[i]);
    if (idx === -1) {
      throw new Error('Invalid base32 character');
    }
    val = (val << 5) | idx;
    bits += 5;
    if (bits >= 8) {
      buffer.push((val >> (bits - 8)) & 255);
      bits -= 8;
    }
  }
  return Buffer.from(buffer);
}

// Generate the 6-digit TOTP code for a given time step
export function getTOTPCode(secret: string, timeStep: number): string {
  const key = decodeBase32(secret);
  const buf = Buffer.alloc(8);
  
  // Write 64-bit counter value
  const high = Math.floor(timeStep / 0x100000000);
  const low = timeStep % 0x100000000;
  buf.writeUInt32BE(high, 0);
  buf.writeUInt32BE(low, 4);
  
  const hmac = crypto.createHmac('sha1', key);
  hmac.update(buf);
  const hmacResult = hmac.digest();
  
  // Dynamic truncation
  const offset = hmacResult[hmacResult.length - 1] & 0xf;
  const binary =
    ((hmacResult[offset] & 0x7f) << 24) |
    ((hmacResult[offset + 1] & 0xff) << 16) |
    ((hmacResult[offset + 2] & 0xff) << 8) |
    (hmacResult[offset + 3] & 0xff);
  
  return (binary % 1000000).toString().padStart(6, '0');
}

// Generate a random 16-character Base32 secret for 2FA setup
export function generateSecret(): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let secret = '';
  const bytes = crypto.randomBytes(16);
  for (let i = 0; i < 16; i++) {
    secret += alphabet[bytes[i] % 32];
  }
  return secret;
}

// Verify TOTP code with time drift window (default ±1 step of 30 seconds)
export function verifyTOTP(secret: string, code: string, window = 1): boolean {
  try {
    const timeStep = Math.floor(Date.now() / 1000 / 30);
    for (let i = -window; i <= window; i++) {
      if (getTOTPCode(secret, timeStep + i) === code) {
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Error verifying TOTP:', error);
    return false;
  }
}