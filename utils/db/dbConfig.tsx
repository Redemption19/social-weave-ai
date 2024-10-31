import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not defined in environment variables.\n' +
    'Please add it to your .env.local file: DATABASE_URL=postgres://user:password@host/database'
  );
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export async function withDb<T>(
  callback: (db: ReturnType<typeof drizzle>) => Promise<T>
): Promise<T> {
  try {
    return await callback(db);
  } catch (error) {
    console.error('Database operation failed:', error);
    throw error;
  }
}