import { prisma } from '../../lib/prisma.js';
import { signToken } from '../../lib/auth.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body ?? {};

    if (!username?.trim() || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // Case-insensitive username lookup
    const admin = await prisma.admin.findFirst({
      where: { username: { equals: username.trim(), mode: 'insensitive' } },
    });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Verify bcrypt hash — works with $2a$ and $2b$ regardless of salt rounds
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Issue JWT FIRST — don't let lastLogin update block login
    const token = signToken({ id: admin.id, username: admin.username });

    // Update lastLogin in background (fire-and-forget — never block login)
    prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    }).catch((err) => console.warn('lastLogin update failed (non-critical):', err.message));

    return res.status(200).json({
      success: true,
      token,
      username: admin.username,
      expiresIn: 6 * 60 * 60 * 1000, // ms — used by frontend auto-logout timer
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
}
