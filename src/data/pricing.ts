// ALL prices come from here — never hardcode ₹ amounts in JSX

export const INDIVIDUAL_BASE_FEE = 1700;
export const ACCOMMODATION_2_NIGHTS = 800;
export const ACCOMMODATION_3_NIGHTS = 1000;

export const DELEGATION_TIERS = [
  { min: 12, max: 14, perHead: 1650 },
  { min: 15, max: 19, perHead: 1600 },
  { min: 20, max: 24, perHead: 1500 },
  { min: 25, max: Infinity, perHead: 1400 },
];

// TODO: Update with actual AiCon 2026 conference date
export const CONFERENCE_DATE = new Date('2026-09-15T09:00:00');

export const PAYMENT_URL = import.meta.env.VITE_PAYMENT_URL as string || 'https://www.acharyaerptech.in/ExternalPayment/179';

export const MATRIX_URL =
  'https://docs.google.com/spreadsheets/d/1kAaJRW-4i0Q1rCkbrfyl96cd4arfVxbiYZSJR15dkmQ/edit?usp=sharing';

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
