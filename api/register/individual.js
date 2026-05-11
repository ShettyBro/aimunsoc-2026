import { prisma } from '../../lib/prisma.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      fullName, age, institution, email, phone,
      committeePreference1, committeePreference2, committeePreference3,
      portfolioPreference1, portfolioPreference2, portfolioPreference3,
      accommodationRequired, accommodationScheme,
      transactionId, totalAmount,
    } = req.body;

    // Validation
    if (!fullName || !email || !phone || !transactionId) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    if (!committeePreference1 || !portfolioPreference1) {
      return res.status(400).json({ success: false, message: 'At least one committee preference is required.' });
    }

    const registrationId = `REG-INDV-${Date.now()}`;

    await prisma.individualRegistration.create({
      data: {
        registrationId,
        fullName,
        age: String(age),
        institution,
        email,
        phone,
        committeePreference1: committeePreference1 || '',
        committeePreference2: committeePreference2 || null,
        committeePreference3: committeePreference3 || null,
        portfolioPreference1: portfolioPreference1 || '',
        portfolioPreference2: portfolioPreference2 || null,
        portfolioPreference3: portfolioPreference3 || null,
        accommodationRequired: Boolean(accommodationRequired),
        accommodationScheme: accommodationScheme || null,
        transactionId,
        totalAmount: Number(totalAmount) || 0,
        status: 'pending',
      },
    });

    return res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error('Individual registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
}
