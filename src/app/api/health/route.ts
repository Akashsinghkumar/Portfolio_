import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI;
  
  // Check if env var is set at all
  const uriStatus = !uri 
    ? 'NOT SET ❌' 
    : uri.includes('<password>') || uri.includes('<db_password>')
      ? 'SET but has placeholder <password> ❌'
      : `SET ✅ (starts with: ${uri.substring(0, 30)}...)`;

  try {
    const mongo = await connectToDatabase();
    if (mongo) {
      return NextResponse.json({ 
        status: 'ok', 
        mongodb: 'connected ✅',
        db: mongo.db.databaseName,
        uri_status: uriStatus
      });
    } else {
      return NextResponse.json({ 
        status: 'fallback', 
        mongodb: 'not connected ❌',
        uri_status: uriStatus,
        reason: 'connectToDatabase() returned null'
      });
    }
  } catch (error) {
    return NextResponse.json({ 
      status: 'error', 
      mongodb: 'failed ❌',
      uri_status: uriStatus,
      error: String(error)
    }, { status: 500 });
  }
}
