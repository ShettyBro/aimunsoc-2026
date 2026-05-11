import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import PageHero from '../components/ui/PageHero';
import api from '../utils/api';

type AdminTab = 'individual' | 'delegation';

const Admin: React.FC = () => {
  const [tab, setTab] = useState<AdminTab>('individual');
  const [data, setData] = useState<{ individual: any[]; delegation: any[] }>({ individual: [], delegation: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/admin/registrations')
      .then((res) => setData(res.data))
      .catch(() => setError('Failed to load registrations.'))
      .finally(() => setLoading(false));
  }, []);

  const thCls = 'text-left text-gold text-xs uppercase tracking-widest font-sans py-3 px-4 whitespace-nowrap border-b border-gold/20';
  const tdCls = 'text-white/80 text-sm py-3 px-4 border-b border-navy-mid whitespace-nowrap';

  return (
    <div>
      <PageHero title="Admin — Registrations" subtitle="View all AiCon 2026 registrations." />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex gap-3 mb-8">
          {(['individual', 'delegation'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-md text-sm font-sans transition-all capitalize ${tab === t ? 'bg-gold text-navy font-semibold' : 'border border-gold/30 text-gold hover:bg-gold/10'}`}>
              {t} ({data[t].length})
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-muted gap-3">
            <Loader2 size={24} className="animate-spin text-gold" /> Loading registrations...
          </div>
        )}

        {error && <div className="text-danger text-sm py-8 text-center">{error}</div>}

        {!loading && !error && (
          <div className="glass-card overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-navy/60">
                  {tab === 'individual' ? (
                    <>
                      <th className={thCls}>Date</th>
                      <th className={thCls}>Reg ID</th>
                      <th className={thCls}>Name</th>
                      <th className={thCls}>Institution</th>
                      <th className={thCls}>Email</th>
                      <th className={thCls}>Phone</th>
                      <th className={thCls}>Committee 1</th>
                      <th className={thCls}>Accommodation</th>
                      <th className={thCls}>Total ₹</th>
                      <th className={thCls}>TX ID</th>
                      <th className={thCls}>Status</th>
                    </>
                  ) : (
                    <>
                      <th className={thCls}>Date</th>
                      <th className={thCls}>Reg ID</th>
                      <th className={thCls}>Institution</th>
                      <th className={thCls}>Head Delegate</th>
                      <th className={thCls}>Email</th>
                      <th className={thCls}>Delegates</th>
                      <th className={thCls}>Accommodation</th>
                      <th className={thCls}>Total ₹</th>
                      <th className={thCls}>TX ID</th>
                      <th className={thCls}>Status</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {data[tab].length === 0 ? (
                  <tr>
                    <td colSpan={11} className="text-center text-muted py-12 text-sm">No registrations yet.</td>
                  </tr>
                ) : (
                  data[tab].map((row: any) => (
                    <tr key={row.id} className="hover:bg-navy-light/30 transition-colors">
                      {tab === 'individual' ? (
                        <>
                          <td className={tdCls}>{new Date(row.createdAt).toLocaleDateString()}</td>
                          <td className={`${tdCls} font-mono text-gold text-xs`}>{row.registrationId}</td>
                          <td className={tdCls}>{row.fullName}</td>
                          <td className={tdCls}>{row.institution}</td>
                          <td className={tdCls}>{row.email}</td>
                          <td className={tdCls}>{row.phone}</td>
                          <td className={tdCls}>{row.committeePreference1}</td>
                          <td className={tdCls}>{row.accommodationRequired ? row.accommodationScheme : '—'}</td>
                          <td className={`${tdCls} text-gold font-semibold`}>₹{row.totalAmount?.toLocaleString()}</td>
                          <td className={`${tdCls} font-mono text-xs`}>{row.transactionId}</td>
                          <td className={tdCls}><span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded">{row.status}</span></td>
                        </>
                      ) : (
                        <>
                          <td className={tdCls}>{new Date(row.createdAt).toLocaleDateString()}</td>
                          <td className={`${tdCls} font-mono text-gold text-xs`}>{row.registrationId}</td>
                          <td className={tdCls}>{row.institution}</td>
                          <td className={tdCls}>{row.headDelegateName}</td>
                          <td className={tdCls}>{row.headDelegateEmail}</td>
                          <td className={tdCls}>{row.numberOfDelegates}</td>
                          <td className={tdCls}>{row.accommodationRequired ? row.accommodationScheme : '—'}</td>
                          <td className={`${tdCls} text-gold font-semibold`}>₹{row.totalAmount?.toLocaleString()}</td>
                          <td className={`${tdCls} font-mono text-xs`}>{row.transactionId}</td>
                          <td className={tdCls}><span className="bg-gold/20 text-gold text-xs px-2 py-0.5 rounded">{row.status}</span></td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
