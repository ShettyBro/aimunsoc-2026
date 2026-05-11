import { prisma } from '../lib/prisma.js';

/**
 * GET  /api/colleges          — returns user-added colleges from DB
 * GET  /api/colleges?q=query  — search user-added colleges
 */
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const colleges = await prisma.college.findMany({
      orderBy: { name: 'asc' },
      select: { name: true, city: true },
    });
    return res.status(200).json({ success: true, colleges });
  } catch (err) {
    console.error('Colleges fetch error:', err);
    return res.status(500).json({ success: false, colleges: [] });
  }
}
