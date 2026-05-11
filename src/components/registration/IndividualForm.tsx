import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, CreditCard, User, Users, School, UserCheck, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import StepIndicator from '../ui/StepIndicator';
import Button from '../ui/Button';
import {
  PAYMENT_URL, MATRIX_URL, INDIAN_POLITICIANS, INTERNATIONAL_PORTFOLIOS,
  INDIVIDUAL_BASE_FEE, ACCOMMODATION_2_NIGHTS, ACCOMMODATION_3_NIGHTS
} from '../../data/pricing';
import { committees } from '../../data/committees';
import { calcIndividualTotal } from '../../utils/pricing';
import api from '../../utils/api';
import { IndividualFormData } from '../../types';

const STEPS = ['Personal', 'Committees', 'Accommodation', 'Payment', 'Confirm'];

const emptyForm: IndividualFormData = {
  fullName: '', age: '', institution: '', email: '', phone: '',
  committeePreference1: '', committeePreference2: '', committeePreference3: '',
  portfolioPreference1: '', portfolioPreference2: '', portfolioPreference3: '',
  accommodationRequired: false, accommodationScheme: '', transactionId: '',
};

const inputCls = 'w-full bg-navy-light border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors';
const labelCls = 'block text-sm font-sans text-muted mb-1.5';
const errorCls = 'text-danger text-sm mt-1 flex items-center gap-1';

const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
  msg ? <p className={errorCls}><AlertCircle size={13} />{msg}</p> : null;

function getPortfolioOptions(committeeName: string): string[] {
  const c = committees.find((c) => c.name === committeeName || c.fullName === committeeName);
  return c?.type === 'national' ? INDIAN_POLITICIANS : INTERNATIONAL_PORTFOLIOS;
}

const IndividualForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<IndividualFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof IndividualFormData | 'committees' | 'portfolios', string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTxInput, setShowTxInput] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [registrationId, setRegistrationId] = useState('');

  const set = (field: keyof IndividualFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pricing = calcIndividualTotal(form.accommodationRequired, form.accommodationScheme as '2nights' | '3nights' | '');

  const validateStep = (): boolean => {
    const errs: typeof errors = {};
    if (step === 0) {
      if (!form.fullName.trim()) errs.fullName = 'Full name is required';
      if (!form.age.trim()) errs.age = 'Age is required';
      if (!form.institution.trim()) errs.institution = 'Institution is required';
      if (!form.email.trim()) errs.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Invalid email';
      if (!form.phone.trim()) errs.phone = 'Phone is required';
    }
    if (step === 1) {
      if (!form.committeePreference1) errs.committees = 'At least 1 committee preference required';
      if (!form.portfolioPreference1) errs.portfolios = 'At least 1 portfolio preference required';
    }
    if (step === 2) {
      if (form.accommodationRequired && !form.accommodationScheme) {
        errs.accommodationScheme = 'Please select an accommodation scheme';
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => s + 1); };
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (!form.transactionId.trim() || form.transactionId.trim().length < 3) return;
    setIsSubmitting(true);
    setErrorBanner('');
    try {
      const res = await api.post('/register/individual', {
        ...form,
        totalAmount: pricing.total,
      });
      setRegistrationId(res.data.registrationId);
      setStep(4);
    } catch (e: any) {
      setErrorBanner(e?.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const committeeOptions = committees.map((c) => c.name);

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      {errorBanner && (
        <div className="mb-6 bg-danger/10 border border-danger/30 rounded-lg px-4 py-3 text-danger text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {errorBanner}
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 0 — Personal Details */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><User size={22} className="text-gold" /> Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input className={`${inputCls} ${errors.fullName ? 'border-danger' : ''}`} placeholder="Your full name" value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
                <FieldError msg={errors.fullName} />
              </div>
              <div>
                <label className={labelCls}>Age *</label>
                <input type="number" className={`${inputCls} ${errors.age ? 'border-danger' : ''}`} placeholder="Your age" value={form.age} onChange={(e) => set('age', e.target.value)} />
                <FieldError msg={errors.age} />
              </div>
              <div className="md:col-span-2">
                <label className={labelCls}>Institution *</label>
                <input className={`${inputCls} ${errors.institution ? 'border-danger' : ''}`} placeholder="Your college/institution" value={form.institution} onChange={(e) => set('institution', e.target.value)} />
                <FieldError msg={errors.institution} />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input type="email" className={`${inputCls} ${errors.email ? 'border-danger' : ''}`} placeholder="your@email.com" value={form.email} onChange={(e) => set('email', e.target.value)} />
                <FieldError msg={errors.email} />
              </div>
              <div>
                <label className={labelCls}>Phone *</label>
                <input type="tel" className={`${inputCls} ${errors.phone ? 'border-danger' : ''}`} placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                <FieldError msg={errors.phone} />
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 1 — Committee Preferences */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-2 flex items-center gap-2"><Users size={22} className="text-gold" /> Committee Preferences</h2>
            <a href={MATRIX_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-gold text-xs mb-6 hover:text-gold-light">
              View Matrix Spreadsheet <ExternalLink size={11} />
            </a>
            {errors.committees && <FieldError msg={errors.committees} />}
            {errors.portfolios && <FieldError msg={errors.portfolios} />}
            <div className="space-y-5 mt-2">
              {([
                ['committeePreference1', 'portfolioPreference1', '1st Preference *'],
                ['committeePreference2', 'portfolioPreference2', '2nd Preference'],
                ['committeePreference3', 'portfolioPreference3', '3rd Preference'],
              ] as [keyof IndividualFormData, keyof IndividualFormData, string][]).map(([cpKey, ppKey, label]) => (
                <div key={cpKey}>
                  <p className="text-gold text-xs uppercase tracking-widest font-sans mb-2">{label}</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className={labelCls}>Committee</label>
                      <select className={inputCls} value={form[cpKey] as string} onChange={(e) => { set(cpKey, e.target.value); set(ppKey, ''); }}>
                        <option value="">Select committee</option>
                        {committeeOptions.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className={labelCls}>Portfolio</label>
                      <select className={inputCls} value={form[ppKey] as string} onChange={(e) => set(ppKey, e.target.value)} disabled={!form[cpKey]}>
                        <option value="">Select portfolio</option>
                        {getPortfolioOptions(form[cpKey] as string).map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2 — Accommodation */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><School size={22} className="text-gold" /> Accommodation</h2>
            <label className="flex items-center gap-3 cursor-pointer mb-6">
              <input type="checkbox" className="w-5 h-5 accent-yellow-500" checked={form.accommodationRequired}
                onChange={(e) => { set('accommodationRequired', e.target.checked); if (!e.target.checked) set('accommodationScheme', ''); }} />
              <span className="text-white">I require accommodation</span>
            </label>
            {form.accommodationRequired && (
              <div className="ml-8 space-y-3">
                {([['2nights', `2 Nights / 3 Days (+₹${ACCOMMODATION_2_NIGHTS})`], ['3nights', `3 Nights / 3 Days (+₹${ACCOMMODATION_3_NIGHTS})`]] as const).map(([val, lbl]) => (
                  <label key={val} className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="accScheme" className="accent-yellow-500" value={val}
                      checked={form.accommodationScheme === val} onChange={() => set('accommodationScheme', val)} />
                    <span className="text-white">{lbl}</span>
                  </label>
                ))}
                <FieldError msg={errors.accommodationScheme} />
              </div>
            )}
          </motion.div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><CreditCard size={22} className="text-gold" /> Payment Summary</h2>
            <div className="bg-navy/60 rounded-xl p-6 mb-6 border border-gold/20">
              <div className="flex justify-between text-muted text-sm py-2">
                <span>Delegate Registration Fee</span><span>₹{INDIVIDUAL_BASE_FEE.toLocaleString()}</span>
              </div>
              {form.accommodationRequired && form.accommodationScheme && (
                <div className="flex justify-between text-muted text-sm py-2">
                  <span>Accommodation ({form.accommodationScheme === '2nights' ? '2 nights' : '3 nights'})</span>
                  <span>₹{pricing.accommodation.toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-gold/20 mt-2 pt-4 flex justify-between items-center">
                <span className="text-white font-semibold">Total Amount</span>
                <span className="font-serif text-2xl text-gold font-bold">₹{pricing.total.toLocaleString()}</span>
              </div>
            </div>

            {!showTxInput && (
              <Button fullWidth size="lg" onClick={() => { window.open(PAYMENT_URL, '_blank'); setShowTxInput(true); }}>
                <CreditCard size={18} className="mr-2" /> Proceed to Payment — ₹{pricing.total.toLocaleString()}
              </Button>
            )}

            {showTxInput && (
              <div className="mt-6 space-y-4">
                <p className="text-muted text-sm">After completing payment, paste your Transaction ID below:</p>
                <div>
                  <label className={labelCls}>Transaction ID *</label>
                  <input className={inputCls} placeholder="Paste your payment reference ID" value={form.transactionId} onChange={(e) => set('transactionId', e.target.value)} />
                </div>
                <Button fullWidth size="lg" disabled={isSubmitting || form.transactionId.trim().length < 3} onClick={handleSubmit}>
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
                <p className="text-muted text-xs text-center">
                  Return here after payment on the Acharya ERP portal and paste your Transaction ID above.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
            className="glass-card p-10 text-center"
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="flex justify-center mb-6">
              <CheckCircle size={80} className="text-gold" />
            </motion.div>
            <h2 className="font-serif text-4xl text-white mb-2">Registration Submitted!</h2>
            <p className="text-muted mb-6">Your registration has been received.</p>
            <div className="bg-navy/60 border border-gold/30 rounded-lg px-6 py-3 inline-block mb-8">
              <span className="text-muted text-sm">Registration ID: </span>
              <span className="text-gold font-mono">{registrationId}</span>
            </div>
            <div className="bg-navy/60 rounded-xl p-6 text-left mb-8 border border-navy-mid">
              <h3 className="text-gold text-sm uppercase tracking-widest mb-4">Your Details</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-muted">Name</div><div className="text-white">{form.fullName}</div>
                <div className="text-muted">Institution</div><div className="text-white">{form.institution}</div>
                <div className="text-muted">Email</div><div className="text-white">{form.email}</div>
                <div className="text-muted">Phone</div><div className="text-white">{form.phone}</div>
                <div className="text-muted">Committee 1</div><div className="text-white">{form.committeePreference1 || '—'}</div>
                <div className="text-muted">Accommodation</div><div className="text-white">{form.accommodationRequired ? form.accommodationScheme : 'Not required'}</div>
                <div className="text-muted">Total Paid</div><div className="text-gold font-bold">₹{pricing.total.toLocaleString()}</div>
              </div>
            </div>
            <a href="/" className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-all">
              Return to Home
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation buttons */}
      {step < 4 && (
        <div className={`flex mt-6 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
          {step > 0 && (
            <Button variant="ghost" onClick={prev}>
              <ChevronLeft size={18} className="mr-1" /> Back
            </Button>
          )}
          {step < 3 && (
            <Button onClick={next}>
              Next <ChevronRight size={18} className="ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default IndividualForm;
