// lib/auth.ts
import { jwtVerify } from 'jose';

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}

export async function verifyAuth(token: string) {
  try {
    if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
      throw new AuthError('JWT_SECRET is not defined');
    }

    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const exp = payload.exp as number;
    const expBuffer = 5 * 60 * 1000;

    if (Date.now() >= exp * 1000 - expBuffer) {
      throw new AuthError('Token has expired');
    }

    return payload;
  } catch (error) {
    throw new AuthError(
      error instanceof AuthError ? error.message : 'Authentication failed'
    );
  }
}