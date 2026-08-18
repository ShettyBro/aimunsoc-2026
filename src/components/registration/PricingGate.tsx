import React from 'react';
import { motion } from 'framer-motion';
import { User, Users, ChevronRight, Tag, Bed } from 'lucide-react';
import {
  INDIVIDUAL_BASE_FEE,
  ACCOMMODATION_FEE,
  ACCOMMODATION_LABEL,
  DELEGATION_TIERS,
} from '../../data/pricing';

interface PricingGateProps {
  onProceed: () => void;
}

const PricingGate: React.FC<PricingGateProps> = ({ onProceed }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <div className="text-center mb-6">
        <p className="text-gold text-xs uppercase tracking-[0.25em] font-sans mb-2">Registration Fees</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">Pricing Details</h2>
        <p className="text-muted text-sm max-w-md mx-auto">
          Review the fee structure below before proceeding to the registration form.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6">
        {/* Individual */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card p-6 border border-gold/20 rounded-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none rounded-xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gold/15 w-11 h-11 rounded-lg flex items-center justify-center">
                <User size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs uppercase tracking-widest font-sans">Individual</p>
                <h3 className="font-serif text-xl text-white">Single Delegate</h3>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2.5 border-b border-navy-mid/60">
                <span className="text-muted text-sm flex items-center gap-2">
                  <Tag size={13} className="text-gold/60" /> Registration Fee
                </span>
                <span className="text-white font-semibold">&#8377;{INDIVIDUAL_BASE_FEE.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2.5 border-b border-navy-mid/60">
                <span className="text-muted text-sm flex items-center gap-2">
                  <Bed size={13} className="text-gold/60" /> Accommodation
                  <span className="text-gold/60 text-xs">(optional, {ACCOMMODATION_LABEL})</span>
                </span>
                <span className="text-gold font-semibold text-xs">Contact Bhuvin: 6385599477</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-muted text-sm">Total (no accommodation)</span>
                <span className="font-serif text-2xl text-gold font-bold">&#8377;{INDIVIDUAL_BASE_FEE.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Delegation */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="glass-card p-6 border border-gold/20 rounded-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none rounded-xl" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-gold/15 w-11 h-11 rounded-lg flex items-center justify-center">
                <Users size={20} className="text-gold" />
              </div>
              <div>
                <p className="text-gold text-xs uppercase tracking-widest font-sans">Delegation</p>
                <h3 className="font-serif text-xl text-white">Institutional (Min. 10)</h3>
              </div>
            </div>
            <p className="text-muted text-xs uppercase tracking-widest font-sans mb-3">Per Head Rate</p>
            <div className="space-y-2 mb-4">
              {DELEGATION_TIERS.map((tier) => {
                const label = tier.max === Infinity ? `${tier.min}+ members` : `${tier.min}-${tier.max} members`;
                const isBest = tier.max === Infinity;
                return (
                  <div
                    key={tier.min}
                    className={`flex justify-between items-center rounded-lg px-4 py-2.5 ${
                      isBest ? 'bg-gold/10 border border-gold/30' : 'bg-navy/40 border border-navy-mid/50'
                    }`}
                  >
                    <span className={`text-sm ${isBest ? 'text-gold font-semibold' : 'text-muted'}`}>
                      {label}
                      {isBest && (
                        <span className="ml-2 text-xs bg-gold/20 text-gold px-1.5 py-0.5 rounded-full">Best Rate</span>
                      )}
                    </span>
                    <span className={`font-serif text-lg font-bold ${isBest ? 'text-gold' : 'text-white'}`}>
                      &#8377;{tier.perHead.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between items-center py-2 border-t border-navy-mid/60 mt-2">
              <span className="text-muted text-sm flex items-center gap-2">
                <Bed size={13} className="text-gold/60" /> Accommodation (optional)
              </span>
              <span className="text-gold font-semibold text-xs">Contact Bhuvin: 6385599477</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Note */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="bg-gold/5 border border-gold/20 rounded-xl px-5 py-3 mb-6 text-sm text-muted"
      >
        <span className="text-gold font-semibold">Note: </span>
        Accommodation charges are optional and cover {ACCOMMODATION_LABEL}. For accommodation pricing, contact{' '}
        <span className="text-gold font-semibold">Bhuvin: 6385599477</span>. A complimentary shuttle
        service is available to and from the nearby metro station.
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex justify-center"
      >
        <button
          onClick={onProceed}
          className="group flex items-center gap-3 bg-gold text-navy font-sans font-bold px-10 py-4 rounded-lg text-lg hover:bg-gold-light transition-all duration-200 shadow-lg shadow-gold/20"
        >
          Proceed to Register
          <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default PricingGate;
