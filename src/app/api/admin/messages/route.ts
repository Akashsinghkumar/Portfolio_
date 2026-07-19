import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/lib/session';
import { getMessages, updateMessageStatus, deleteMessage } from '@/lib/messages';

// CSRF check helper
function verifyCsrf(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  const host = request.headers.get('host');
  
  if (origin) {
    const originUrl = new URL(origin);
    if (originUrl.host !== host) {
      return false;
    }
  } else if (referer) {
    const refererUrl = new URL(referer);
    if (refererUrl.host !== host) {
      return false;
    }
  }
  return true;
}

export async function GET(request: NextRequest) {
  try {
    // 1. Authentication Check
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 2. CSRF Check
    if (!verifyCsrf(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const messages = await getMessages();
    // Sort by newest first
    const sorted = [...messages].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    return NextResponse.json({ messages: sorted });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while fetching messages.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 1. Authentication Check
    const isAuthenticated = await verifySession();
    if (!isAuthenticated) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // 2. CSRF Check
    if (!verifyCsrf(request)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const { action, id } = await request.json();
    
    if (!action || !id) {
      return NextResponse.json(
        { error: 'Action and Message ID are required.' },
        { status: 400 }
      );
    }
    
    if (action === 'mark_read') {
      const success = await updateMessageStatus(id, 'read');
      return NextResponse.json({ success });
    } else if (action === 'mark_unread') {
      const success = await updateMessageStatus(id, 'unread');
      return NextResponse.json({ success });
    } else if (action === 'delete') {
      const success = await deleteMessage(id);
      return NextResponse.json({ success });
    }
    
    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while performing the action.' },
      { status: 500 }
    );
  }
}
