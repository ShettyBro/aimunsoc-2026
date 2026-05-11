import React from 'react';
import { motion } from 'framer-motion';
import {
  Crown, Shield, ClipboardList, DollarSign, BookOpen, Star, Briefcase,
  User, UserCheck, Camera, Truck, Megaphone, Coffee, FileText, GraduationCap, Mail
} from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionDivider from '../components/ui/SectionDivider';
import InitialsAvatar from '../components/ui/InitialsAvatar';
import { currentBoard, formerBoard, secretariat, BoardMember, SecretariatMember } from '../data/board';

function getRoleIcon(position: string) {
  if (position.includes('Director')) return Crown;
  if (position.includes('President')) return Shield;
  if (position.includes('Secretary')) return ClipboardList;
  if (position.includes('Treasurer')) return DollarSign;
  if (position.includes('Advisor')) return UserCheck;
  if (position.includes('Editor')) return BookOpen;
  if (position.includes('Creator')) return Star;
  if (position.includes('Faculty')) return Briefcase;
  if (position.includes('Photography')) return Camera;
  if (position.includes('Logistics')) return Truck;
  if (position.includes('Marketing')) return Megaphone;
  if (position.includes('Hospitality')) return Coffee;
  if (position.includes('Finances')) return DollarSign;
  if (position.includes('Content')) return FileText;
  if (position.includes('Operations')) return User;
  if (position.includes('Delegate Affairs')) return UserCheck;
  if (position.includes('General')) return Crown;
  return User;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const BoardCard: React.FC<{ member: BoardMember }> = ({ member }) => {
  const Icon = getRoleIcon(member.position);
  return (
    <motion.div variants={item} className="glass-card p-5 text-center group">
      <div className="mb-4 flex justify-center">
        {member.image ? (
          <img src={member.image} alt={member.name} className="w-28 h-28 rounded-full object-cover object-center border-2 border-gold mx-auto" />
        ) : (
          <InitialsAvatar name={member.name} size="lg" className="mx-auto" />
        )}
      </div>
      <div className="bg-gold/10 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/20 transition-colors">
        <Icon className="text-gold" size={18} />
      </div>
      <h3 className="font-serif text-lg text-white leading-tight mb-1">{member.name}</h3>
      <p className="text-gold text-xs uppercase tracking-wide font-sans">{member.position}</p>
    </motion.div>
  );
};

const Board: React.FC = () => {
  const faculty = secretariat.slice(0, 2);
  const leadership = secretariat.slice(2, 4);
  const usgs = secretariat.slice(4);

  return (
    <div>
      <PageHero title="Board & Secretariat" subtitle="The dedicated individuals who lead, mentor, and build AIMUNSOC." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Current Board */}
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="font-serif text-3xl text-gold text-center mb-10">Current Board</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {currentBoard.map((m) => <BoardCard key={m.name} member={m} />)}
          </div>
        </motion.div>

        <SectionDivider label="Former Board" />

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-xl mx-auto mb-16">
          {formerBoard.map((m) => <BoardCard key={m.name} member={m} />)}
        </motion.div>

        <SectionDivider label="AiCon Secretariat" />

        {/* Faculty & Advisory */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl text-white text-center mb-8">Faculty & Advisory</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {faculty.map((m) => <SecretariatCard key={m.name} member={m} />)}
          </div>
        </div>

        {/* Core Leadership */}
        <div className="mb-12">
          <h3 className="font-serif text-2xl text-white text-center mb-8">Core Leadership</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {leadership.map((m) => <SecretariatCard key={m.name} member={m} />)}
          </div>
        </div>

        {/* USGs */}
        <div>
          <h3 className="font-serif text-2xl text-white text-center mb-8">Under Secretary Generals</h3>
          <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usgs.map((m) => <SecretariatCard key={m.email} member={m} />)}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const SecretariatCard: React.FC<{ member: SecretariatMember }> = ({ member }) => {
  const Icon = getRoleIcon(member.position);
  return (
    <motion.div variants={item} className="glass-card p-6 text-center group">
      <div className="bg-gold/10 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
        <Icon className="text-gold" size={24} />
      </div>
      <h3 className="font-serif text-lg text-white mb-1">{member.name}</h3>
      <p className="text-gold text-xs uppercase tracking-wide font-sans mb-3">{member.position}</p>
      <a href={`mailto:${member.email}`} className="inline-flex items-center gap-1 text-muted text-xs hover:text-gold transition-colors">
        <Mail size={11} /> {member.email}
      </a>
    </motion.div>
  );
};

export default Board;
