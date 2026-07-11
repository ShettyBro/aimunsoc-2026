import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, XCircle, ExternalLink } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';
import PageHero from '../components/ui/PageHero';
import { MATRIX_URL, REGISTRATION_OPEN } from '../data/pricing';
import IndividualForm from '../components/registration/IndividualForm';
import DelegationForm from '../components/registration/DelegationForm';
import PricingGate from '../components/registration/PricingGate';

type TabType = 'individual' | 'delegation';
type ViewType = 'pricing' | 'form';

const Register: React.FC = () => {
  usePageTitle('Register for AiCon 2026');
  const [tab, setTab] = useState<TabType>('individual');
  const [view, setView] = useState<ViewType>('pricing');

  return (
    <div>
      <PageHero title="AiCon 2026 Registration" subtitle="Choose your registration type below.">
        <a
          href={MATRIX_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold hover:text-gold-light text-sm border border-gold/30 rounded-md px-4 py-2 hover:bg-gold/10 transition-all mt-2"
        >
          View Committee Matrix <ExternalLink size={13} />
        </a>
      </PageHero>

      {/* ── Registration Closed ──────────────────────────────────────────── */}
      {!REGISTRATION_OPEN && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
        >
          <div className="glass-card p-12 border border-gold/20 rounded-2xl">
            <div className="flex justify-center mb-6">
              <div className="bg-red-500/10 w-20 h-20 rounded-full flex items-center justify-center border border-red-500/30">
                <XCircle size={42} className="text-red-400" />
              </div>
            </div>
            <h2 className="font-serif text-4xl text-white mb-4">Registrations Closed</h2>
            <p className="text-muted text-lg leading-relaxed mb-2">
              Registration for AiCon 2026 is currently closed.
            </p>
            <p className="text-muted/70 text-sm">
              Please check back later or follow our social media for updates.
            </p>
          </div>
        </motion.div>
      )}

      {/* ── Registration Open ────────────────────────────────────────────── */}
      {REGISTRATION_OPEN && (
        <>
          {/* Step 1 — Pricing Gate */}
          <AnimatePresence mode="wait">
            {view === 'pricing' && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <PricingGate onProceed={() => setView('form')} />
              </motion.div>
            )}

            {/* Step 2 — Registration Form */}
            {view === 'form' && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
              >
                {/* Tab switcher */}
                <div className="flex justify-center mb-10">
                  <div className="flex rounded-lg border border-gold/30 overflow-hidden">
                    <button
                      id="tab-individual"
                      onClick={() => setTab('individual')}
                      className={`flex items-center gap-2 px-6 py-3 font-sans font-semibold text-sm transition-all ${
                        tab === 'individual' ? 'bg-gold text-navy' : 'text-gold hover:bg-gold/10'
                      }`}
                    >
                      <User size={16} /> Individual
                    </button>
                    <button
                      id="tab-delegation"
                      onClick={() => setTab('delegation')}
                      className={`flex items-center gap-2 px-6 py-3 font-sans font-semibold text-sm transition-all ${
                        tab === 'delegation' ? 'bg-gold text-navy' : 'text-gold hover:bg-gold/10'
                      }`}
                    >
                      <Users size={16} /> Delegation
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {tab === 'individual' ? (
                    <motion.div
                      key="individual"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <IndividualForm />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="delegation"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <DelegationForm />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Register;

