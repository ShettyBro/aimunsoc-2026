import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RefreshCw, Loader2, ShieldAlert, Menu, X } from 'lucide-react';
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

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>('dashboard');
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(getMsUntilExpiry());
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const logoutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const logout = useCallback((reason = '') => {
    clearSession();
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (tickTimer.current) clearInterval(tickTimer.current);
    navigate('/admin/login', { replace: true, state: { reason } });
  }, [navigate]);

  // Auth guard + auto-logout
  useEffect(() => {
    if (!getToken()) { navigate('/admin/login', { replace: true }); return; }
    const remaining = getMsUntilExpiry();
    if (remaining <= 0) { logout('expired'); return; }
    logoutTimer.current = setTimeout(() => logout('expired'), remaining);
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

  const fetchData = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await api.get('/admin/registrations');
      setData(res.data);
    } catch (err: any) {
      if (err?.response?.status === 401) logout(err?.response?.data?.expired ? 'expired' : 'unauthorized');
      else setError(err?.response?.data?.message || 'Failed to load data. Please refresh.');
    } finally {
      setLoading(false);
    }
  }, [logout]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="flex min-h-screen bg-[#080F1C]">
      {/* Sidebar — desktop always visible, mobile slide-in */}
      <div className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <AdminSidebar
          activeView={view}
          onViewChange={(v) => { setView(v); setSidebarOpen(false); }}
          onLogout={() => logout('manual')}
          timeLeft={timeLeft}
          stats={data?.stats}
        />
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar — mobile only */}
        <div className="lg:hidden sticky top-0 z-30 bg-[#060E1A] border-b border-gold/10 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="text-white/70 hover:text-white p-1.5 rounded-md hover:bg-white/10 transition-colors">
            <Menu size={20} />
          </button>
          <div className="flex items-center gap-2">
            <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-7 w-auto" />
            <span className="font-serif text-white">Admin</span>
          </div>
          <button
            onClick={fetchData}
            disabled={loading}
            className="text-gold p-1.5 hover:bg-gold/10 rounded-md transition-colors"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>

        {/* Topbar — desktop refresh */}
        <div className="hidden lg:flex items-center justify-end px-8 py-3 border-b border-white/5">
          <button
            onClick={fetchData}
            disabled={loading}
            className="flex items-center gap-2 text-sm border border-white/10 text-white/60 hover:text-gold hover:border-gold/30 px-3 py-1.5 rounded-lg transition-all disabled:opacity-40"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto">
          {loading && !data && (
            <div className="flex items-center justify-center py-40 gap-3 text-muted">
              <Loader2 size={22} className="animate-spin text-gold" /> Loading data from Neon...
            </div>
          )}

          {error && (
            <div className="m-8 flex items-center gap-3 bg-danger/10 border border-danger/20 text-danger rounded-xl px-5 py-4 text-sm">
              <ShieldAlert size={18} className="shrink-0" /> {error}
            </div>
          )}

          {!loading && !error && data && (
            <>
              {view === 'dashboard' && (
                <DashboardView stats={data.stats} individual={data.individual} delegation={data.delegation} />
              )}
              {view === 'registrations' && (
                <RegistrationsView individual={data.individual} delegation={data.delegation} />
              )}
              {view === 'messages' && (
                <MessagesView contacts={data.contacts} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
