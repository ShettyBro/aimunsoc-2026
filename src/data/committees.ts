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
  chairs: CommitteeMemberRole[];
  moderators: CommitteeMemberRole[];
}

export const committees: Committee[] = [
  {
    id: 'aippm',
    name: 'AIPPM',
    fullName: 'All India Political Parties Meet',
    type: 'national',
    image: '/CommitteeLogos/5.png',
    backgroundGuide: '/docs/AIPPM.pdf', // TODO: update for 2026
    chairs: [
      { name: 'Naman Vankdari', role: 'Chair' },
      { name: 'Anshuman Pandey', role: 'Vice-Chair' },
    ],
    moderators: [{ name: 'Daksh Jain', role: 'Moderator' }],
    description:
      'Dual-agenda committee addressing two critical domestic challenges. Agenda 1: Language-based conflicts in India — implications of the 60% Kannada usage mandate in commercial establishments. Agenda 2: Surge in police harassment following new criminal laws, focusing on controversial BNSS amendments granting extended enforcement powers.',
  },
  {
    id: 'unsc',
    name: 'UNSC',
    fullName: 'United Nations Security Council',
    type: 'international',
    image: '/CommitteeLogos/1.png',
    backgroundGuide: '/docs/UNSC.pdf', // TODO: update for 2026
    chairs: [
      { name: 'Adithya Krishna Menon', role: 'Chair' },
      { name: 'Safiullah Shaikh', role: 'Vice-Chair' },
    ],
    moderators: [{ name: 'Impana Rakesh', role: 'Moderator' }],
    description:
      'Charged with global peacekeeping, the UNSC navigates the legal and diplomatic terrain surrounding competing claims to governmental authority in Venezuela. Delegates must balance sovereignty with global stability in crafting resolutions that uphold international law.',
  },
  {
    id: 'unhrc',
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    type: 'international',
    image: '/CommitteeLogos/3.png',
    backgroundGuide: '/docs/UNHRC.pdf', // TODO: update for 2026
    chairs: [{ name: 'Phani Sreevatsa H A', role: 'Chair' }],
    moderators: [
      { name: 'Dhvani Pandey', role: 'Co-Vice Chair' },
      { name: 'Heena Noor', role: 'Co-Vice Chair' },
    ],
    description:
      'Delves into pressing human rights crises in conflict zones — Sudan and Gaza. Delegates examine violations, evaluate humanitarian interventions, and propose meaningful frameworks for justice, accountability, and recovery in war-torn regions.',
  },
  {
    id: 'ipc',
    name: 'IPC',
    fullName: 'International Press Corps',
    type: 'international',
    image: '/CommitteeLogos/6.png',
    backgroundGuide: '/docs/IPC.pdf', // TODO: update for 2026
    chairs: [
      { name: 'Algin B Thomas', role: 'Co-International Head of Press' },
      { name: 'Snehal Nandi', role: 'Co-International Head of Press' },
    ],
    moderators: [],
    description:
      'Covering conference proceedings and providing real-time news updates. The IPC is responsible for journalistic coverage across all committees, producing breaking news, op-eds, and live dispatches throughout the conference.',
  },
  {
    id: 'ccc',
    name: 'CCC',
    fullName: 'Continuous Crisis Committee',
    type: 'international',
    image: '/CommitteeLogos/2.png',
    backgroundGuide: '/docs/CCC.pdf', // TODO: update for 2026
    chairs: [
      { name: 'Abbas Ahmed', role: 'Co-Chair' },
      { name: 'Aakash Das', role: 'Co-Chair' },
    ],
    moderators: [],
    description:
      'A fast-paced crisis simulation set against the backdrop of the volatile 2025 Iran-Israel escalation. Delegates respond to evolving real-world scenarios, intelligence reports, and dynamic policymaking — navigating a high-stakes standoff teetering on the edge of global conflict.',
  },
  {
    id: 'unodc',
    name: 'UNODC',
    fullName: 'UN Office on Drugs and Crime',
    type: 'international',
    image: '/CommitteeLogos/4.png',
    backgroundGuide: '/docs/UNODC.pdf', // TODO: update for 2026
    chairs: [], // TODO: update for 2026
    moderators: [], // TODO: update for 2026
    description:
      'Addressing global challenges of drug trafficking, organized crime, and corruption. Delegates craft international frameworks for prevention, enforcement, and justice — with a focus on victim-centered policies, transnational cooperation, and rehabilitation.',
  },
  {
    id: 'disec',
    name: 'DISEC',
    fullName: 'Disarmament and International Security',
    type: 'international',
    image: '/CommitteeLogos/2.png',
    backgroundGuide: '/docs/DISEC.pdf', // TODO: update for 2026
    chairs: [], // TODO: update for 2026
    moderators: [], // TODO: update for 2026
    description:
      'Focused on disarmament issues and international security threats. Delegates debate de-nuclearization of the Middle East and address emerging gaps in the Non-Proliferation Treaty (NPT) framework, crafting cooperative strategies to uphold regional security.',
  },
];
