import { NextRequest, NextResponse } from 'next/server';
import { saveMessage } from '@/lib/messages';

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }
    
    const saved = await saveMessage(name, email, message);
    return NextResponse.json({ success: true, message: saved });
  } catch {
    return NextResponse.json(
      { error: 'An error occurred while saving the message.' },
      { status: 500 }
    );
  }
}
