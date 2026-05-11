import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, CreditCard, User, Users, School, UserCheck, ExternalLink } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import StepIndicator from '../components/ui/StepIndicator';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import {
  INDIVIDUAL_BASE_FEE,
  ACCOMMODATION_2_NIGHTS,
  ACCOMMODATION_3_NIGHTS,
  PAYMENT_URL,
  MATRIX_URL,
  INDIAN_POLITICIANS,
  INTERNATIONAL_PORTFOLIOS,
} from '../data/pricing';
import { committees } from '../data/committees';
import { calcIndividualTotal, calcDelegationTotal } from '../utils/pricing';
import api from '../utils/api';
import { IndividualFormData, DelegationFormData } from '../types';
import IndividualForm from '../components/registration/IndividualForm';
import DelegationForm from '../components/registration/DelegationForm';

type TabType = 'individual' | 'delegation';

const Register: React.FC = () => {
  const [tab, setTab] = useState<TabType>('individual');

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-lg border border-gold/30 overflow-hidden">
            <button
              onClick={() => setTab('individual')}
              className={`flex items-center gap-2 px-6 py-3 font-sans font-semibold text-sm transition-all ${
                tab === 'individual' ? 'bg-gold text-navy' : 'text-gold hover:bg-gold/10'
              }`}
            >
              <User size={16} /> Individual
            </button>
            <button
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
      </div>
    </div>
  );
};

export default Register;
