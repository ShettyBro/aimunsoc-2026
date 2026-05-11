import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LogOut, Users, Building2, Mail, IndianRupee,
  RefreshCw, Loader2, Clock, ShieldAlert, MessageSquare,
} from 'lucide-react';
import api from '../utils/api';
import { getToken, getUsername, getMsUntilExpiry, clearSession, authHeader } from '../utils/auth';

type AdminTab = 'individual' | 'delegation' | 'contacts';

interface Stats {
  totalIndividual: number;
  totalDelegation: number;
  totalContacts: number;
  totalRevenue: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });
}

function msToHM(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

// ── Component ─────────────────────────────────────────────────────────────────
const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<AdminTab>('individual');
  const [data, setData] = useState<{ individual: any[]; delegation: any[]; contacts: any[]; stats: Stats } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(getMsUntilExpiry());
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const logout = useCallback((reason = '') => {
    clearSession();
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (tickTimer.current) clearInterval(tickTimer.current);
    navigate('/admin/login', { replace: true, state: { reason } });
  }, [navigate]);

  // ── Auth guard + auto-logout ───────────────────────────────────────────────
  useEffect(() => {
    if (!getToken()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    const remaining = getMsUntilExpiry();
    if (remaining <= 0) { logout('expired'); return; }

    // Auto-logout when token expires
    logoutTimer.current = setTimeout(() => logout('expired'), remaining);

    // Countdown tick every minute
    tickTimer.current = setInterval(() => {
      const left = getMsUntilExpiry();
      setTimeLeft(left);
      if (left <= 0) logout('expired');
    }, 60_000);
    setTimeLeft(remaining);

    return () => {
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
      if (tickTimer.current) clearInterval(tickTimer.current);
    };
  }, [logout, navigate]);

  // ── Fetch data ─────────────────────────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/admin/registrations', { headers: authHeader() });
      setData(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) {
        logout(err?.response?.data?.expired ? 'expired' : 'unauthorized');
      } else {
        setError('Failed to load data. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => { fetchData(); }, [fetchData]);

  // ── Table styles ──────────────────────────────────────────────────────────
  const thCls = 'text-left text-gold text-xs uppercase tracking-widest py-3 px-4 whitespace-nowrap border-b border-gold/20 font-sans';
  const tdCls = 'text-white/80 text-sm py-3 px-4 border-b border-navy-mid';

  const stats = data?.stats;

  return (
    <div className="min-h-screen bg-navy">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 bg-navy/95 backdrop-blur border-b border-gold/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-8 w-auto" />
          <div>
            <p className="font-serif text-lg text-white leading-none">Admin Dashboard</p>
            <p className="text-muted text-xs">AiCon 2026</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Session timer */}
          <div className="hidden sm:flex items-center gap-1.5 text-muted text-xs bg-navy-light border border-gold/20 rounded-md px-3 py-1.5">
            <Clock size={12} className="text-gold" />
            <span>Session: <span className="text-gold">{msToHM(timeLeft)}</span> remaining</span>
          </div>

          <span className="text-muted text-sm hidden sm:block">
            👤 <span className="text-white">{getUsername()}</span>
          </span>

          <button
            onClick={() => logout('manual')}
            className="flex items-center gap-2 border border-gold/30 text-gold px-3 py-1.5 rounded-md hover:bg-gold/10 transition-all text-sm"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Stats cards ─────────────────────────────────────────── */}
        {stats && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Individual Regs', value: stats.totalIndividual, icon: Users, color: 'text-gold' },
              { label: 'Delegations', value: stats.totalDelegation, icon: Building2, color: 'text-teal' },
              { label: 'Contact Messages', value: stats.totalContacts, icon: MessageSquare, color: 'text-muted' },
              { label: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-gold' },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="glass-card p-5 flex items-center gap-4"
              >
                <div className="bg-gold/10 w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
                  <s.icon className={s.color} size={20} />
                </div>
                <div>
                  <p className={`font-serif text-2xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-muted text-xs">{s.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ── Tab switcher + refresh ───────────────────────────────── */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex gap-2 flex-wrap">
            {([
              { key: 'individual', label: `Individual (${data?.individual.length ?? 0})`, icon: Users },
              { key: 'delegation', label: `Delegations (${data?.delegation.length ?? 0})`, icon: Building2 },
              { key: 'contacts', label: `Messages (${data?.contacts.length ?? 0})`, icon: MessageSquare },
            ] as const).map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => setTab(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-sans transition-all ${
                  tab === key ? 'bg-gold text-navy font-semibold' : 'border border-gold/30 text-gold hover:bg-gold/10'
                }`}>
                <Icon size={14} /> {label}
              </button>
            ))}
          </div>

          <button onClick={fetchData} disabled={loading}
            className="flex items-center gap-2 border border-gold/30 text-gold px-4 py-2 rounded-md hover:bg-gold/10 transition-all text-sm disabled:opacity-50">
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
          </button>
        </div>

        {/* ── Error ────────────────────────────────────────────────── */}
        {error && (
          <div className="flex items-center gap-2 bg-danger/10 border border-danger/30 text-danger rounded-lg px-4 py-3 text-sm mb-6">
            <ShieldAlert size={16} /> {error}
          </div>
        )}

        {/* ── Loading ──────────────────────────────────────────────── */}
        {loading && (
          <div className="flex items-center justify-center py-20 text-muted gap-3">
            <Loader2 size={22} className="animate-spin text-gold" /> Loading data...
          </div>
        )}

        {/* ── Tables ───────────────────────────────────────────────── */}
        {!loading && !error && data && (
          <div className="glass-card overflow-x-auto">
            {/* Individual */}
            {tab === 'individual' && (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-navy/60">
                    <th className={thCls}>Date</th>
                    <th className={thCls}>Reg ID</th>
                    <th className={thCls}>Name</th>
                    <th className={thCls}>Institution</th>
                    <th className={thCls}>Email</th>
                    <th className={thCls}>Phone</th>
                    <th className={thCls}>Committee 1</th>
                    <th className={thCls}>Portfolio 1</th>
                    <th className={thCls}>Accommodation</th>
                    <th className={thCls}>Total ₹</th>
                    <th className={thCls}>TX ID</th>
                    <th className={thCls}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.individual.length === 0 ? (
                    <tr><td colSpan={12} className="text-center text-muted py-12 text-sm">No individual registrations yet.</td></tr>
                  ) : data.individual.map((r) => (
                    <tr key={r.id} className="hover:bg-navy-light/30 transition-colors">
                      <td className={tdCls + ' whitespace-nowrap text-xs text-muted'}>{formatDate(r.createdAt)}</td>
                      <td className={tdCls + ' font-mono text-gold text-xs whitespace-nowrap'}>{r.registrationId}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>{r.fullName}</td>
                      <td className={tdCls}>{r.institution}</td>
                      <td className={tdCls + ' text-xs'}>{r.email}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>{r.phone}</td>
                      <td className={tdCls}>{r.committeePreference1}</td>
                      <td className={tdCls}>{r.portfolioPreference1}</td>
                      <td className={tdCls}>{r.accommodationRequired ? (r.accommodationScheme || 'Yes') : '—'}</td>
                      <td className={tdCls + ' text-gold font-semibold whitespace-nowrap'}>₹{r.totalAmount?.toLocaleString()}</td>
                      <td className={tdCls + ' font-mono text-xs max-w-[120px] truncate'}>{r.transactionId}</td>
                      <td className={tdCls}><span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Delegation */}
            {tab === 'delegation' && (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-navy/60">
                    <th className={thCls}>Date</th>
                    <th className={thCls}>Reg ID</th>
                    <th className={thCls}>Institution</th>
                    <th className={thCls}>City</th>
                    <th className={thCls}>Head Delegate</th>
                    <th className={thCls}>Email</th>
                    <th className={thCls}>Phone</th>
                    <th className={thCls}>Delegates</th>
                    <th className={thCls}>Per Head ₹</th>
                    <th className={thCls}>Accommodation</th>
                    <th className={thCls}>Total ₹</th>
                    <th className={thCls}>TX ID</th>
                    <th className={thCls}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.delegation.length === 0 ? (
                    <tr><td colSpan={13} className="text-center text-muted py-12 text-sm">No delegation registrations yet.</td></tr>
                  ) : data.delegation.map((r) => (
                    <tr key={r.id} className="hover:bg-navy-light/30 transition-colors">
                      <td className={tdCls + ' whitespace-nowrap text-xs text-muted'}>{formatDate(r.createdAt)}</td>
                      <td className={tdCls + ' font-mono text-gold text-xs whitespace-nowrap'}>{r.registrationId}</td>
                      <td className={tdCls}>{r.institution}</td>
                      <td className={tdCls}>{r.city || '—'}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>{r.headDelegateName}</td>
                      <td className={tdCls + ' text-xs'}>{r.headDelegateEmail}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>{r.headDelegatePhone}</td>
                      <td className={tdCls + ' text-center'}>{r.numberOfDelegates}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>₹{r.perHeadPrice?.toLocaleString()}</td>
                      <td className={tdCls}>{r.accommodationRequired ? (r.accommodationScheme || 'Yes') : '—'}</td>
                      <td className={tdCls + ' text-gold font-semibold whitespace-nowrap'}>₹{r.totalAmount?.toLocaleString()}</td>
                      <td className={tdCls + ' font-mono text-xs max-w-[120px] truncate'}>{r.transactionId}</td>
                      <td className={tdCls}><span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded-full">{r.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {/* Contacts */}
            {tab === 'contacts' && (
              <table className="min-w-full">
                <thead>
                  <tr className="bg-navy/60">
                    <th className={thCls}>Date</th>
                    <th className={thCls}>Name</th>
                    <th className={thCls}>Email</th>
                    <th className={thCls}>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {data.contacts.length === 0 ? (
                    <tr><td colSpan={4} className="text-center text-muted py-12 text-sm">No messages yet.</td></tr>
                  ) : data.contacts.map((r) => (
                    <tr key={r.id} className="hover:bg-navy-light/30 transition-colors">
                      <td className={tdCls + ' whitespace-nowrap text-xs text-muted'}>{formatDate(r.createdAt)}</td>
                      <td className={tdCls + ' whitespace-nowrap'}>{r.name}</td>
                      <td className={tdCls + ' text-xs'}>{r.email}</td>
                      <td className={tdCls + ' max-w-xs'}><p className="truncate text-muted">{r.message}</p></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
