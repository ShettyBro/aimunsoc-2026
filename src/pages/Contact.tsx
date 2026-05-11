import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';

const Contact: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('submitting');
    setErrorMsg('');

    try {
      await api.post('/contact', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const inputCls =
    'w-full bg-navy-light border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder:text-muted/60';
  const labelCls = 'block text-sm font-sans text-muted mb-1.5';

  return (
    <div>
      <PageHero title="Contact Us" subtitle="Get in touch with the AIMUNSOC team." />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-10">

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6">Contact Information</h2>
            <div className="space-y-6">
              <a
                href="mailto:aitmunsoc@acharya.ac.in"
                className="flex items-start gap-4 group"
              >
                <div className="bg-gold/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Mail className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white group-hover:text-gold transition-colors text-sm">
                    aitmunsoc@acharya.ac.in
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="bg-gold/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-widest mb-1">Address</p>
                  <p className="text-white text-sm leading-relaxed">
                    Acharya Institute of Technology<br />
                    Soldevanahalli, Hesaraghatta Main Road<br />
                    Bengaluru – 560107, Karnataka
                  </p>
                </div>
              </div>

              <a
                href="https://instagram.com/aimunsoc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 group"
              >
                <div className="bg-gold/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-gold/20 transition-colors">
                  <Instagram className="text-gold" size={18} />
                </div>
                <div>
                  <p className="text-muted text-xs uppercase tracking-widest mb-1">Instagram</p>
                  <p className="text-white group-hover:text-gold transition-colors text-sm">
                    @aimunsoc
                  </p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8"
          >
            <h2 className="font-serif text-2xl text-white mb-6">Send a Message</h2>

            {status === 'success' && (
              <div className="mb-5 flex items-center gap-2 bg-green-900/30 border border-green-500/30 text-green-400 rounded-lg px-4 py-3 text-sm">
                <CheckCircle size={16} className="shrink-0" />
                Message sent! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-5 flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
                <AlertCircle size={16} className="shrink-0" /> {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input
                  className={inputCls}
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input
                  type="email"
                  className={inputCls}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Message *</label>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={5}
                  placeholder="Your message..."
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gold text-navy font-semibold px-6 py-3 rounded-md hover:bg-gold-light transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {status === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
