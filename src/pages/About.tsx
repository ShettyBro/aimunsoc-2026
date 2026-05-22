import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ExternalLink, Trophy, Clock } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionDivider from '../components/ui/SectionDivider';
import Card from '../components/ui/Card';
import { PRIZES } from '../data/pricing';

const details = [
  { icon: Calendar, title: 'Conference Dates', content: '16th, 17th & 18th July 2026' },
  { icon: MapPin, title: 'Venue', content: 'Acharya Institute of Technology, Soldevanahalli, Bengaluru' },
  { icon: Users, title: 'Expected Delegates', content: '300+ delegates from colleges across South India' },
  {
    icon: Award, title: 'Theme', content: '"Diplomacy through Cooperation"',
    link: { href: "/docs/Aicon'26 Invitational Brochure-C.pdf", label: 'View Brochure (PDF)' },
  },
];

const schedule = [
  {
    day: 'Day 1', date: 'July 16th',
    sessions: [
      { event: 'Opening Ceremony', time: '09:00 AM – 11:30 AM' },
      { event: 'Session I', time: '11:30 AM – 01:30 PM' },
      { event: 'Lunch', time: '01:30 PM – 02:30 PM' },
      { event: 'Session II', time: '02:30 PM – 03:30 PM' },
      { event: 'High Tea', time: '03:30 PM – 03:45 PM' },
      { event: 'Session III', time: '03:45 PM – 04:45 PM' },
    ],
  },
  {
    day: 'Day 2', date: 'July 17th',
    sessions: [
      { event: 'Session IV', time: '09:00 AM – 10:30 AM' },
      { event: 'Break', time: '10:30 AM – 11:15 AM' },
      { event: 'Session V', time: '11:15 AM – 01:30 PM' },
      { event: 'Lunch', time: '01:30 PM – 02:30 PM' },
      { event: 'Session VI', time: '02:30 PM – 03:30 PM' },
      { event: 'High Tea', time: '03:30 PM – 03:45 PM' },
      { event: 'Session VII', time: '03:45 PM – 04:45 PM' },
    ],
  },
  {
    day: 'Day 3', date: 'July 18th',
    sessions: [
      { event: 'Session VIII', time: '09:00 AM – 10:30 AM' },
      { event: 'Break', time: '10:30 AM – 11:15 AM' },
      { event: 'Session IX', time: '11:15 AM – 01:30 PM' },
      { event: 'Lunch', time: '01:30 PM – 02:30 PM' },
      { event: 'Session X', time: '02:30 PM – 03:30 PM' },
      { event: 'High Tea', time: '03:30 PM – 03:45 PM' },
      { event: 'Closing Ceremony', time: '03:45 PM – 05:00 PM' },
    ],
  },
];

const timeline = [
  { year: "AiCon '24", label: 'The Beginning', desc: 'AIMUNSOC hosted its inaugural conference, bringing together delegates for the first time on the Acharya campus.' },
  { year: "AiCon '25", label: 'Growing Strong', desc: '7 committees, 200+ delegates, and unforgettable moments of diplomacy. AiCon cemented itself as a premier South India MUN.' },
  { year: "AiCon '26", label: 'III Edition — Upcoming', desc: 'The biggest AiCon yet. More committees, more delegates, more opportunities to debate, lead, and shine on a global stage.', upcoming: true },
];

const About: React.FC = () => {
  return (
    <div>
      <PageHero title="About AiCon 2026" subtitle="Acharya Institute's premier Model United Nations conference — III Edition." />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* About AIMUNSOC */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16 max-w-4xl">
          <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">About AIMUNSOC</p>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            Founded in the vibrant autumn of 2023, the Acharya Institutes' Model United Nations Society — fondly known as AIMUNSOC — was born out of a shared passion for diplomacy, discourse, and global thinking. What began as a modest gathering of driven minds swiftly evolved into a thriving hub for aspiring delegates across the Acharya campus.
          </p>
          <p className="text-white/80 leading-relaxed text-base mb-4">
            The society transcended academic divisions, weaving together students from diverse colleges into a unified, dynamic forum for future diplomats. Today, it proudly ranks among Bangalore's most promising and rapidly rising MUN societies.
          </p>
          <p className="text-white/80 leading-relaxed text-base">
            A defining milestone came in July 2024, when AIMUNSOC unveiled the first edition of AiCon — its flagship conference that set a new benchmark in quality, organization, and engagement. Guided by the wisdom of experienced board members and inspired by the steadfast support of the visionary Managing Director — a former MUN delegate himself — AiCon marked the society's bold leap into the wider MUN landscape.
          </p>
        </motion.div>

        {/* Mission blockquote */}
        <motion.blockquote initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border-l-4 border-gold pl-6 mb-16 max-w-3xl">
          <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed">
            "AiCon is not just a conference — it is a crucible where tomorrow's diplomats are forged through debate, dialogue, and determination."
          </p>
          <footer className="text-muted text-sm mt-4 font-sans">— AIMUNSOC</footer>
        </motion.blockquote>

        {/* Conference details grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {details.map((d, i) => (
            <motion.div key={d.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <Card className="p-6 flex gap-4">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                  <d.icon className="text-gold" size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white mb-1">{d.title}</h3>
                  <p className="text-muted text-sm">{d.content}</p>
                  {d.link && (
                    <a href={d.link.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold text-sm hover:text-gold-light mt-2">
                      {d.link.label} <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {[{ value: '300+', label: 'Delegates' }, { value: '7', label: 'Committees' }, { value: '3 Days', label: 'of Diplomacy' }].map((s) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center glass-card py-8">
              <p className="font-serif text-4xl text-gold font-bold">{s.value}</p>
              <p className="text-muted text-sm uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <SectionDivider label="Prize Pool" />

        {/* Prize Money */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {PRIZES.map((p, i) => (
            <motion.div key={p.award} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="glass-card p-5 flex items-center gap-4">
              <div className="bg-gold/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                <Trophy className="text-gold" size={18} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{p.award}</p>
                <p className="text-gold font-serif text-xl font-bold">₹{p.amount.toLocaleString('en-IN')}/-</p>
              </div>
            </motion.div>
          ))}
        </div>

        <SectionDivider label="Schedule" />

        {/* Schedule */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {schedule.map((day, di) => (
            <motion.div key={day.day} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: di * 0.1 }} className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-gold" size={16} />
                <div>
                  <p className="text-gold font-semibold text-sm font-sans">{day.day}</p>
                  <p className="text-muted text-xs">{day.date}</p>
                </div>
              </div>
              <div className="space-y-2">
                {day.sessions.map((s) => (
                  <div key={s.event} className="flex justify-between items-start gap-2 border-b border-gold/10 pb-2 last:border-0 last:pb-0">
                    <p className="text-white text-xs font-medium">{s.event}</p>
                    <p className="text-muted text-xs whitespace-nowrap">{s.time}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <SectionDivider label="Timeline" />

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/30" />
          <div className="space-y-10 pl-16">
            {timeline.map((t, i) => (
              <motion.div key={t.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.15 }} className="relative">
                <div className={`absolute -left-[46px] top-1 w-5 h-5 rounded-full border-2 ${t.upcoming ? 'border-gold bg-navy-mid' : 'border-gold bg-gold'}`} />
                <div className={`glass-card p-5 ${t.upcoming ? 'border-gold/50' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl text-gold">{t.year}</span>
                    {t.upcoming && <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">Upcoming</span>}
                  </div>
                  <p className="text-white font-semibold mb-1">{t.label}</p>
                  <p className="text-muted text-sm">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <Link to="/register" className="bg-gold text-navy font-semibold px-8 py-4 rounded-md hover:bg-gold-light transition-all duration-200 text-lg inline-block">
            Register for AiCon 2026
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
