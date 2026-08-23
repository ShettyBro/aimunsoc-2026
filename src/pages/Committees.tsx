import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Users, X, ExternalLink, Download } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import { committees, Committee } from '../data/committees';
import { MATRIX_URL } from '../data/pricing';

const typeBadge = (type: 'national' | 'international') =>
  type === 'national'
    ? 'bg-teal/20 text-teal border border-teal/30'
    : 'bg-gold/20 text-gold border border-gold/30';

// Docs that actually exist in /public/docs
const AVAILABLE_DOCS = new Set([
  "/docs/AICON 26 IPC Background Guide.PDF",
  "/docs/AIPPM BG-AICON'26.pdf",
  "/docs/AiCon 2026- IP(Photojournalist)-BG final.pdf",
  "/docs/AICON UNSC BG.pdf",
  "/docs/BACKGROUND GUIDE - AI CON 26 DISEC.pdf",
  "/docs/UNW BG AICON 26.pdf",
]);

interface CommitteeModalProps {
  committee: Committee;
  onClose: () => void;
}

const CommitteeModal: React.FC<CommitteeModalProps> = ({ committee, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-navy-light border border-gold/30 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted hover:text-white transition-colors"
          >
            <X size={22} />
          </button>

          {/* Header */}
          <div className="flex items-start gap-5 mb-6">
            <img src={committee.image} alt={committee.name} className="h-16 w-16 object-contain shrink-0" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="font-serif text-3xl text-white">{committee.name}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full font-sans uppercase tracking-wider ${typeBadge(committee.type)}`}>
                  {committee.type}
                </span>
              </div>
              <p className="text-muted text-sm">{committee.fullName}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted text-sm leading-relaxed mb-4 whitespace-pre-line">
            {committee.description}
          </p>

          {/* Freeze Date & Venue */}
          <div className="flex flex-wrap gap-3 mb-6">
            {committee.freezeDate && (
              <div className="flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-lg px-3 py-1.5">
                <span className="text-gold text-xs uppercase tracking-widest font-sans">Freeze Date</span>
                <span className="text-white text-xs font-semibold">{committee.freezeDate}</span>
              </div>
            )}
            <div className="flex items-center gap-2 bg-navy/60 border border-white/10 rounded-lg px-3 py-1.5">
              <span className="text-muted text-xs uppercase tracking-widest font-sans">Venue</span>
              <span className="text-white text-xs font-semibold">{committee.venue}</span>
            </div>
          </div>

          {/* Chairs */}
          {committee.chairs.length > 0 && (
            <div className="mb-5">
              <h3 className="text-gold text-xs uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                <Crown size={14} /> Leadership
              </h3>
              <div className="space-y-2">
                {committee.chairs.map((c) => (
                  <div key={c.name} className="flex items-center justify-between bg-navy/60 rounded-lg px-4 py-2">
                    <span className="text-white text-sm">{c.name}</span>
                    <span className="text-gold text-xs bg-gold/10 px-2 py-0.5 rounded">{c.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Moderators */}
          {committee.moderators.length > 0 && (
            <div className="mb-6">
              <h3 className="text-gold text-xs uppercase tracking-widest font-sans mb-3 flex items-center gap-2">
                <Users size={14} /> Moderation
              </h3>
              <div className="space-y-2">
                {committee.moderators.map((m) => (
                  <div key={m.name} className="flex items-center justify-between bg-navy/60 rounded-lg px-4 py-2">
                    <span className="text-white text-sm">{m.name}</span>
                    <span className="text-gold text-xs bg-gold/10 px-2 py-0.5 rounded">{m.role}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Download Background Guide */}
          <div className="mt-6 pt-5 border-t border-gold/15">
            {AVAILABLE_DOCS.has(committee.backgroundGuide) ? (
              <a
                href={committee.backgroundGuide}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gold text-navy font-semibold px-4 py-2.5 rounded-md hover:bg-gold-light transition-all text-sm"
              >
                <Download size={14} />
                Download Background Guide
              </a>
            ) : (
              <button
                disabled
                className="flex items-center justify-center gap-2 w-full border border-muted/20 text-muted/40 px-4 py-2.5 rounded-md text-sm cursor-not-allowed"
              >
                <Download size={14} />
                Background Guide — Coming Soon
              </button>
            )}
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Committees: React.FC = () => {
  usePageTitle('Committees');
  const [selectedCommittee, setSelectedCommittee] = useState<Committee | null>(null);

  return (
    <div>
      <PageHero title="Committees">
        <a
          href={MATRIX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm border border-gold/30 rounded-md px-4 py-2 hover:bg-gold/10 transition-all"
        >
          View Matrix Spreadsheet <ExternalLink size={13} />
        </a>
      </PageHero>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {committees.map((committee) => (
            <motion.div key={committee.id} variants={item}>
              <div className="glass-card p-6 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={committee.image}
                    alt={committee.name}
                    className="h-16 w-16 object-contain shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h2 className="font-serif text-2xl text-white">{committee.name}</h2>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-sans uppercase tracking-wider ${typeBadge(committee.type)}`}>
                        {committee.type}
                      </span>
                    </div>
                    <p className="text-muted text-xs truncate">{committee.fullName}</p>
                  </div>
                </div>
                <p className="text-muted text-sm leading-relaxed flex-1 line-clamp-3 mb-5">
                  {committee.description}
                </p>
                {/* Buttons row */}
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setSelectedCommittee(committee)}
                    className="border border-gold text-gold px-4 py-2 rounded-md hover:bg-gold/10 transition-all text-sm font-sans w-full"
                  >
                    View Details
                  </button>
                  {AVAILABLE_DOCS.has(committee.backgroundGuide) ? (
                    <a
                      href={committee.backgroundGuide}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-gold/10 border border-gold/40 text-gold px-4 py-2 rounded-md hover:bg-gold/20 transition-all text-sm font-sans w-full"
                    >
                      <Download size={13} />
                      Background Guide
                    </a>
                  ) : (
                    <button
                      disabled
                      className="flex items-center justify-center gap-2 border border-muted/15 text-muted/35 px-4 py-2 rounded-md text-sm font-sans w-full cursor-not-allowed"
                    >
                      <Download size={13} />
                      BG Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16 glass-card p-12">
          <h2 className="font-serif text-3xl text-white mb-4">Ready to Join a Committee?</h2>
          <p className="text-muted mb-8">Register for AiCon 2026 and choose your committee preference.</p>
          <Link
            to="/register"
            className="bg-gold text-navy font-semibold px-8 py-4 rounded-md hover:bg-gold-light transition-all text-lg"
          >
            Register Now
          </Link>
        </div>
      </div>

      {selectedCommittee && (
        <CommitteeModal
          committee={selectedCommittee}
          onClose={() => setSelectedCommittee(null)}
        />
      )}
    </div>
  );
};

export default Committees;
