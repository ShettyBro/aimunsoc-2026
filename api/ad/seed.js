import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcryptjs';

/**
 * POST /api/admin/seed
 *
 * Creates the initial admin account from environment variables.
 * Reads:  ADMIN_USERNAME  (default: "admin")
 *         ADMIN_PASSWORD  (required — no default)
 *
 * Safe to call multiple times — will return 409 if an admin already exists.
 * DELETE this route (or add a secret header check) after first setup.
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    // Check if any admin already exists
    const existing = await prisma.admin.count();
    if (existing > 0) {
      return res.status(409).json({
        success: false,
        message: 'Admin account already exists. Delete this route after initial setup.',
      });
    }

    const username = process.env.ADMIN_USERNAME?.trim() || 'admin';
    const password = process.env.ADMIN_PASSWORD?.trim();

    if (!password) {
      return res.status(500).json({
        success: false,
        message: 'ADMIN_PASSWORD environment variable is not set.',
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: { username, passwordHash },
    });

    return res.status(201).json({
      success: true,
      message: `Admin "${admin.username}" created successfully. Remove ADMIN_PASSWORD from env and delete this route.`,
      username: admin.username,
    });
  } catch (err) {
    console.error('Admin seed error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
