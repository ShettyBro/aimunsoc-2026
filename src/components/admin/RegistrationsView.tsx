import React, { useState } from 'react';
import { Search, FileSpreadsheet, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Props {
  individual: any[];
  delegation: any[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const thCls = 'text-left text-[10px] uppercase tracking-widest text-gold/70 py-3 px-4 border-b border-white/5 font-sans whitespace-nowrap';
const tdCls = 'py-3 px-4 text-sm border-b border-white/[0.04] whitespace-nowrap';

const StatusBadge: React.FC<{ status: string }> = ({ status }) => (
  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-sans uppercase tracking-wider ${
    status === 'confirmed'
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      : 'bg-gold/10 text-gold border-gold/20'
  }`}>{status || 'pending'}</span>
);

// ── Excel export ─────────────────────────────────────────────────────────────
function exportExcel(individual: any[], delegation: any[]) {
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Individual Registrations ────────────────────────
  const indvRows = individual.map((r) => ({
    'Registration ID':        r.registrationId,
    'Date':                   new Date(r.createdAt).toLocaleString('en-IN'),
    'Full Name':              r.fullName,
    'Age':                    r.age,
    'Institution / College':  r.institution,
    'Email':                  r.email,
    'Phone':                  r.phone,
    'Committee Preference 1': r.committeePreference1,
    'Portfolio Preference 1': r.portfolioPreference1,
    'Committee Preference 2': r.committeePreference2 || '',
    'Portfolio Preference 2': r.portfolioPreference2 || '',
    'Committee Preference 3': r.committeePreference3 || '',
    'Portfolio Preference 3': r.portfolioPreference3 || '',
    'Accommodation Required': r.accommodationRequired ? 'Yes' : 'No',
    'Accommodation Scheme':   r.accommodationScheme || '—',
    'Total Amount (₹)':       r.totalAmount,
    'Transaction ID':         r.transactionId,
    'Payment Status':         r.status,
  }));

  const wsIndv = XLSX.utils.json_to_sheet(indvRows);
  // Column widths
  wsIndv['!cols'] = [
    { wch: 20 }, { wch: 20 }, { wch: 22 }, { wch: 5 },
    { wch: 30 }, { wch: 28 }, { wch: 14 },
    { wch: 22 }, { wch: 25 }, { wch: 22 }, { wch: 25 },
    { wch: 22 }, { wch: 25 }, { wch: 22 }, { wch: 20 },
    { wch: 16 }, { wch: 36 }, { wch: 12 },
  ];
  XLSX.utils.book_append_sheet(wb, wsIndv, 'Individual Registrations');

  // ── Sheet 2: Delegation Registrations ────────────────────────
  const delgRows = delegation.map((r) => ({
    'Registration ID':        r.registrationId,
    'Date':                   new Date(r.createdAt).toLocaleString('en-IN'),
    'Institution / College':  r.institution,
    'City':                   r.city || '',
    'Head Delegate Name':     r.headDelegateName,
    'Head Delegate Email':    r.headDelegateEmail,
    'Head Delegate Phone':    r.headDelegatePhone,
    'Number of Delegates':    r.numberOfDelegates,
    'Accommodation Required': r.accommodationRequired ? 'Yes' : 'No',
    'Accommodation Delegates':r.accommodationDelegates || '—',
    'Accommodation Scheme':   r.accommodationScheme || '—',
    'Per Head Price (₹)':     r.perHeadPrice,
    'Total Amount (₹)':       r.totalAmount,
    'Transaction ID':         r.transactionId,
    'Payment Status':         r.status,
  }));

  const wsDelg = XLSX.utils.json_to_sheet(delgRows);
  wsDelg['!cols'] = [
    { wch: 20 }, { wch: 20 }, { wch: 30 }, { wch: 16 },
    { wch: 22 }, { wch: 28 }, { wch: 14 }, { wch: 8 },
    { wch: 22 }, { wch: 24 }, { wch: 20 },
    { wch: 16 }, { wch: 16 }, { wch: 36 }, { wch: 12 },
  ];
  XLSX.utils.book_append_sheet(wb, wsDelg, 'Delegation Registrations');

  // ── Sheet 3: Summary ─────────────────────────────────────────
  const indvRevenue = individual.reduce((s, r) => s + (r.totalAmount || 0), 0);
  const delgRevenue = delegation.reduce((s, r) => s + (r.totalAmount || 0), 0);
  const summaryRows = [
    { 'Metric': 'Individual Registrations', 'Count': individual.length, 'Revenue (₹)': indvRevenue },
    { 'Metric': 'Delegation Registrations', 'Count': delegation.length, 'Revenue (₹)': delgRevenue },
    { 'Metric': 'TOTAL', 'Count': individual.length + delegation.length, 'Revenue (₹)': indvRevenue + delgRevenue },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  wsSummary['!cols'] = [{ wch: 28 }, { wch: 10 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  // Download
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `AiCon-2026-Registrations-${dateStr}.xlsx`);
}

// ─────────────────────────────────────────────────────────────────────────────
const RegistrationsView: React.FC<Props> = ({ individual, delegation }) => {
  const [tab, setTab] = useState<'individual' | 'delegation'>('individual');
  const [search, setSearch] = useState('');

  const filteredIndividual = individual.filter(r =>
    !search || [r.fullName, r.institution, r.email, r.transactionId, r.phone]
      .some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredDelegation = delegation.filter(r =>
    !search || [r.institution, r.headDelegateName, r.headDelegateEmail, r.transactionId]
      .some(v => v?.toLowerCase().includes(search.toLowerCase()))
  );

  const exportCSV = () => {
    const rows = tab === 'individual' ? filteredIndividual : filteredDelegation;
    if (!rows.length) return;
    const keys = Object.keys(rows[0]).filter(k => k !== 'id');
    const csv = [
      keys.join(','),
      ...rows.map(r => keys.map(k => `"${(r[k] ?? '').toString().replace(/"/g, '""')}"`).join(',')),
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `aicon-2026-${tab}-${new Date().toISOString().slice(0,10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-white mb-1">Registrations</h1>
          <p className="text-muted text-sm">All delegate and delegation registrations</p>
        </div>

        {/* Export buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportExcel(individual, delegation)}
            className="flex items-center gap-2 bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 px-4 py-2.5 rounded-lg hover:bg-emerald-600/30 transition-all text-sm font-semibold"
          >
            <FileSpreadsheet size={15} />
            Export Excel (.xlsx)
          </button>
          <button
            onClick={exportCSV}
            className="flex items-center gap-2 border border-white/10 text-white/60 hover:text-gold hover:border-gold/30 px-4 py-2.5 rounded-lg transition-all text-sm"
          >
            <Download size={14} /> CSV
          </button>
        </div>
      </div>

      {/* Tabs + Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div className="flex rounded-lg overflow-hidden border border-white/10">
          {(['individual', 'delegation'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2.5 text-sm font-sans capitalize transition-all ${
                tab === t
                  ? 'bg-gold text-navy font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}>
              {t} ({t === 'individual' ? individual.length : delegation.length})
            </button>
          ))}
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="bg-[#0A1628] border border-white/10 text-white text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold/50 w-64 placeholder:text-muted/50"
            placeholder="Search name, college, TX ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#0A1628] border border-white/5 rounded-xl overflow-x-auto">
        {tab === 'individual' ? (
          <table className="min-w-full">
            <thead>
              <tr className="bg-black/20">
                <th className={thCls}>Date</th>
                <th className={thCls}>Reg ID</th>
                <th className={thCls}>Full Name</th>
                <th className={thCls}>College / Institution</th>
                <th className={thCls}>Phone</th>
                <th className={thCls}>Email</th>
                <th className={thCls}>Committee 1</th>
                <th className={thCls}>Portfolio 1</th>
                <th className={thCls}>Accommodation</th>
                <th className={thCls}>Total ₹</th>
                <th className={thCls}>Transaction ID</th>
                <th className={thCls}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndividual.length === 0 ? (
                <tr><td colSpan={12} className="text-center text-muted py-16 text-sm">No results found.</td></tr>
              ) : filteredIndividual.map(r => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className={`${tdCls} text-muted text-xs`}>{formatDate(r.createdAt)}</td>
                  <td className={`${tdCls} font-mono text-gold text-xs`}>{r.registrationId}</td>
                  <td className={`${tdCls} text-white font-medium`}>{r.fullName}</td>
                  <td className={`${tdCls} text-white/70 max-w-[180px]`}><span className="block truncate">{r.institution}</span></td>
                  <td className={`${tdCls} text-white/70`}>{r.phone}</td>
                  <td className={`${tdCls} text-white/60 text-xs`}>{r.email}</td>
                  <td className={`${tdCls} text-white/70`}>{r.committeePreference1}</td>
                  <td className={`${tdCls} text-white/60 text-xs`}>{r.portfolioPreference1}</td>
                  <td className={tdCls}>
                    {r.accommodationRequired
                      ? <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">{r.accommodationScheme}</span>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td className={`${tdCls} text-gold font-bold`}>₹{(r.totalAmount || 0).toLocaleString('en-IN')}</td>
                  <td className={`${tdCls} font-mono text-xs text-white/50 max-w-[140px]`}>
                    <span className="block truncate" title={r.transactionId}>{r.transactionId}</span>
                  </td>
                  <td className={tdCls}><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full">
            <thead>
              <tr className="bg-black/20">
                <th className={thCls}>Date</th>
                <th className={thCls}>Reg ID</th>
                <th className={thCls}>Institution</th>
                <th className={thCls}>City</th>
                <th className={thCls}>Head Delegate</th>
                <th className={thCls}>Phone</th>
                <th className={thCls}>Email</th>
                <th className={thCls}>Delegates</th>
                <th className={thCls}>Per Head ₹</th>
                <th className={thCls}>Accommodation</th>
                <th className={thCls}>Total ₹</th>
                <th className={thCls}>Transaction ID</th>
                <th className={thCls}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredDelegation.length === 0 ? (
                <tr><td colSpan={13} className="text-center text-muted py-16 text-sm">No results found.</td></tr>
              ) : filteredDelegation.map(r => (
                <tr key={r.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className={`${tdCls} text-muted text-xs`}>{formatDate(r.createdAt)}</td>
                  <td className={`${tdCls} font-mono text-gold text-xs`}>{r.registrationId}</td>
                  <td className={`${tdCls} text-white font-medium max-w-[160px]`}><span className="block truncate">{r.institution}</span></td>
                  <td className={`${tdCls} text-white/60`}>{r.city || '—'}</td>
                  <td className={`${tdCls} text-white/80`}>{r.headDelegateName}</td>
                  <td className={`${tdCls} text-white/70`}>{r.headDelegatePhone}</td>
                  <td className={`${tdCls} text-white/60 text-xs`}>{r.headDelegateEmail}</td>
                  <td className={`${tdCls} text-center text-white/80`}>{r.numberOfDelegates}</td>
                  <td className={`${tdCls} text-white/70`}>₹{(r.perHeadPrice || 0).toLocaleString('en-IN')}</td>
                  <td className={tdCls}>
                    {r.accommodationRequired
                      ? <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded">{r.accommodationScheme}</span>
                      : <span className="text-muted">—</span>}
                  </td>
                  <td className={`${tdCls} text-gold font-bold`}>₹{(r.totalAmount || 0).toLocaleString('en-IN')}</td>
                  <td className={`${tdCls} font-mono text-xs text-white/50 max-w-[140px]`}>
                    <span className="block truncate" title={r.transactionId}>{r.transactionId}</span>
                  </td>
                  <td className={tdCls}><StatusBadge status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer note */}
      <p className="text-muted text-xs mt-3 text-right">
        Excel export contains all registrations regardless of current search filter. CSV exports current view only.
      </p>
    </div>
  );
};

export default RegistrationsView;
