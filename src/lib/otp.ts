import nodemailer from 'nodemailer';
import { connectToDatabase } from './mongodb';
import fs from 'fs/promises';
import path from 'path';

export interface OTPRecord {
  email: string;
  code: string;
  expiresAt: number;
  verified: boolean;
}

const otpsFilePath = path.join(process.cwd(), 'src/data/otps.json');

async function ensureFileExists() {
  const dir = path.dirname(otpsFilePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
  
  try {
    await fs.access(otpsFilePath);
  } catch {
    await fs.writeFile(otpsFilePath, JSON.stringify([]));
  }
}

async function getOTPsFromFile(): Promise<OTPRecord[]> {
  await ensureFileExists();
  const fileContent = await fs.readFile(otpsFilePath, 'utf-8');
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

async function saveOTPsToFile(records: OTPRecord[]): Promise<void> {
  await ensureFileExists();
  await fs.writeFile(otpsFilePath, JSON.stringify(records, null, 2));
}

export async function generateAndSendOTP(email: string): Promise<string> {
  const code = Math.floor(100000 + Math.random() * 900000).toString().substring(0, 6); // 6 digits
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 mins expiration
  
  const record: OTPRecord = {
    email,
    code,
    expiresAt,
    verified: false,
  };

  const mongo = await connectToDatabase();
  if (!mongo) {
    const records = await getOTPsFromFile();
    const filtered = records.filter(r => r.email !== email && r.expiresAt > Date.now());
    filtered.push(record);
    await saveOTPsToFile(filtered);
  } else {
    const collection = mongo.db.collection('otps');
    await collection.deleteMany({
      $or: [
        { email },
        { expiresAt: { $lt: Date.now() } }
      ]
    });
    await collection.insertOne({ ...record });
  }
  
  // Try sending real email
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587');
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  
  console.log(`\n============================================\n=== REGISTRATION OTP FOR ${email}: [ ${code} ] ===\n============================================\n`);
  
  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass },
      });
      
      await transporter.sendMail({
        from: `"Akash Portfolio Setup" <${user}>`,
        to: email,
        subject: "Your Admin Registration OTP Code",
        text: `Hello,\n\nYour 6-digit OTP code for registering the Admin Panel is: ${code}\n\nThis code will expire in 5 minutes.\n\nRegards,\nPortfolio System`,
        html: `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #333;">Admin Verification Code</h2>
          <p>Hello,</p>
          <p>Your 6-digit OTP code for registering the Admin Panel is:</p>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 4px; padding: 15px; background: #f5f5f5; text-align: center; border-radius: 4px; color: #d97706; margin: 20px 0;">
            ${code}
          </div>
          <p>This code will expire in 5 minutes.</p>
          <p style="color: #777; font-size: 11px;">If you didn't request this code, please ignore this email.</p>
        </div>`
      });
    } catch (err) {
      console.error("Nodemailer failed to send email:", err);
    }
  } else {
    console.warn("SMTP settings not configured in .env.local. OTP code logged to console above.");
  }
  
  return code;
}

export async function verifyOTP(email: string, code: string): Promise<boolean> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    const records = await getOTPsFromFile();
    const index = records.findIndex(r => r.email === email && r.code === code && r.expiresAt > Date.now());
    if (index === -1) return false;
    records[index].verified = true;
    await saveOTPsToFile(records);
    return true;
  }
  
  try {
    const collection = mongo.db.collection('otps');
    const record = await collection.findOne({
      email,
      code,
      expiresAt: { $gt: Date.now() }
    });
    
    if (!record) return false;
    
    await collection.updateOne(
      { _id: record._id },
      { $set: { verified: true } }
    );
    return true;
  } catch {
    return false;
  }
}

export async function isEmailVerified(email: string): Promise<boolean> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    const records = await getOTPsFromFile();
    const found = records.find(r => r.email === email && r.verified && r.expiresAt > Date.now());
    return found !== undefined;
  }
  
  try {
    const collection = mongo.db.collection('otps');
    const record = await collection.findOne({
      email,
      verified: true,
      expiresAt: { $gt: Date.now() }
    });
    return record !== null;
  } catch {
    return false;
  }
}
