import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'portfolio_admin_session';
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in ms

const SESSION_SECRET = process.env.SESSION_SECRET || 'fallback-secret-at-least-32-chars-long';

// Get CryptoKey for HMAC-SHA256 signing/verification using Web Crypto API
async function getCryptoKey() {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(SESSION_SECRET);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Sign payload with HMAC-SHA256 and return hex signature
export async function signSession(payload: string): Promise<string> {
  const key = await getCryptoKey();
  const encoder = new TextEncoder();
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  );
  return Array.from(new Uint8Array(signature))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Verify signature against payload
export async function verifySignature(payload: string, signatureHex: string): Promise<boolean> {
  const key = await getCryptoKey();
  const encoder = new TextEncoder();
  const expectedSigBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(payload)
  );
  const expectedSigHex = Array.from(new Uint8Array(expectedSigBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return expectedSigHex === signatureHex;
}

// Parse and verify a session token string
export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const [username, expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    if (isNaN(expiresAt) || expiresAt < Date.now()) {
      return null;
    }
    
    const payload = `${username}.${expiresAtStr}`;
    const isValid = await verifySignature(payload, signature);
    if (!isValid) return null;
    
    return username;
  } catch {
    return null;
  }
}

// Create and set a signed session cookie
export async function createSession(username: string) {
  const expiresAt = Date.now() + SESSION_DURATION;
  const payload = `${username}.${expiresAt}`;
  const signature = await signSession(payload);
  const cookieValue = `${payload}.${signature}`;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: new Date(expiresAt),
  });
}

// Verify current session from cookies
export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(SESSION_COOKIE_NAME);
  if (!cookie || !cookie.value) return false;
  
  const username = await verifySessionToken(cookie.value);
  return username !== null;
}

// Delete session cookie
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  });
}