import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, CreditCard, Users, UserCheck, School, ChevronLeft, ChevronRight } from 'lucide-react';
import StepIndicator from '../ui/StepIndicator';
import Button from '../ui/Button';
import {
  PAYMENT_URL, DELEGATION_TIERS,
  ACCOMMODATION_2_NIGHTS, ACCOMMODATION_3_NIGHTS
} from '../../data/pricing';
import { calcDelegationTotal } from '../../utils/pricing';
import api from '../../utils/api';
import { DelegationFormData } from '../../types';
import {
  validateFullName, validateInstitution,
  validateEmail, validateIndianPhone, validateTransactionId,
} from '../../utils/validators';
import InstitutionInput from '../ui/InstitutionInput';
import { CollegeEntry } from '../../data/colleges';

const STEPS = ['Institution', 'Delegation', 'Accommodation', 'Payment'];

const emptyForm: DelegationFormData = {
  institution: '', city: '', pincode: '',
  headDelegateName: '', headDelegateEmail: '', headDelegatePhone: '',
  numberOfDelegates: '', accommodationRequired: false, accommodationDelegates: '', accommodationScheme: '', transactionId: '',
};

const inputCls = 'w-full bg-navy-light border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors';
const labelCls = 'block text-sm font-sans text-muted mb-1.5';
const errorCls = 'text-danger text-sm mt-1 flex items-center gap-1';
const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
  msg ? <p className={errorCls}><AlertCircle size={13} />{msg}</p> : null;

const DelegationForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<DelegationFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof DelegationFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTxInput, setShowTxInput] = useState(false);
  const [errorBanner, setErrorBanner] = useState('');
  const [registrationId, setRegistrationId] = useState('');
  const [extraColleges, setExtraColleges] = useState<CollegeEntry[]>([]);

  useEffect(() => {
    api.get('/colleges').then(r => setExtraColleges(r.data.colleges ?? [])).catch(() => {});
  }, []);

  const set = (field: keyof DelegationFormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const pricing = calcDelegationTotal(form.numberOfDelegates, form.accommodationRequired, form.accommodationDelegates, form.accommodationScheme as '2nights' | '3nights' | '');

  const validateStep = (): boolean => {
    const errs: typeof errors = {};

    if (step === 0) {
      const instErr = validateInstitution(form.institution);
      if (instErr) errs.institution = instErr;

      const nameErr = validateFullName(form.headDelegateName);
      if (nameErr) errs.headDelegateName = nameErr;

      const emailErr = validateEmail(form.headDelegateEmail);
      if (emailErr) errs.headDelegateEmail = emailErr;

      const phoneErr = validateIndianPhone(form.headDelegatePhone);
      if (phoneErr) errs.headDelegatePhone = phoneErr;
    }

    if (step === 1) {
      if (!form.numberOfDelegates) errs.numberOfDelegates = 'Please select delegate count.';
    }

    if (step === 2) {
      if (form.accommodationRequired && !form.accommodationScheme)
        errs.accommodationScheme = 'Please select an accommodation scheme.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const prev = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    const txErr = validateTransactionId(form.transactionId);
    if (txErr) { setErrors(e => ({ ...e, transactionId: txErr })); return; }
    setIsSubmitting(true);
    setErrorBanner('');
    try {
      const res = await api.post('/register/delegation', {
        institution: form.institution, city: form.city,
        headDelegateName: form.headDelegateName,
        headDelegateEmail: form.headDelegateEmail,
        headDelegatePhone: form.headDelegatePhone,
        numberOfDelegates: form.numberOfDelegates,
        accommodationRequired: form.accommodationRequired,
        accommodationDelegates: form.accommodationDelegates,
        accommodationScheme: form.accommodationScheme,
        transactionId: form.transactionId,
        perHeadPrice: pricing.perHead,
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

  const delegateOptions = [
    { value: '12', label: '12 Delegates' },
    { value: '15', label: '15 Delegates' },
    { value: '20', label: '20 Delegates' },
    { value: '25', label: '25+ Delegates' },
  ];

  if (step === 4) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
        className="glass-card p-10 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', duration: 0.6 }} className="flex justify-center mb-6">
          <CheckCircle size={80} className="text-gold" />
        </motion.div>
        <h2 className="font-serif text-4xl text-white mb-2">Delegation Registered!</h2>
        <p className="text-muted mb-6">Your delegation registration has been received.</p>
        <div className="bg-navy/60 border border-gold/30 rounded-lg px-6 py-3 inline-block mb-8">
          <span className="text-muted text-sm">Registration ID: </span>
          <span className="text-gold font-mono">{registrationId}</span>
        </div>
        <div className="bg-navy/60 rounded-xl p-6 text-left mb-8 border border-navy-mid">
          <h3 className="text-gold text-sm uppercase tracking-widest mb-4">Delegation Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="text-muted">Institution</div><div className="text-white">{form.institution}</div>
            <div className="text-muted">Head Delegate</div><div className="text-white">{form.headDelegateName}</div>
            <div className="text-muted">Delegates</div><div className="text-white">{form.numberOfDelegates}</div>
            <div className="text-muted">Per Head</div><div className="text-white">₹{pricing.perHead.toLocaleString()}</div>
            <div className="text-muted">Total Paid</div><div className="text-gold font-bold">₹{pricing.total.toLocaleString()}</div>
          </div>
        </div>
        <a href="/" className="border border-gold text-gold px-8 py-3 rounded-md hover:bg-gold/10 transition-all">
          Return to Home
        </a>
      </motion.div>
    );
  }

  return (
    <div>
      <StepIndicator steps={STEPS} currentStep={step} />

      {errorBanner && (
        <div className="mb-6 bg-danger/10 border border-danger/30 rounded-lg px-4 py-3 text-danger text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {errorBanner}
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8">
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><Users size={22} className="text-gold" /> Institution Details</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <InstitutionInput
                institution={form.institution} city={form.city} pincode={form.pincode}
                onInstitutionChange={v => set('institution', v)}
                onCityChange={v => set('city', v)}
                onPincodeChange={v => set('pincode', v)}
                errors={{ institution: errors.institution, city: errors.city, pincode: errors.pincode }}
                extraColleges={extraColleges}
              />
              <div>
                <label className={labelCls}>Head Delegate Name * <span className="text-gold text-xs">(first &amp; last name)</span></label>
                <input className={`${inputCls} ${errors.headDelegateName ? 'border-danger' : ''}`} placeholder="Full name" value={form.headDelegateName} onChange={(e) => set('headDelegateName', e.target.value)} />
                <FieldError msg={errors.headDelegateName} />
              </div>
              <div>
                <label className={labelCls}>Head Delegate Email *</label>
                <input type="email" className={`${inputCls} ${errors.headDelegateEmail ? 'border-danger' : ''}`} placeholder="email@example.com" value={form.headDelegateEmail} onChange={(e) => set('headDelegateEmail', e.target.value)} />
                <FieldError msg={errors.headDelegateEmail} />
              </div>
              <div>
                <label className={labelCls}>Head Delegate Phone * <span className="text-gold text-xs">(Indian 10-digit)</span></label>
                <input type="tel" maxLength={13} className={`${inputCls} ${errors.headDelegatePhone ? 'border-danger' : ''}`} placeholder="9XXXXXXXXX" value={form.headDelegatePhone} onChange={(e) => set('headDelegatePhone', e.target.value)} />
                <FieldError msg={errors.headDelegatePhone} />
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8">
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><UserCheck size={22} className="text-gold" /> Delegation Size</h2>
            <div className="mb-6">
              <label className={labelCls}>Number of Delegates *</label>
              <select className={`${inputCls} ${errors.numberOfDelegates ? 'border-danger' : ''}`} value={form.numberOfDelegates} onChange={(e) => set('numberOfDelegates', e.target.value)}>
                <option value="">Select delegate count</option>
                {delegateOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <FieldError msg={errors.numberOfDelegates} />
            </div>
            {form.numberOfDelegates && (
              <div className="bg-navy/60 rounded-xl border border-gold/20 p-5">
                <p className="text-gold text-xs uppercase tracking-widest font-sans mb-3">Live Pricing</p>
                <div className="flex justify-between text-muted text-sm mb-2">
                  <span>Per delegate</span><span className="text-white">₹{pricing.perHead.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted text-sm mb-3">
                  <span>Registration total ({form.numberOfDelegates} × ₹{pricing.perHead})</span>
                  <span className="text-white">₹{pricing.registrationTotal.toLocaleString()}</span>
                </div>
                <p className="text-gold text-xs">{pricing.tierLabel}</p>
              </div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8">
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><School size={22} className="text-gold" /> Accommodation</h2>
            <label className="flex items-center gap-3 cursor-pointer mb-6">
              <input type="checkbox" className="w-5 h-5 accent-yellow-500" checked={form.accommodationRequired}
                onChange={(e) => { set('accommodationRequired', e.target.checked); if (!e.target.checked) { set('accommodationDelegates', ''); set('accommodationScheme', ''); } }} />
              <span className="text-white">Delegation requires accommodation</span>
            </label>
            {form.accommodationRequired && (
              <div className="space-y-4 ml-8">
                <div>
                  <label className={labelCls}>Number of delegates needing accommodation</label>
                  <input type="number" className={inputCls} placeholder="e.g. 8" value={form.accommodationDelegates} onChange={(e) => set('accommodationDelegates', e.target.value)} min="1" />
                </div>
                <div className="space-y-3">
                  {([['2nights', `2 Nights / 3 Days (+₹${ACCOMMODATION_2_NIGHTS}/head)`], ['3nights', `3 Nights / 3 Days (+₹${ACCOMMODATION_3_NIGHTS}/head)`]] as const).map(([val, lbl]) => (
                    <label key={val} className="flex items-center gap-3 cursor-pointer">
                      <input type="radio" name="delAccScheme" className="accent-yellow-500" value={val} checked={form.accommodationScheme === val} onChange={() => set('accommodationScheme', val)} />
                      <span className="text-white">{lbl}</span>
                    </label>
                  ))}
                  <FieldError msg={errors.accommodationScheme} />
                </div>
                {form.accommodationDelegates && form.accommodationScheme && (
                  <div className="bg-navy/60 rounded-lg p-4 border border-gold/20 text-sm">
                    <div className="flex justify-between text-muted mb-1">
                      <span>Accommodation subtotal</span>
                      <span className="text-white">₹{pricing.accommodationTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
            className="glass-card p-8">
            <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-2"><CreditCard size={22} className="text-gold" /> Payment & Submit</h2>
            <div className="bg-navy/60 rounded-xl p-6 mb-6 border border-gold/20">
              <div className="flex justify-between text-muted text-sm py-2">
                <span>Registration ({form.numberOfDelegates} × ₹{pricing.perHead})</span>
                <span>₹{pricing.registrationTotal.toLocaleString()}</span>
              </div>
              {form.accommodationRequired && pricing.accommodationTotal > 0 && (
                <div className="flex justify-between text-muted text-sm py-2">
                  <span>Accommodation ({form.accommodationDelegates} × ₹{form.accommodationScheme === '2nights' ? ACCOMMODATION_2_NIGHTS : ACCOMMODATION_3_NIGHTS})</span>
                  <span>₹{pricing.accommodationTotal.toLocaleString()}</span>
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
                <p className="text-muted text-sm">After completing payment, paste your Transaction ID:</p>
                <div>
                  <label className={labelCls}>Transaction ID *</label>
                  <input className={`${inputCls} ${errors.transactionId ? 'border-danger' : ''}`} placeholder="Paste transaction reference" value={form.transactionId} onChange={(e) => set('transactionId', e.target.value)} />
                  <FieldError msg={errors.transactionId} />
                </div>
                <Button fullWidth size="lg" disabled={isSubmitting || !form.transactionId.trim()} onClick={handleSubmit}>
                  {isSubmitting ? 'Submitting...' : 'Submit Delegation Registration'}
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {step < 4 && (
        <div className={`flex mt-6 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
          {step > 0 && <Button variant="ghost" onClick={prev}><ChevronLeft size={18} className="mr-1" /> Back</Button>}
          {step < 3 && <Button onClick={next}>Next <ChevronRight size={18} className="ml-1" /></Button>}
        </div>
      )}
    </div>
  );
};

export default DelegationForm;
