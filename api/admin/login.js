import { prisma } from '../../lib/prisma.js';
import { signToken } from '../../lib/auth.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username?.trim() || !password?.trim()) {
      return res.status(400).json({ success: false, message: 'Username and password are required.' });
    }

    // Find admin
    const admin = await prisma.admin.findUnique({ where: { username: username.trim() } });
    if (!admin) {
      // Generic message — don't leak whether user exists
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Verify password
    const valid = await bcrypt.compare(password, admin.passwordHash);
    if (!valid) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    // Update last login
    await prisma.admin.update({
      where: { id: admin.id },
      data: { lastLogin: new Date() },
    });

    // Issue JWT
    const token = signToken({ id: admin.id, username: admin.username });

    return res.status(200).json({
      success: true,
      token,
      username: admin.username,
      expiresIn: 6 * 60 * 60 * 1000, // ms — used by frontend for auto-logout timer
    });
  } catch (err) {
    console.error('Admin login error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
