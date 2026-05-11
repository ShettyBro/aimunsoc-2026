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
      institution, city,
      headDelegateName, headDelegateEmail, headDelegatePhone,
      numberOfDelegates,
      accommodationRequired, accommodationDelegates, accommodationScheme,
      transactionId, perHeadPrice, totalAmount,
    } = req.body;

    // Validation
    if (!institution || !headDelegateEmail || !headDelegatePhone || !transactionId) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    if (!numberOfDelegates) {
      return res.status(400).json({ success: false, message: 'Delegate count is required.' });
    }

    const registrationId = `REG-DELG-${Date.now()}`;

    await prisma.delegationRegistration.create({
      data: {
        registrationId,
        institution,
        city: city || null,
        headDelegateName,
        headDelegateEmail,
        headDelegatePhone,
        numberOfDelegates: String(numberOfDelegates),
        accommodationRequired: Boolean(accommodationRequired),
        accommodationDelegates: accommodationDelegates ? String(accommodationDelegates) : null,
        accommodationScheme: accommodationScheme || null,
        perHeadPrice: Number(perHeadPrice) || 0,
        totalAmount: Number(totalAmount) || 0,
        transactionId,
        status: 'pending',
      },
    });

    return res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error('Delegation registration error:', error);
    return res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
}
