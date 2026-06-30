import crypto from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin2024';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function verifyPassword(password: string): boolean {
  const inputHash = hashPassword(password);
  const expectedHash = hashPassword(ADMIN_PASSWORD);
  return inputHash === expectedHash;
}

export function getAdminToken(): string {
  return hashPassword(ADMIN_PASSWORD + Date.now().toString());
}
