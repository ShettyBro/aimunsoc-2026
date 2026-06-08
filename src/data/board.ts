export interface BoardMember {
  name: string;
  position: string;
  image: string | null;
}

export interface SecretariatMember {
  name: string;
  position: string;
  email: string;
}

// ── Current Board Members (2026) ──────────────────────────────────────────────
export const currentBoard: BoardMember[] = [
  { name: 'Mr. Krishna Kabir Reddy Basani', position: 'Managing Director', image: '/TheBoard/krishna-kabir.jpg' },
  { name: 'Dr. Prashanth K', position: 'Faculty Co-Ordinator', image: '/TheBoard/prashanth-k.jpg' },
  { name: 'Prof. Tejas K', position: 'Assistant Director - Student Activities', image: '/TheBoard/tejas-k.jpg' },
  { name: 'Prof. Sheela Maharajpet', position: 'Co-curricular Co-ordinator', image: '/TheBoard/Sheela Maharajpet.webp' },
  { name: 'Bhuvin Anil', position: 'President', image: '/TheBoard/bhuvin-anil.jpg' },
  { name: 'Amoolya Sreenath', position: 'Vice President', image: '/TheBoard/amoolya-sreenath.jpg' },
  { name: 'Samuel Moses Giddion Zachariah Samson', position: 'Creator In-Chief', image: '/TheBoard/samuel-moses.jpg' },
  { name: 'Anushka Maneesh Rai', position: 'General Secretary', image: '/TheBoard/Anushka Maneesh Rai.jpeg' },
  { name: 'Anushka Vishwakarma', position: 'General Secretary', image: '/TheBoard/Anushka Vishwakarma.jpeg' },
  { name: 'Vishakha Shivhare', position: 'General Secretary', image: '/TheBoard/Vishakha Shivhare.jpeg' },
  { name: 'Angelica Daniel', position: "Chargé d'Affaires", image: '/TheBoard/Angelica Hazel Daniel.jpeg' },
  { name: 'Yadriksha Uprety', position: 'Treasurer', image: '/TheBoard/Yadriksha Uprety.jpeg' },
  { name: 'Adithya P Kumar', position: 'Editor In-Chief', image: '/TheBoard/Adithya P Kumar.jpeg' },
  { name: 'Vaibhav Vaswani', position: 'Editor In-Chief', image: '/TheBoard/placeholder.jpg' },
  { name: 'Syed Armaan', position: 'Deputy Secretary', image: '/TheBoard/Syed Armaan.jpeg' },
  { name: 'Yuvraj Singh', position: 'Deputy Secretary', image: '/TheBoard/placeholder.jpg' },
  { name: 'Amarthya G Thamappa', position: 'Deputy Secretary', image: '/TheBoard/placeholder.jpg' },
];

// ── Former Board Members ───────────────────────────────────────────────────────
export const formerBoard: BoardMember[] = [
  { name: 'Aashritha G M', position: 'Treasurer', image: '/TheBoard/placeholder.jpg' },
  { name: 'Sayurendra Man Shrestha', position: 'Editor In-Chief', image: '/TheBoard/placeholder.jpg' },
  { name: 'Sneha S', position: 'General Secretary', image: '/TheBoard/sneha-s.jpg' },
  { name: 'Vivyn Kshtriya', position: 'Editor In-Chief', image: '/TheBoard/vivyn-kshtriya.jpg' },
  { name: 'Vedant S D', position: 'Treasurer', image: '/TheBoard/placeholder.jpg' },
  { name: 'Noel George', position: 'Chief Advisor', image: '/TheBoard/placeholder.jpg' },
];

// ── Secretariat (AiCon 2026) ──────────────────────────────────────────────────
export const secretariat: SecretariatMember[] = [
  { name: 'Dr. Prashanth K', position: 'Faculty In-Charge', email: 'faculty@aimunsoc.org' },
  { name: 'Bhuvin Anil', position: 'Secretary General', email: 'sg@aimunsoc.org' },
  { name: 'Samuel Moses Giddion Zachariah Samson', position: 'Deputy Secretary General', email: 'dsg@aimunsoc.org' },
  { name: 'Anushka Maneesh Rai', position: 'Director General', email: 'dg@aimunsoc.org' },
  { name: 'Vishakha Shivhare', position: 'Co Head of Operations', email: 'operations1@aimunsoc.org' },
  { name: 'Anushka Vishwakarma', position: 'Co Head of Operations', email: 'operations2@aimunsoc.org' },
  { name: 'Sujata Diwedi', position: 'Chief of Staff', email: 'cos@aimunsoc.org' },
  { name: 'Yadriksha Uprety', position: 'Co Head of Finance', email: 'finance@aimunsoc.org' },
  { name: 'Amarthya Gari Thamappa', position: 'Head of Sponsorship', email: 'sponsorship@aimunsoc.org' },
  { name: 'Yuvraj Singh', position: 'Head of Logistics', email: 'logistics@aimunsoc.org' },
  { name: 'Angelica Hazel Daniel', position: 'Head of Equity', email: 'equity@aimunsoc.org' },
  { name: 'Vaibhav Vaswani', position: 'Head of Outreach & Marketing', email: 'marketing@aimunsoc.org' },
  { name: 'Adithya P Kumar', position: 'Head of Content & Social Media', email: 'content@aimunsoc.org' },
  { name: 'Syed Armaan', position: 'Head of Delegate Affairs', email: 'delegate@aimunsoc.org' },
];
