export interface CommitteeMemberRole {
  name: string;
  role: string;
}

export interface Committee {
  id: string;
  name: string;
  fullName: string;
  type: 'national' | 'international';
  description: string;
  image: string;
  backgroundGuide: string;
  venue: string;
  freezeDate?: string;
  chairs: CommitteeMemberRole[];
  moderators: CommitteeMemberRole[];
}

export const committees: Committee[] = [
  {
    id: 'unsc',
    name: 'UNSC',
    fullName: 'United Nations Security Council',
    type: 'international',
    image: '/CommitteeLogos/1.png',
    backgroundGuide: '/docs/UNSC.pdf',
    venue: 'Library Seminar Hall',
    freezeDate: 'August 1948',
    chairs: [
      { name: 'Aditya Krishna Menon', role: 'Chairperson' },
      { name: 'Dhruv Bajaj', role: 'Vice Chairperson' },
      { name: 'Jayanth N', role: 'Rapporteur' },
    ],
    moderators: [],
    description:
      'Agenda: Operation Polo. Set in August 1948, delegates navigate the complex diplomatic and military landscape surrounding the integration of Hyderabad State into the Indian Union. The UNSC debates sovereignty, use of force, and the application of international law in one of history\'s pivotal post-partition crises.',
  },
  {
    id: 'disec',
    name: 'UNGA-DISEC',
    fullName: 'Disarmament and International Security Committee',
    type: 'international',
    image: '/CommitteeLogos/2.png',
    backgroundGuide: '/docs/DISEC.pdf',
    venue: 'Library Conference Room',
    chairs: [
      { name: 'Anish G', role: 'Chairperson' },
      { name: 'Smrithi Krishna', role: 'Vice Chairperson' },
      { name: 'Udeern Srihari', role: 'Rapporteur' },
    ],
    moderators: [],
    description:
      'Agenda: Countering the Threat Posed by Improvised Explosive Devices (IEDs). Delegates address the proliferation and devastating impact of IEDs on civilian populations and global security, crafting multilateral frameworks for detection, prevention, and international cooperation.',
  },
  {
    id: 'unhrc',
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    type: 'international',
    image: '/CommitteeLogos/3.png',
    backgroundGuide: '/docs/UNHRC.pdf',
    venue: 'MBA Auditorium',
    chairs: [
      { name: 'Alby Mathew', role: 'Chairperson' },
      { name: 'Sreehari R Pillai', role: 'Co-Vice Chairperson' },
      { name: 'Shriya Asija', role: 'Co-Vice Chairperson' },
    ],
    moderators: [],
    description:
      'Agenda: Upholding Human Rights During Armed Conflict. Delegates examine violations of international humanitarian law in active conflict zones, evaluate existing protection mechanisms, and propose meaningful frameworks for accountability, justice, and the protection of civilians in war.',
  },
  {
    id: 'unw',
    name: 'UN Women',
    fullName: 'United Nations Women',
    type: 'international',
    image: '/CommitteeLogos/4.png',
    backgroundGuide: '/docs/UNW.pdf',
    venue: 'AIGS Seminar Hall',
    chairs: [
      { name: 'Noel Aniket Nayak', role: 'Chairperson' },
      { name: 'Maanvi S V', role: 'Co-Chairperson' },
      { name: 'Haniya S', role: 'Vice Chairperson' },
    ],
    moderators: [],
    description:
      "Agenda: Addressing Rising Threats to Women's Safety in the Age of AI Deepfakes and Migration Crises During Regional Conflict. Delegates confront the intersection of technology-enabled gender-based violence and the heightened vulnerability of women and girls displaced by conflict and migration.",
  },
  {
    id: 'jcc-india',
    name: 'JCC – India',
    fullName: 'Joint Crisis Committee – Indian Cabinet',
    type: 'national',
    image: '/CommitteeLogos/5.png',
    backgroundGuide: '/docs/JCC.pdf',
    venue: 'Civil Seminar Hall',
    freezeDate: '3 December 1971',
    chairs: [
      { name: 'Shreyas D B', role: 'Chairperson' },
      { name: 'Anirudh R', role: 'Co-Chairperson' },
      { name: 'Arjun Singh', role: 'Rapporteur' },
    ],
    moderators: [],
    description:
      'Agenda: The Third Indo-Pakistan War (Freeze Date: 3 December 1971). As war erupts, the Indian Cabinet must coordinate military strategy, international diplomacy, and domestic stability. Delegates navigate real-time crisis updates in a high-stakes simulation of one of South Asia\'s most consequential conflicts.',
  },
  {
    id: 'jcc-pakistan',
    name: 'JCC – Pakistan',
    fullName: 'Joint Crisis Committee – Pakistan Cabinet',
    type: 'national',
    image: '/CommitteeLogos/5.png',
    backgroundGuide: '/docs/JCC.pdf',
    venue: 'Civil Seminar Hall',
    freezeDate: '3 December 1971',
    chairs: [
      { name: 'Abbas Ahmed', role: 'Chairperson' },
      { name: 'Aditi Anand', role: 'Vice Chairperson' },
      { name: 'Mohammed Hisham', role: 'Rapporteur' },
    ],
    moderators: [],
    description:
      'Agenda: The Third Indo-Pakistan War (Freeze Date: 3 December 1971). The Pakistan Cabinet faces a rapidly deteriorating military and political situation. Delegates must manage an evolving two-front crisis, seek international alliances, and chart a course through one of the most turbulent moments in Pakistani history.',
  },
  {
    id: 'aippm',
    name: 'AIPPM',
    fullName: 'All India Political Parties Meet',
    type: 'national',
    image: '/CommitteeLogos/5.png',
    backgroundGuide: "/docs/AIPPM BG-AICON'26.pdf",
    venue: 'Mechanical Auditorium',
    chairs: [
      { name: 'Yashwanth Gowda', role: 'Chairperson' },
      { name: 'Manav Dharia', role: 'Co-Chairperson' },
      { name: 'Yuvashree K', role: 'Rapporteur' },
    ],
    moderators: [],
    description:
      'Agenda: The Indian Security Doctrine – Addressing Hybrid Warfare, Internal Destabilisation, and Cross-Border Threats. India\'s political leaders convene to debate national security strategy amid evolving threats of hybrid warfare, cyber attacks, and cross-border insurgency.',
  },
  {
    id: 'ipc',
    name: 'IPC',
    fullName: 'International Press Corps',
    type: 'international',
    image: '/CommitteeLogos/6.png',
    backgroundGuide: '/docs/AICON 26 IPC Background Guide.PDF',
    venue: 'MBA Boardroom',
    chairs: [
      { name: 'Siya Anand', role: 'Head of International Press' },
      { name: 'Prachi Prasad', role: 'Editor-in-Chief' },
    ],
    moderators: [],
    description:
      'The International Press Corps covers conference proceedings in real time, producing breaking news, op-eds, interviews, and live dispatches. Reporters develop sharp journalistic instincts while shaping the narrative across all committees throughout AiCon\'26.',
  },
  {
    id: 'photojournalism',
    name: 'Photojournalism',
    fullName: 'Photojournalism',
    type: 'international',
    image: '/CommitteeLogos/6.png',
    backgroundGuide: '/docs/AiCon 2026- IP(Photojournalist)-BG final.pdf',
    venue: 'MBA Boardroom',
    chairs: [
      { name: 'Priyanshu Lahoti', role: 'Chairperson' },
      { name: 'Impana Rakesh', role: 'Vice Chairperson' },
    ],
    moderators: [],
    description:
      'The Photojournalism committee captures the spirit of AiCon\'26 through the lens. Delegates document key moments, committees, and personalities across the conference, competing for Best Photographer while building a visual record of the event.',
  },
];
