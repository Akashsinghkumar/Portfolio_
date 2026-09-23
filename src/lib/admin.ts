import crypto from 'crypto';
import { connectToDatabase } from './mongodb';
import fs from 'fs/promises';
import path from 'path';

export interface AdminCredentials {
  username: string;
  passwordHash: string;
  totpSecret: string;
  name: string;
  mobile: string;
  email: string;
  profession: string;
}

const adminFilePath = path.join(process.cwd(), 'src/data/admin.json');

async function ensureFileExists() {
  const dir = path.dirname(adminFilePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
}

async function getAdminFromFile(): Promise<AdminCredentials | null> {
  await ensureFileExists();
  try {
    const content = await fs.readFile(adminFilePath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

export async function getAdmin(): Promise<AdminCredentials | null> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    return getAdminFromFile();
  }
  
  try {
    const collection = mongo.db.collection('admin');
    const doc = await collection.findOne({});
    if (!doc) return null;
    
    return {
      username: doc.username,
      passwordHash: doc.passwordHash,
      totpSecret: doc.totpSecret,
      name: doc.name,
      mobile: doc.mobile,
      email: doc.email,
      profession: doc.profession,
    };
  } catch (error) {
    console.error('Error fetching admin credentials from MongoDB, falling back to file:', error);
    return getAdminFromFile();
  }
}

export async function adminExists(): Promise<boolean> {
  const admin = await getAdmin();
  return admin !== null;
}

// Hash password with scrypt
export async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(`${salt}:${derivedKey.toString('hex')}`);
    });
  });
}

// Verify password with scrypt and constant-time timingSafeEqual
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const parts = hash.split(':');
    if (parts.length !== 2) return resolve(false);
    const [salt, key] = parts;
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      try {
        const isMatch = crypto.timingSafeEqual(
          Buffer.from(key, 'hex'),
          derivedKey
        );
        resolve(isMatch);
      } catch {
        resolve(false);
      }
    });
  });
}

export async function registerAdmin(
  username: string, 
  passwordPlain: string, 
  totpSecret: string,
  name: string,
  mobile: string,
  email: string,
  profession: string
): Promise<void> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    await ensureFileExists();
    const passwordHash = await hashPassword(passwordPlain);
    const credentials: AdminCredentials = {
      username,
      passwordHash,
      totpSecret,
      name,
      mobile,
      email,
      profession,
    };
    await fs.writeFile(adminFilePath, JSON.stringify(credentials, null, 2));
    return;
  }
  
  const collection = mongo.db.collection('admin');
  await collection.deleteMany({});
  
  const passwordHash = await hashPassword(passwordPlain);
  const credentials: AdminCredentials = {
    username,
    passwordHash,
    totpSecret,
    name,
    mobile,
    email,
    profession,
  };
  
  await collection.insertOne({ ...credentials });
}
