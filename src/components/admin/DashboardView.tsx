import React from 'react';
import { motion } from 'framer-motion';
import { Users, Building2, MessageSquare, IndianRupee, TrendingUp, Clock } from 'lucide-react';

interface Stats {
  totalIndividual: number;
  totalDelegation: number;
  totalContacts: number;
  totalRevenue: number;
}

interface Props {
  stats: Stats;
  individual: any[];
  delegation: any[];
}

const StatCard: React.FC<{ label: string; value: string | number; icon: React.FC<any>; color: string; sub?: string; delay: number }> =
  ({ label, value, icon: Icon, color, sub, delay }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-[#0A1628] border border-white/5 rounded-xl p-5 flex items-start gap-4 hover:border-gold/20 transition-colors"
    >
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-muted text-xs font-sans uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white text-2xl font-serif font-bold">{value}</p>
        {sub && <p className="text-muted text-xs mt-0.5">{sub}</p>}
      </div>
    </motion.div>
  );

function BarStat({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-white/80">{label}</span>
        <span className="text-gold font-semibold">₹{value.toLocaleString('en-IN')}</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
      <p className="text-muted text-xs mt-1">{pct}% of total revenue</p>
    </div>
  );
}

const DashboardView: React.FC<Props> = ({ stats, individual, delegation }) => {
  const indvRevenue = individual.reduce((s, r) => s + (r.totalAmount || 0), 0);
  const delgRevenue = delegation.reduce((s, r) => s + (r.totalAmount || 0), 0);

  // Top colleges
  const collegeCounts: Record<string, number> = {};
  [...individual.map(r => r.institution), ...delegation.map(r => r.institution)].forEach(c => {
    if (c) collegeCounts[c] = (collegeCounts[c] || 0) + 1;
  });
  const topColleges = Object.entries(collegeCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);

  // Recent (last 5 across both)
  const recent = [
    ...individual.map(r => ({ ...r, _type: 'Individual' })),
    ...delegation.map(r => ({ ...r, _type: 'Delegation', fullName: r.headDelegateName })),
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 6);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="font-serif text-3xl text-white mb-1">Dashboard</h1>
        <p className="text-muted text-sm">AiCon 2026 registration overview</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard delay={0} label="Total Registrations" value={stats.totalIndividual + stats.totalDelegation}
          icon={Users} color="bg-gold/15 text-gold"
          sub={`${stats.totalIndividual} individual · ${stats.totalDelegation} delegations`} />
        <StatCard delay={0.05} label="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString('en-IN')}`}
          icon={IndianRupee} color="bg-emerald-500/15 text-emerald-400"
          sub="All payments collected" />
        <StatCard delay={0.1} label="Delegates (Individual)" value={stats.totalIndividual}
          icon={TrendingUp} color="bg-blue-500/15 text-blue-400" />
        <StatCard delay={0.15} label="Contact Messages" value={stats.totalContacts}
          icon={MessageSquare} color="bg-purple-500/15 text-purple-400" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue breakdown */}
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-6">
          <h2 className="font-serif text-lg text-white mb-5">Revenue Breakdown</h2>
          <BarStat label="Individual Registrations" value={indvRevenue} max={stats.totalRevenue} color="bg-gold" />
          <BarStat label="Delegation Registrations" value={delgRevenue} max={stats.totalRevenue} color="bg-emerald-400" />
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-between">
            <span className="text-muted text-sm">Total Collected</span>
            <span className="text-gold font-serif text-xl font-bold">₹{stats.totalRevenue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Top institutions */}
        <div className="bg-[#0A1628] border border-white/5 rounded-xl p-6">
          <h2 className="font-serif text-lg text-white mb-5">Top Institutions</h2>
          {topColleges.length === 0 ? (
            <p className="text-muted text-sm">No registrations yet.</p>
          ) : (
            <div className="space-y-3">
              {topColleges.map(([college, count], i) => (
                <div key={college} className="flex items-center gap-3">
                  <span className="text-gold/60 text-xs font-mono w-4">#{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm truncate">{college}</p>
                  </div>
                  <span className="text-gold text-sm font-semibold bg-gold/10 px-2 py-0.5 rounded-full">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="bg-[#0A1628] border border-white/5 rounded-xl p-6">
        <h2 className="font-serif text-lg text-white mb-5 flex items-center gap-2">
          <Clock size={16} className="text-gold" /> Recent Registrations
        </h2>
        {recent.length === 0 ? (
          <p className="text-muted text-sm">No registrations yet.</p>
        ) : (
          <div className="space-y-3">
            {recent.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${r._type === 'Individual' ? 'bg-gold' : 'bg-emerald-400'}`} />
                  <div className="min-w-0">
                    <p className="text-white text-sm font-sans truncate">{r.fullName || r.headDelegateName}</p>
                    <p className="text-muted text-xs truncate">{r.institution} · {r._type}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <p className="text-gold text-sm font-semibold">₹{(r.totalAmount || 0).toLocaleString('en-IN')}</p>
                  <p className="text-muted text-xs">{new Date(r.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardView;
