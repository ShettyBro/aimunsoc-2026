import { prisma } from '../lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body ?? {};

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Basic email format check
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' });
    }

    await prisma.contactMessage.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    return res.status(200).json({ success: true, message: 'Message received.' });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ success: false, message: `Server error: ${err.message}` });
  }
}
