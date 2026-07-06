// ALL prices come from here — never hardcode ₹ amounts in JSX

export const INDIVIDUAL_BASE_FEE = 1700;

// Accommodation — single flat rate, 3 days / 2 nights
export const ACCOMMODATION_FEE = 500; // per head
export const ACCOMMODATION_LABEL = '3 Days / 2 Nights';

// Complimentary shuttle — free, informational only (no charge)
export const SHUTTLE_NOTE =
  'Complimentary shuttle service is provided to and from the nearby metro station.';

export const DELEGATION_TIERS = [
  { min: 10, max: 14, perHead: 1600 },
  { min: 15, max: 19, perHead: 1500 },
  { min: 20, max: Infinity, perHead: 1400 },
];

// ── Conference Theme ───────────────────────────────────────────────────────────
export const CONFERENCE_THEME = 'Diplomacy through Cooperation';
export const CONFERENCE_EDITION = 'III Edition';

// ── Prize Money (AiCon 2026) ──────────────────────────────────────────────────
export const PRIZES = [
  { award: 'Best Delegation',          amount: 15000 },
  { award: 'Best Delegate',            amount: 10000 },
  { award: 'High Commendation',        amount: 7000  },
  { award: 'Commendable Delegate',     amount: 5000  },
  { award: 'Best Reporter',            amount: 8000  },
  { award: 'Commendable Reporter',     amount: 6000  },
  { award: 'Best Photographer',        amount: 8000  },
  { award: 'Commendable Photographer', amount: 6000  },
];

// Reads from VITE_CONFERENCE_DATE env var — update in Vercel dashboard without redeploying
// Format: YYYY-MM-DD  e.g. "2026-07-16"
const _rawDate = import.meta.env.VITE_CONFERENCE_DATE as string;
export const CONFERENCE_DATE = _rawDate
  ? new Date(`${_rawDate}T09:00:00`)
  : new Date('2026-08-28T09:00:00'); // AiCon '26 — August 28–30, 2026

export const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL as string || 'https://www.acharyaerptech.in/ExternalPayment/179';

export const MATRIX_URL =
  'https://docs.google.com/spreadsheets/d/1jWckulVKgORE0hABxVkxRBv_Z1mvk3q0u8Ad6DZH4dM/view?usp=sharing';

export const INDIAN_POLITICIANS = [
  'Narendra Modi', 'Rahul Gandhi', 'Amit Shah', 'Arvind Kejriwal',
  'Yogi Adityanath', 'Mallikarjun Kharge', 'Shashi Tharoor', 'Piyush Goyal',
  'Smriti Irani', 'Sitaram Yechury', 'Asaduddin Owaisi', 'Uddhav Thackeray',
  'Sharad Pawar', 'Mamata Banerjee', 'Nitish Kumar', 'Devendra Fadnavis',
  'K. Chandrashekar Rao', 'MK Stalin', 'Bhupesh Baghel', 'Hemant Soren',
];

export const INTERNATIONAL_PORTFOLIOS = [
  'India', 'United States', 'China', 'Russia', 'United Kingdom', 'France',
  'Germany', 'Japan', 'Brazil', 'South Africa', 'Australia', 'Canada',
  'Mexico', 'Argentina', 'Turkey', 'Saudi Arabia', 'Iran', 'Israel',
  'Egypt', 'Nigeria', 'Kenya', 'Pakistan', 'Bangladesh', 'Indonesia',
  'Thailand', 'Vietnam', 'South Korea', 'North Korea',
  'European Union', 'African Union',
];
