import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

export function generateUUID(): string {
  return uuidv4();
}

export function generateRandomToken(length: number = 32): string {
  return crypto.randomBytes(length).toString('hex');
}

export function generateOTP(length: number = 6): string {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function calculateExpiry(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function isExpired(date: Date): boolean {
  return new Date() > date;
}
