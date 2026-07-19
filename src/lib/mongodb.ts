import { MongoClient, Db } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || 'portfolio';

interface CachedConnection {
  client: MongoClient;
  db: Db;
}

declare global {
  var mongoCached: CachedConnection | undefined;
}


export async function connectToDatabase(): Promise<CachedConnection | null> {
  if (!MONGODB_URI || MONGODB_URI.includes('<password>') || MONGODB_URI.includes('xxxxx')) {
    // If not configured, return null for local fallback
    return null;
  }
  
  if (globalThis.mongoCached) {
    return globalThis.mongoCached;
  }
  
  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if server is unreachable
    });
    await client.connect();
    const db = client.db(MONGODB_DB);
    const connection = { client, db };
    globalThis.mongoCached = connection;
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB, falling back to local file storage:', error);
    return null;
  }
}
