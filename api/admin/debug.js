import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';

/**
 * TEMPORARY DEBUG ENDPOINT — DELETE AFTER FIXING LOGIN
 * GET /api/admin/debug?u=Sudeep&p=yourpassword
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'GET') return res.status(405).end();

  const { u: username, p: password } = req.query;
  if (!username || !password) {
    return res.json({ error: 'Pass ?u=username&p=password in query string' });
  }

  try {
    // Step 1: Count all admins
    const totalAdmins = await prisma.admin.count();

    // Step 2: Try exact match
    const exactMatch = await prisma.admin.findUnique({
      where: { username },
      select: { id: true, username: true, passwordHash: true },
    });

    // Step 3: Try insensitive findFirst
    const insensitiveMatch = await prisma.admin.findFirst({
      where: { username: { equals: username, mode: 'insensitive' } },
      select: { id: true, username: true, passwordHash: true },
    });

    // Step 4: If found, test bcrypt
    const target = exactMatch ?? insensitiveMatch;
    let bcryptResult = null;
    let bcryptError = null;
    if (target) {
      try {
        bcryptResult = await bcrypt.compare(password, target.passwordHash);
      } catch (e) {
        bcryptError = e.message;
      }
    }

    return res.json({
      totalAdmins,
      exactMatch: exactMatch ? { id: exactMatch.id, username: exactMatch.username, hashPrefix: exactMatch.passwordHash.slice(0, 10) } : null,
      insensitiveMatch: insensitiveMatch ? { id: insensitiveMatch.id, username: insensitiveMatch.username, hashPrefix: insensitiveMatch.passwordHash.slice(0, 10) } : null,
      bcryptMatch: bcryptResult,
      bcryptError,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, stack: err.stack });
  }
}
