import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Loader2, ShieldAlert, Menu } from 'lucide-react';
import api from '../utils/api';
import { getToken, getMsUntilExpiry, clearSession } from '../utils/auth';
import AdminSidebar, { AdminView } from '../components/admin/AdminSidebar';
import DashboardView from '../components/admin/DashboardView';
import RegistrationsView from '../components/admin/RegistrationsView';
import MessagesView from '../components/admin/MessagesView';

interface AdminData {
  individual: any[];
  delegation: any[];
  contacts: any[];
  stats: { totalIndividual: number; totalDelegation: number; totalContacts: number; totalRevenue: number };
}

export default function Admin() {
  const navigate  = useNavigate();
  const alive     = useRef(true);

  const [data,        setData]        = useState<AdminData | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState('');
  const [view,        setView]        = useState<AdminView>('dashboard');
  const [timeLeft,    setTimeLeft]    = useState(getMsUntilExpiry());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── doLogout lives in a ref so it never becomes a stale closure ──────────
  const doLogout = useRef((reason = '') => {
    clearSession();
    navigate('/ad-login', { replace: true, state: { reason } });
  });

  // ── fetchData: plain async — no useCallback, no deps ─────────────────────
  async function fetchData() {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/ad/registrations');
      if (alive.current) {
        setData(res.data);
        setError('');
      }
    } catch (err: any) {
      if (!alive.current) return;
      if (err?.response?.status === 401) {
        doLogout.current(err?.response?.data?.expired ? 'expired' : 'unauthorized');
      } else {
        setError(err?.response?.data?.message || 'Failed to load data. Please refresh.');
      }
    } finally {
      if (alive.current) setLoading(false);
    }
  }

  // ── Mount: auth check + initial fetch + session timer ────────────────────
  useEffect(() => {
    alive.current = true;

    // Immediate auth check
    if (!getToken()) {
      navigate('/ad-login', { replace: true });
      return;
    }
    const remaining = getMsUntilExpiry();
    if (remaining <= 0) {
      doLogout.current('expired');
      return;
    }

    // Initial data load
    fetchData();

    // Session countdown (UI only — updates every minute)
    const tick = setInterval(() => {
      const left = getMsUntilExpiry();
      if (alive.current) setTimeLeft(left);
      if (left <= 0) doLogout.current('expired');
    }, 60_000);

    // Auto-logout when session expires
    const logoutAt = setTimeout(() => doLogout.current('expired'), remaining);

    return () => {
      alive.current = false;
      clearInterval(tick);
      clearTimeout(logoutAt);
    };
  }, []); // ← runs exactly once on mount

  const handleViewChange = (v: AdminView) => {
    setView(v);
    setSidebarOpen(false);
  };

  const VIEW_LABELS: Record<AdminView, string> = {
    dashboard: 'Dashboard',
    registrations: 'Registrations',
    messages: 'Messages',
  };

  return (
    <div className="flex min-h-screen bg-[#080F1C]">

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transition-transform duration-300 ease-in-out
        lg:static lg:translate-x-0 lg:z-auto
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <AdminSidebar
          activeView={view}
          onViewChange={handleViewChange}
          onLogout={() => doLogout.current('manual')}
          onClose={() => setSidebarOpen(false)}
          timeLeft={timeLeft}
          stats={data?.stats}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <div className="sticky top-0 z-30 bg-[#060E1A]/95 backdrop-blur-sm border-b border-gold/10 px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/70 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors shrink-0"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-7 w-auto lg:hidden" />
              <span className="font-serif text-white text-base lg:hidden">{VIEW_LABELS[view]}</span>
              <span className="hidden lg:block font-serif text-white/50 text-sm">AiCon 2026 — Admin</span>
            </div>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-sm border border-white/10 text-white/60 hover:text-gold hover:border-gold/30 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">{loading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">

          {/* Loading bar (visible during any fetch) */}
          {loading && (
            <div className="h-0.5 w-full bg-gold/20">
              <div className="h-full w-full bg-gold animate-pulse" />
            </div>
          )}

          {/* Initial spinner — only before first data arrives */}
          {loading && !data && (
            <div className="flex items-center justify-center py-40 gap-3 text-muted">
              <Loader2 size={22} className="animate-spin text-gold" />
              Loading data...
            </div>
          )}

          {/* Error (only when no data is available) */}
          {!loading && error && !data && (
            <div className="m-4 sm:m-8 flex items-center gap-3 bg-danger/10 border border-danger/20 text-danger rounded-xl px-5 py-4 text-sm">
              <ShieldAlert size={18} className="shrink-0" /> {error}
            </div>
          )}

          {/* Views — always render when data exists */}
          {data && (
            <>
              {view === 'dashboard'     && <DashboardView stats={data.stats} individual={data.individual} delegation={data.delegation} />}
              {view === 'registrations' && <RegistrationsView individual={data.individual} delegation={data.delegation} />}
              {view === 'messages'      && <MessagesView contacts={data.contacts} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
