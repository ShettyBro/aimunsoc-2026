import React from 'react';
import { LayoutDashboard, Users, MessageSquare, LogOut, Clock, ChevronRight } from 'lucide-react';
import { getUsername, getMsUntilExpiry } from '../../utils/auth';

export type AdminView = 'dashboard' | 'registrations' | 'messages';

const navItems: { id: AdminView; label: string; icon: React.FC<any> }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'registrations', label: 'Registrations', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
];

function msToHM(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  return `${h}h ${m}m`;
}

interface Props {
  activeView: AdminView;
  onViewChange: (v: AdminView) => void;
  onLogout: () => void;
  timeLeft: number;
  stats?: { totalIndividual: number; totalDelegation: number; totalContacts: number };
}

const AdminSidebar: React.FC<Props> = ({ activeView, onViewChange, onLogout, timeLeft, stats }) => {
  return (
    <aside className="w-64 shrink-0 bg-[#060E1A] border-r border-gold/10 flex flex-col min-h-screen">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gold/10 flex items-center gap-3">
        <img src="/aimunsoc-logo-nobg.png" alt="AIMUNSOC" className="h-9 w-auto" />
        <div>
          <p className="font-serif text-white text-lg leading-none">AiCon</p>
          <p className="text-gold text-xs font-sans">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="text-muted text-[10px] uppercase tracking-widest px-3 mb-3 font-sans">Navigation</p>
        {navItems.map(({ id, label, icon: Icon }) => {
          const badge = id === 'registrations'
            ? (stats ? stats.totalIndividual + stats.totalDelegation : null)
            : id === 'messages' ? (stats?.totalContacts ?? null) : null;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-sans transition-all group ${
                activeView === id
                  ? 'bg-gold/15 text-gold border border-gold/20'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon size={17} />
                {label}
              </div>
              <div className="flex items-center gap-2">
                {badge !== null && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeView === id ? 'bg-gold/20 text-gold' : 'bg-white/10 text-white/50'}`}>
                    {badge}
                  </span>
                )}
                {activeView === id && <ChevronRight size={13} className="text-gold" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Bottom: session + logout */}
      <div className="px-4 py-5 border-t border-gold/10 space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted bg-navy/60 rounded-lg px-3 py-2">
          <Clock size={12} className="text-gold shrink-0" />
          <span>Session: <span className="text-gold">{msToHM(timeLeft)}</span> left</span>
        </div>
        <div className="flex items-center justify-between px-1">
          <div>
            <p className="text-white text-sm font-sans">{getUsername()}</p>
            <p className="text-muted text-xs">Administrator</p>
          </div>
          <button
            onClick={onLogout}
            className="text-muted hover:text-danger transition-colors p-1.5 rounded-md hover:bg-danger/10"
            title="Logout"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
