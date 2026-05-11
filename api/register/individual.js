import { prisma } from '../../lib/prisma.js';

// Title Case normalization for consistent DB storage
function toTitleCase(str) {
  if (!str) return '';
  return str.trim().replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}

// Save college to DB if not already present (fire-and-forget)
async function saveCollegeIfNew(name, city, pincode) {
  if (!name?.trim()) return;
  const normName = toTitleCase(name);
  const normCity = toTitleCase(city || 'Unknown');
  prisma.college.upsert({
    where: { name_city: { name: normName, city: normCity } },
    update: {},
    create: {
      name: normName,
      city: normCity,
      pincode: pincode || null,
      source: 'user',
      isVerified: false,
    },
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
      fullName, age, institution, city, pincode, email, phone,
      committeePreference1, committeePreference2, committeePreference3,
      portfolioPreference1, portfolioPreference2, portfolioPreference3,
      accommodationRequired, accommodationScheme,
      transactionId, totalAmount,
    } = req.body ?? {};

    if (!fullName || !email || !phone || !transactionId || !institution) {
      return res.status(400).json({ success: false, message: 'Missing required fields.' });
    }
    if (!committeePreference1 || !portfolioPreference1) {
      return res.status(400).json({ success: false, message: 'At least one committee preference is required.' });
    }

    const registrationId = `REG-INDV-${Date.now()}`;

    // Normalize institution name to Title Case before saving
    const normInstitution = toTitleCase(institution);
    const normCity = toTitleCase(city || '');

    await prisma.individualRegistration.create({
      data: {
        registrationId,
        fullName: toTitleCase(fullName),
        age: String(age),
        institution: normInstitution,
        city: normCity || null,
        pincode: pincode || null,
        email: email.toLowerCase().trim(),
        phone,
        committeePreference1,
        committeePreference2: committeePreference2 || null,
        committeePreference3: committeePreference3 || null,
        portfolioPreference1,
        portfolioPreference2: portfolioPreference2 || null,
        portfolioPreference3: portfolioPreference3 || null,
        accommodationRequired: Boolean(accommodationRequired),
        accommodationScheme: accommodationScheme || null,
        transactionId,
        totalAmount: Number(totalAmount) || 0,
        status: 'pending',
      },
    });

    // Save college to DB in background (for future autocomplete)
    saveCollegeIfNew(normInstitution, normCity, pincode);

    return res.status(200).json({ success: true, registrationId });
  } catch (error) {
    console.error('Individual registration error:', error);
    return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
  }
}
