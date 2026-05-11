import { prisma } from '../../lib/prisma.js';

function toTitleCase(str) {
  if (!str) return '';
  return str.trim().replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

async function saveCollegeIfNew(name, city, pincode) {
  if (!name?.trim()) return;
  prisma.college.upsert({
    where: { name_city: { name, city: city || 'Unknown' } },
    update: {},
    create: { name, city: city || 'Unknown', pincode: pincode || null, source: 'user', isVerified: false },
  }).catch(err => console.warn('College save skipped:', err.message));
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const {
      institution, city, pincode,
      headDelegateName, headDelegateEmail, headDelegatePhone,
      numberOfDelegates,
      accommodationRequired, accommodationDelegates, accommodationScheme,
      transactionId, perHeadPrice, totalAmount,
    } = req.body ?? {};

    if (!institution || !headDelegateEmail || !headDelegatePhone || !transactionId) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    if (!numberOfDelegates) {
      return res.status(400).json({ success: false, message: 'Delegate count is required.' });
    }

    const registrationId = `REG-DELG-${Date.now()}`;
    const normInstitution = toTitleCase(institution);
    const normCity = toTitleCase(city || '');

    await prisma.delegationRegistration.create({
      data: {
        registrationId,
        institution: normInstitution,
        city: normCity || null,
        pincode: pincode || null,
        headDelegateName: toTitleCase(headDelegateName),
        headDelegateEmail: headDelegateEmail.toLowerCase().trim(),
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

    saveCollegeIfNew(normInstitution, normCity, pincode);

    return res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error('Delegation registration error:', error);
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
}
