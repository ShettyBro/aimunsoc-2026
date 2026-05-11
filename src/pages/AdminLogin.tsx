import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, AlertCircle, Shield } from 'lucide-react';
import api from '../utils/api';
import { saveSession } from '../utils/auth';
import GlobalBackground from '../components/layout/GlobalBackground';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
      const msg = err?.response?.data?.message || 'Login failed. Check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    'w-full bg-navy border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors placeholder-muted';

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4">
      <GlobalBackground />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="bg-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-gold/30">
            <Shield className="text-gold" size={28} />
          </div>
          <h1 className="font-serif text-4xl text-white mb-2">Admin Access</h1>
          <p className="text-muted text-sm">AIMUNSOC AiCon 2026 — Restricted Area</p>
        </div>

        <div className="glass-card p-8">
          {error && (
            <div className="mb-5 flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm">
              <AlertCircle size={15} className="shrink-0" /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-sm text-muted mb-1.5 font-sans">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id="admin-username"
                  className={`${inputCls} pl-10`}
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password with show/hide */}
            <div>
              <label className="block text-sm text-muted mb-1.5 font-sans">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${inputCls} pl-10 pr-11`}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-gold transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
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
