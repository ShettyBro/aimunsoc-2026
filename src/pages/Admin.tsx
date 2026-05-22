import React, { useState, useEffect, useRef, useCallback } from 'react';
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

const VIEW_LABELS: Record<AdminView, string> = {
  dashboard: 'Dashboard',
  registrations: 'Registrations',
  messages: 'Messages',
};

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>('dashboard');
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(getMsUntilExpiry());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ── Stable refs — always hold the latest value without being deps ──────────
  const mountedRef   = useRef(true);
  const navigateRef  = useRef(navigate);
  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  // Keep navigateRef current on every render
  navigateRef.current = navigate;

  // ── Logout — stable, uses refs so it never changes identity ───────────────
  const logout = useCallback((reason = '') => {
    clearSession();
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
    if (tickTimerRef.current)   clearInterval(tickTimerRef.current);
    navigateRef.current('/ad-login', { replace: true, state: { reason } });
  }, []); // no deps — uses refs

  // Keep a ref to logout so fetchData can use it without being a dependency
  const logoutRef = useRef(logout);
  logoutRef.current = logout;

  // ── Auth guard + auto-logout — runs once on mount ─────────────────────────
  useEffect(() => {
    if (!getToken()) { navigate('/ad-login', { replace: true }); return; }
    const remaining = getMsUntilExpiry();
    if (remaining <= 0) { logout('expired'); return; }

    logoutTimerRef.current = setTimeout(() => logout('expired'), remaining);
    tickTimerRef.current = setInterval(() => {
      const left = getMsUntilExpiry();
      setTimeLeft(left);
      if (left <= 0) logout('expired');
    }, 60_000);
    setTimeLeft(remaining);

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
      if (tickTimerRef.current)   clearInterval(tickTimerRef.current);
    };
  }, []); // intentionally empty — runs once; uses refs for stable values

  // ── fetchData — stable identity (no deps), uses logoutRef for logout ───────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/ad/registrations');
      if (mountedRef.current) setData(res.data);
    } catch (err: any) {
      if (!mountedRef.current) return;
      if (err?.response?.status === 401) {
        logoutRef.current(err?.response?.data?.expired ? 'expired' : 'unauthorized');
      } else {
        setError(err?.response?.data?.message || 'Failed to load data. Please refresh.');
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, []); // no deps — uses refs; identity is permanently stable

  // ── Fetch once on mount ────────────────────────────────────────────────────
  useEffect(() => {
    mountedRef.current = true;
    fetchData();
    return () => { mountedRef.current = false; };
  }, []); // intentionally empty — fetchData is stable; we only want this once

  const handleViewChange = (v: AdminView) => {
    setView(v);
    setSidebarOpen(false);
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
          onLogout={() => logout('manual')}
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

        {/* Content area */}
        <div className="flex-1 overflow-auto">

          {/* Thin gold bar during any loading */}
          {loading && (
            <div className="h-0.5 bg-gold/20 w-full">
              <div className="h-full bg-gold animate-pulse w-full" />
            </div>
          )}

          {/* Spinner — first load only (no data yet) */}
          {loading && !data && (
            <div className="flex items-center justify-center py-40 gap-3 text-muted">
              <Loader2 size={22} className="animate-spin text-gold" /> Loading data...
            </div>
          )}

          {/* Error — only when there's no data to show */}
          {error && !data && (
            <div className="m-4 sm:m-8 flex items-center gap-3 bg-danger/10 border border-danger/20 text-danger rounded-xl px-5 py-4 text-sm">
              <ShieldAlert size={18} className="shrink-0" /> {error}
            </div>
          )}

          {/* Views — show whenever data exists, even during background refresh */}
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
};

export default Admin;
