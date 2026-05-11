import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, AlertCircle, Shield } from 'lucide-react';
import api from '../utils/api';
import { saveSession } from '../utils/auth';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await api.post('/admin/login', { username, password });
      const { token, username: user, expiresIn } = res.data;
      saveSession(token, user, expiresIn);
      navigate('/admin', { replace: true });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-navy border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder-muted';

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-4">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] rounded-full opacity-10 blob-1"
          style={{ background: 'radial-gradient(circle, #1A3A5C 0%, transparent 70%)', top: '10%', left: '10%' }} />
        <div className="absolute w-[400px] h-[400px] rounded-full opacity-10 blob-2"
          style={{ background: 'radial-gradient(circle, #112240 0%, transparent 70%)', bottom: '10%', right: '10%' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Shield className="text-gold" size={28} />
          </div>
          <h1 className="font-serif text-4xl text-white mb-2">Admin Access</h1>
          <p className="text-muted text-sm">AIMUNSOC AiCon 2026 — Restricted</p>
        </div>

        {/* Form */}
        <div className="glass-card p-8">
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-muted mb-1.5 font-sans">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-username"
                  className={`${inputCls} pl-10`}
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-muted mb-1.5 font-sans">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  id="admin-password"
                  type="password"
                  className={`${inputCls} pl-10`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-navy font-semibold py-3 rounded-md hover:bg-gold-light transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              <Lock size={16} />
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>

          <p className="text-muted text-xs text-center mt-6">
            Session duration: 6 hours · Auto-logout on expiry
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
