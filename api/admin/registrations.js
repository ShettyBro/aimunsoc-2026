import { prisma } from '../../lib/prisma.js';
import { requireAuth } from '../../lib/auth.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // ── JWT auth required ──
  const payload = requireAuth(req, res);
  if (!payload) return; // 401 already sent

  try {
    const [individual, delegation, contacts] = await Promise.all([
      prisma.individualRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.delegationRegistration.findMany({ orderBy: { createdAt: 'desc' } }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
    ]);

    const totalRevenue =
      individual.reduce((s, r) => s + (r.totalAmount || 0), 0) +
      delegation.reduce((s, r) => s + (r.totalAmount || 0), 0);

    return res.status(200).json({
      individual,
      delegation,
      contacts,
      stats: {
        totalIndividual: individual.length,
        totalDelegation: delegation.length,
        totalContacts: contacts.length,
        totalRevenue,
      },
    });
  } catch (err) {
    console.error('Admin registrations error:', err);
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
}
