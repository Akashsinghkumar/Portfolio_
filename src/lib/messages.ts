import { connectToDatabase } from './mongodb';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

export interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
  status: 'unread' | 'read';
}

const messagesFilePath = path.join(process.cwd(), 'src/data/messages.json');

async function ensureFileExists() {
  const dir = path.dirname(messagesFilePath);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}
  
  try {
    await fs.access(messagesFilePath);
  } catch {
    await fs.writeFile(messagesFilePath, JSON.stringify([]));
  }
}

async function getMessagesFromFile(): Promise<Message[]> {
  await ensureFileExists();
  const fileContent = await fs.readFile(messagesFilePath, 'utf-8');
  try {
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

export async function getMessages(): Promise<Message[]> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    return getMessagesFromFile();
  }
  
  try {
    const collection = mongo.db.collection('messages');
    const messages = await collection.find({}).toArray();
    
    return messages.map(doc => ({
      id: doc.id || doc._id.toString(),
      name: doc.name,
      email: doc.email,
      message: doc.message,
      createdAt: doc.createdAt,
      status: doc.status || 'unread',
    }));
  } catch (error) {
    console.error('Error fetching messages from MongoDB, falling back to file:', error);
    return getMessagesFromFile();
  }
}

export async function saveMessage(name: string, email: string, message: string): Promise<Message> {
  const newMessage: Message = {
    id: crypto.randomUUID(),
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
    status: 'unread',
  };

  const mongo = await connectToDatabase();
  if (!mongo) {
    await ensureFileExists();
    const messages = await getMessagesFromFile();
    messages.push(newMessage);
    await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
    return newMessage;
  }
  
  const collection = mongo.db.collection('messages');
  await collection.insertOne({ ...newMessage });
  return newMessage;
}

export async function updateMessageStatus(id: string, status: 'unread' | 'read'): Promise<boolean> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    const messages = await getMessagesFromFile();
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) return false;
    messages[index].status = status;
    await fs.writeFile(messagesFilePath, JSON.stringify(messages, null, 2));
    return true;
  }
  
  try {
    const collection = mongo.db.collection('messages');
    const result = await collection.updateOne({ id }, { $set: { status } });
    return result.modifiedCount > 0;
  } catch {
    return false;
  }
}

export async function deleteMessage(id: string): Promise<boolean> {
  const mongo = await connectToDatabase();
  if (!mongo) {
    const messages = await getMessagesFromFile();
    const filtered = messages.filter(m => m.id !== id);
    if (filtered.length === messages.length) return false;
    await fs.writeFile(messagesFilePath, JSON.stringify(filtered, null, 2));
    return true;
  }
  
  try {
    const collection = mongo.db.collection('messages');
    const result = await collection.deleteOne({ id });
    return result.deletedCount > 0;
  } catch {
    return false;
  }
}
