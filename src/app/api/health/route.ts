import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const mongo = await connectToDatabase();
    if (mongo) {
      return NextResponse.json({ 
        status: 'ok', 
        mongodb: 'connected ✅',
        db: mongo.db.databaseName
      });
    } else {
      return NextResponse.json({ 
        status: 'fallback', 
        mongodb: 'not connected ❌ (using file storage)',
        reason: 'MONGODB_URI not set or unreachable'
      });
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      mongodb: 'failed ❌',
      error: String(error)
    }, { status: 500 });
  }
}
