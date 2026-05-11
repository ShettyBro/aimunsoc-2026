import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, Award, ExternalLink } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import SectionDivider from '../components/ui/SectionDivider';
import Card from '../components/ui/Card';

const details = [
  {
    icon: Calendar,
    title: 'Conference Dates',
    content: '18th, 19th & 20th August 2026', // TODO: Update for 2026
  },
  {
    icon: MapPin,
    title: 'Venue',
    content: 'Acharya Institute of Technology, Soldevanahalli, Bengaluru',
  },
  {
    icon: Users,
    title: 'Expected Delegates',
    content: '300+ delegates from colleges across South India',
  },
  {
    icon: Award,
    title: 'Prize Pool',
    content: 'A massive prize pool awaits top-performing delegates.',
    link: {
      href: 'https://drive.google.com/file/d/1t-CL5mpsMq3HQZzYUx1dyJ0uoaLRx0ba/view?usp=sharing',
      label: 'View Brochure (PDF)',
    },
  },
];

const timeline = [
  {
    year: "AiCon '24",
    label: 'The Beginning',
    desc: 'AIMUNSOC hosted its inaugural conference, bringing together delegates for the first time on the Acharya campus.',
  },
  {
    year: "AiCon '25",
    label: 'Growing Strong',
    desc: '7 committees, 200+ delegates, and unforgettable moments of diplomacy. AiCon cemented itself as a premier South India MUN.',
  },
  {
    year: "AiCon '26",
    label: 'Upcoming',
    desc: 'The biggest AiCon yet. More committees, more delegates, more opportunities to debate, lead, and shine on a global stage.',
    upcoming: true,
  },
];

const About: React.FC = () => {
  return (
    <div>
      <PageHero
        title="About AiCon 2026"
        subtitle="Acharya Institute's premier Model United Nations conference, bringing together diplomatic minds from across the region."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission blockquote */}
        <motion.blockquote
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-l-4 border-gold pl-6 mb-16 max-w-3xl"
        >
          <p className="font-serif text-2xl md:text-3xl text-white leading-relaxed">
            "AiCon is not just a conference — it is a crucible where tomorrow's diplomats
            are forged through debate, dialogue, and determination."
          </p>
          <footer className="text-muted text-sm mt-4 font-sans">— AIMUNSOC</footer>
        </motion.blockquote>

        {/* Conference details grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {details.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="p-6 flex gap-4">
                <div className="bg-gold/10 w-12 h-12 rounded-lg flex items-center justify-center shrink-0">
                  <d.icon className="text-gold" size={22} />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white mb-1">{d.title}</h3>
                  <p className="text-muted text-sm">{d.content}</p>
                  {d.link && (
                    <a
                      href={d.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-gold text-sm hover:text-gold-light mt-2"
                    >
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
          {[
            { value: '300+', label: 'Delegates' },
            { value: '7', label: 'Committees' },
            { value: '3 Days', label: 'of Diplomacy' },
          ].map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center glass-card py-8"
            >
              <p className="font-serif text-4xl text-gold font-bold">{s.value}</p>
              <p className="text-muted text-sm uppercase tracking-widest mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <SectionDivider label="Timeline" />

        {/* Timeline */}
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gold/30" />
          <div className="space-y-10 pl-16">
            {timeline.map((t, i) => (
              <motion.div
                key={t.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative"
              >
                <div
                  className={`absolute -left-[46px] top-1 w-5 h-5 rounded-full border-2 ${
                    t.upcoming ? 'border-gold bg-navy-mid' : 'border-gold bg-gold'
                  }`}
                />
                <div className={`glass-card p-5 ${t.upcoming ? 'border-gold/50' : ''}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-serif text-xl text-gold">{t.year}</span>
                    {t.upcoming && (
                      <span className="text-xs bg-gold/20 text-gold px-2 py-0.5 rounded-full border border-gold/30">
                        Upcoming
                      </span>
                    )}
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
          <Link
            to="/register"
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-md hover:bg-gold-light transition-all duration-200 text-lg inline-block"
          >
            Register for AiCon 2026
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
