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

export const currentBoard: BoardMember[] = [
  { name: 'Mr. Krishna Kabir Reddy Basani', position: 'Managing Director', image: '/TheBoard/krishna-kabir.jpg' },
  { name: 'Dr. Prashanth K', position: 'Faculty Co-Ordinator', image: '/TheBoard/prashanth-k.jpg' },
  { name: 'Prof. Tejas K', position: 'Assistant Director - Student Activities', image: '/TheBoard/tejas-k.jpg' },
  { name: 'Bhuvin Anil', position: 'President', image: '/TheBoard/bhuvin-anil.jpg' },
  { name: 'Amoolya Sreenath', position: 'Vice President', image: '/TheBoard/amoolya-sreenath.jpg' },
  { name: 'Sneha S', position: 'General Secretary', image: '/TheBoard/sneha-s.jpg' },
  { name: 'Samuel Moses Giddion Zachariah Samson', position: 'Creator In-Chief', image: '/TheBoard/samuel-moses.jpg' },
  { name: 'Vivyn Kshtriya', position: 'Editor In-Chief', image: '/TheBoard/vivyn-kshtriya.jpg' },
  { name: 'Vedant S D', position: 'Treasurer', image: null }, // placeholder
  { name: 'Noel George', position: 'Chief Advisor', image: null }, // placeholder
];

export const formerBoard: BoardMember[] = [
  { name: 'Aashritha G M', position: 'Treasurer', image: null }, // placeholder
  { name: 'Sayurendra Man Shrestha', position: 'Editor In-Chief', image: null }, // placeholder
];

export const secretariat: SecretariatMember[] = [
  { name: 'Dr. Prashanth K', position: 'Faculty In-Charge', email: 'faculty@aimunsoc.org' },
  { name: 'Bhuvin Anil', position: 'Advisor', email: 'advisor@aimunsoc.org' },
  { name: 'Amoolya Sreenath', position: 'Secretary General', email: 'sg@aimunsoc.org' },
  { name: 'Samuel Moses Giddion', position: 'Director General', email: 'dg@aimunsoc.org' },
  { name: 'Sneha S', position: 'USG Head of Operations', email: 'operations@aimunsoc.org' },
  { name: 'Anushka Maneesh Rai', position: 'USG Head of Content & Documentation', email: 'content1@aimunsoc.org' },
  { name: 'Anushka Vishwakarma', position: 'USG Head of Content & Documentation', email: 'content2@aimunsoc.org' },
  { name: 'Vivyn Kshatriya', position: 'USG Head of Photography', email: 'photography@aimunsoc.org' },
  { name: 'Yuvraj Singh', position: 'USG Head of Logistics', email: 'logistics1@aimunsoc.org' },
  { name: 'Noel George', position: 'USG Head of Logistics', email: 'logistics2@aimunsoc.org' },
  { name: 'Shravya Dechamma', position: 'USG Head of Social Media & Marketing', email: 'marketing@aimunsoc.org' },
  { name: 'Vaibhav Vaswani', position: 'USG Head of Hospitality', email: 'hospitality1@aimunsoc.org' },
  { name: 'Yadriksha Uprety', position: 'USG Head of Hospitality', email: 'hospitality2@aimunsoc.org' },
  { name: 'Amarthya Gari Thammappa', position: 'USG Head of Finances', email: 'finance1@aimunsoc.org' },
  { name: 'Vedant S D', position: 'USG Head of Finances', email: 'finance2@aimunsoc.org' },
  { name: 'Adithya P Kumar', position: 'USG Head of Delegate Affairs', email: 'delegate@aimunsoc.org' },
  { name: 'Vishakha Shivhare', position: 'USG Head of Delegate Affairs', email: 'delegate2@aimunsoc.org' },
];
