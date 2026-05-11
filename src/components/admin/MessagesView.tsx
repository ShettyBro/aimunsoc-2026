import React, { useState } from 'react';
import { MessageSquare, Search, Mail } from 'lucide-react';

interface Props {
  contacts: any[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

const MessagesView: React.FC<Props> = ({ contacts }) => {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = contacts.filter(c =>
    !search || [c.name, c.email, c.message].some(v =>
      v?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-3xl text-white mb-1">Messages</h1>
          <p className="text-muted text-sm">{contacts.length} contact form submission{contacts.length !== 1 ? 's' : ''}</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="bg-[#0A1628] border border-white/10 text-white text-sm rounded-lg pl-9 pr-4 py-2.5 focus:outline-none focus:border-gold/50 w-64 placeholder:text-muted/50"
            placeholder="Search name, email, message..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-[#0A1628] border border-white/5 rounded-xl flex flex-col items-center justify-center py-24">
          <MessageSquare size={40} className="text-muted mb-4" />
          <p className="text-muted text-sm">{search ? 'No messages match your search.' : 'No messages yet.'}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(c => (
            <div
              key={c.id}
              className="bg-[#0A1628] border border-white/5 rounded-xl p-5 hover:border-gold/20 transition-colors cursor-pointer"
              onClick={() => setExpanded(expanded === c.id ? null : c.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0 font-serif text-gold font-bold text-sm">
                    {c.name?.charAt(0)?.toUpperCase() ?? '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-medium">{c.name}</p>
                    <a
                      href={`mailto:${c.email}`}
                      className="flex items-center gap-1 text-gold/70 text-xs hover:text-gold transition-colors"
                      onClick={e => e.stopPropagation()}
                    >
                      <Mail size={10} /> {c.email}
                    </a>
                  </div>
                </div>
                <p className="text-muted text-xs shrink-0">{formatDate(c.createdAt)}</p>
              </div>

              {/* Message preview / expanded */}
              <div className="mt-3 pl-13 ml-[52px]">
                <p className={`text-white/70 text-sm leading-relaxed ${expanded === c.id ? '' : 'line-clamp-2'}`}>
                  {c.message}
                </p>
                {c.message?.length > 120 && (
                  <button className="text-gold text-xs mt-1 hover:underline">
                    {expanded === c.id ? 'Show less' : 'Read more'}
                  </button>
                )}
              </div>

              {expanded === c.id && (
                <div className="mt-4 ml-[52px] pt-4 border-t border-white/5">
                  <a
                    href={`mailto:${c.email}?subject=Re: Your message to AIMUNSOC`}
                    className="inline-flex items-center gap-2 text-sm bg-gold text-navy font-semibold px-4 py-2 rounded-lg hover:bg-gold-light transition-all"
                    onClick={e => e.stopPropagation()}
                  >
                    <Mail size={14} /> Reply via Email
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesView;
