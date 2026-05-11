export interface CollegeEntry { name: string; city: string; }

// Title-cased, city-prefixed for display. 100+ Karnataka colleges + major national ones.
export const PRESET_COLLEGES: CollegeEntry[] = [
  // ── BENGALURU ──────────────────────────────────────────────────────────────
  { name: 'Acharya Institute of Technology', city: 'Bengaluru' },
  { name: 'RV College of Engineering', city: 'Bengaluru' },
  { name: 'PES University', city: 'Bengaluru' },
  { name: 'BMS College of Engineering', city: 'Bengaluru' },
  { name: 'MS Ramaiah Institute of Technology', city: 'Bengaluru' },
  { name: 'Dayananda Sagar College of Engineering', city: 'Bengaluru' },
  { name: 'Dayananda Sagar University', city: 'Bengaluru' },
  { name: 'New Horizon College of Engineering', city: 'Bengaluru' },
  { name: 'Bangalore Institute of Technology', city: 'Bengaluru' },
  { name: 'Dr. Ambedkar Institute of Technology', city: 'Bengaluru' },
  { name: 'Reva University', city: 'Bengaluru' },
  { name: 'Presidency University', city: 'Bengaluru' },
  { name: 'CMR Institute of Technology', city: 'Bengaluru' },
  { name: 'CMR University', city: 'Bengaluru' },
  { name: 'East West Institute of Technology', city: 'Bengaluru' },
  { name: 'Global Academy of Technology', city: 'Bengaluru' },
  { name: 'JSS Academy of Technical Education', city: 'Bengaluru' },
  { name: 'Nitte Meenakshi Institute of Technology', city: 'Bengaluru' },
  { name: 'Sir M Visvesvaraya Institute of Technology', city: 'Bengaluru' },
  { name: 'The Oxford College of Engineering', city: 'Bengaluru' },
  { name: 'Vemana Institute of Technology', city: 'Bengaluru' },
  { name: 'Alliance University', city: 'Bengaluru' },
  { name: 'Indian Institute of Science', city: 'Bengaluru' },
  { name: 'Christ University', city: 'Bengaluru' },
  { name: 'Jain University', city: 'Bengaluru' },
  { name: 'Don Bosco Institute of Technology', city: 'Bengaluru' },
  { name: 'Cambridge Institute of Technology', city: 'Bengaluru' },
  { name: 'Rajiv Gandhi Institute of Technology', city: 'Bengaluru' },
  { name: 'Atria Institute of Technology', city: 'Bengaluru' },
  { name: 'MVJ College of Engineering', city: 'Bengaluru' },
  { name: 'Acharya Institute of Graduate Studies', city: 'Bengaluru' },
  { name: 'Mount Carmel College', city: 'Bengaluru' },
  { name: 'Kristu Jayanti College', city: 'Bengaluru' },
  { name: 'Garden City University', city: 'Bengaluru' },
  { name: 'Sai Vidya Institute of Technology', city: 'Bengaluru' },
  { name: 'International Institute of Information Technology', city: 'Bengaluru' },
  { name: 'RNS Institute of Technology', city: 'Bengaluru' },
  { name: 'BMS Institute of Technology and Management', city: 'Bengaluru' },
  { name: 'Jyothy Institute of Technology', city: 'Bengaluru' },
  { name: 'The East Point College of Engineering', city: 'Bengaluru' },
  { name: 'Impact College of Engineering and Applied Sciences', city: 'Bengaluru' },
  { name: 'T John College', city: 'Bengaluru' },
  { name: 'Seshadripuram College', city: 'Bengaluru' },
  { name: "St. Joseph's College of Commerce", city: 'Bengaluru' },
  { name: 'Bangalore Medical College and Research Institute', city: 'Bengaluru' },
  { name: 'Vydehi Institute of Medical Sciences', city: 'Bengaluru' },
  { name: 'MS Ramaiah Medical College', city: 'Bengaluru' },
  { name: 'National Institute of Fashion Technology', city: 'Bengaluru' },
  { name: 'Acharya and BM Reddy College of Pharmacy', city: 'Bengaluru' },

  // ── MYSURU ─────────────────────────────────────────────────────────────────
  { name: 'University of Mysore', city: 'Mysuru' },
  { name: 'JSS Science and Technology University', city: 'Mysuru' },
  { name: 'National Institute of Engineering', city: 'Mysuru' },
  { name: 'Vidyavardhaka College of Engineering', city: 'Mysuru' },
  { name: 'Sri Jayachamarajendra College of Engineering', city: 'Mysuru' },
  { name: "Maharaja's College", city: 'Mysuru' },
  { name: 'Mysore Medical College and Research Institute', city: 'Mysuru' },
  { name: 'JSS Medical College', city: 'Mysuru' },
  { name: 'Teresian College', city: 'Mysuru' },

  // ── MANGALURU ──────────────────────────────────────────────────────────────
  { name: 'NITK Surathkal', city: 'Mangaluru' },
  { name: 'St. Joseph Engineering College', city: 'Mangaluru' },
  { name: 'Sahyadri College of Engineering and Management', city: 'Mangaluru' },
  { name: 'Shrinivas Institute of Technology', city: 'Mangaluru' },
  { name: 'Canara Engineering College', city: 'Mangaluru' },
  { name: 'Mangalore University', city: 'Mangaluru' },
  { name: 'Yenepoya University', city: 'Mangaluru' },
  { name: "St. Aloysius College", city: 'Mangaluru' },

  // ── MANIPAL ────────────────────────────────────────────────────────────────
  { name: 'Manipal Institute of Technology', city: 'Manipal' },
  { name: 'Manipal Academy of Higher Education', city: 'Manipal' },
  { name: 'Alvas Institute of Engineering and Technology', city: 'Moodbidri' },
  { name: 'KVG College of Engineering', city: 'Sullia' },
  { name: 'Vivekananda College of Engineering and Technology', city: 'Puttur' },

  // ── HUBBALLI-DHARWAD ───────────────────────────────────────────────────────
  { name: 'KLE Technological University', city: 'Hubballi' },
  { name: 'Karnataka University', city: 'Dharwad' },
  { name: 'BVB College of Engineering and Technology', city: 'Hubballi' },
  { name: 'SDM College of Engineering and Technology', city: 'Dharwad' },
  { name: 'Karnataka Institute of Medical Sciences', city: 'Hubballi' },

  // ── BELAGAVI ───────────────────────────────────────────────────────────────
  { name: 'Visvesvaraya Technological University', city: 'Belagavi' },
  { name: 'KLS Gogte Institute of Technology', city: 'Belagavi' },
  { name: 'Angadi Institute of Technology and Management', city: 'Belagavi' },
  { name: 'Jain College of Engineering', city: 'Belagavi' },
  { name: 'Basaveshwar Engineering College', city: 'Bagalkot' },

  // ── TUMAKURU ───────────────────────────────────────────────────────────────
  { name: 'Siddaganga Institute of Technology', city: 'Tumakuru' },
  { name: 'Tumkur University', city: 'Tumakuru' },
  { name: 'Sri Siddhartha Institute of Technology', city: 'Tumakuru' },

  // ── SHIVAMOGGA ─────────────────────────────────────────────────────────────
  { name: 'Kuvempu University', city: 'Shivamogga' },
  { name: 'PES Institute of Technology and Management', city: 'Shivamogga' },

  // ── DAVANGERE ──────────────────────────────────────────────────────────────
  { name: 'Bapuji Institute of Engineering and Technology', city: 'Davangere' },
  { name: 'SS Institute of Medical Sciences', city: 'Davangere' },

  // ── HASSAN ─────────────────────────────────────────────────────────────────
  { name: 'Malnad College of Engineering', city: 'Hassan' },
  { name: 'Government Engineering College Hassan', city: 'Hassan' },

  // ── MANDYA ─────────────────────────────────────────────────────────────────
  { name: 'PES College of Engineering', city: 'Mandya' },

  // ── CHIKKAMAGALURU ─────────────────────────────────────────────────────────
  { name: 'Adichunchanagiri Institute of Technology', city: 'Chikkamagaluru' },

  // ── KALABURAGI ─────────────────────────────────────────────────────────────
  { name: 'Gulbarga University', city: 'Kalaburagi' },
  { name: 'Khaja Banda Nawaz University', city: 'Kalaburagi' },
  { name: 'Government Engineering College Raichur', city: 'Raichur' },

  // ── BALLARI ────────────────────────────────────────────────────────────────
  { name: 'Vijayanagara Institute of Medical Sciences', city: 'Ballari' },

  // ── UDUPI ──────────────────────────────────────────────────────────────────
  { name: 'Milagres College', city: 'Udupi' },

  // ── MAJOR NATIONAL INSTITUTIONS ────────────────────────────────────────────
  { name: 'Indian Institute of Technology Bombay', city: 'Mumbai' },
  { name: 'Indian Institute of Technology Delhi', city: 'New Delhi' },
  { name: 'Indian Institute of Technology Madras', city: 'Chennai' },
  { name: 'Indian Institute of Technology Kharagpur', city: 'Kharagpur' },
  { name: 'BITS Pilani', city: 'Pilani' },
  { name: 'VIT University', city: 'Vellore' },
  { name: 'Anna University', city: 'Chennai' },
  { name: 'Symbiosis Institute of Technology', city: 'Pune' },
  { name: 'SRM Institute of Science and Technology', city: 'Chennai' },
  { name: 'Amrita School of Engineering', city: 'Coimbatore' },
];

/** Search colleges from preset + any extras (DB-fetched). Returns max 12 results. */
export function searchColleges(
  query: string,
  cityHint: string = '',
  extras: CollegeEntry[] = []
): CollegeEntry[] {
  const all = [...PRESET_COLLEGES, ...extras.filter(
    e => !PRESET_COLLEGES.some(p => p.name === e.name && p.city === e.city)
  )];
  const q = query.toLowerCase().trim();
  if (!q) {
    // Show city-filtered list if city is known
    const cityFiltered = cityHint
      ? all.filter(c => c.city.toLowerCase().includes(cityHint.toLowerCase()))
      : all;
    return cityFiltered.slice(0, 12);
  }
  return all
    .filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
    )
    .sort((a, b) => {
      // Prioritize city match
      const aCity = cityHint && a.city.toLowerCase().includes(cityHint.toLowerCase());
      const bCity = cityHint && b.city.toLowerCase().includes(cityHint.toLowerCase());
      if (aCity && !bCity) return -1;
      if (!aCity && bCity) return 1;
      return 0;
    })
    .slice(0, 12);
}

/** Normalize to Title Case for DB storage */
export function toTitleCase(str: string): string {
  return str
    .trim()
    .replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
}
