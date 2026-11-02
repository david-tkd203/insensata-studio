// lib/auth.js
import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { getUserById } from './db';

const SECRET_KEY = process.env.JWT_SECRET || 'insensata-dark-gothic-sanctuary-key-2026-secret-luxury-99';
const JWT_SECRET = new TextEncoder().encode(SECRET_KEY);
export const COOKIE_NAME = 'insensata_token';

export async function hashPassword(plainText) {
  return bcrypt.hash(plainText, 10);
}

export async function verifyPassword(plainText, hash) {
  return bcrypt.compare(plainText, hash);
}

export async function signToken(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload?.id) return null;

    const user = getUserById(payload.id);
    return user || null;
  } catch (error) {
    return null;
  }
}
