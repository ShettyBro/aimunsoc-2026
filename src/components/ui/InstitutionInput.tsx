import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Building2, Search, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { searchColleges, CollegeEntry } from '../../data/colleges';

interface Props {
  institution: string;
  city: string;
  pincode: string;
  onInstitutionChange: (v: string) => void;
  onCityChange: (v: string) => void;
  onPincodeChange: (v: string) => void;
  errors?: { institution?: string; city?: string; pincode?: string };
  extraColleges?: CollegeEntry[];
}

const inputCls = 'w-full bg-navy-light border border-navy-mid text-white rounded-md px-4 py-3 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors';
const labelCls = 'block text-sm font-sans text-muted mb-1.5';

const FieldError: React.FC<{ msg?: string }> = ({ msg }) =>
  msg ? <p className="text-danger text-sm mt-1 flex items-center gap-1"><AlertCircle size={13} />{msg}</p> : null;

const CITY_MAP: Record<string, string> = { Bangalore: 'Bengaluru', Hubli: 'Hubballi', Mysore: 'Mysuru' };

const InstitutionInput: React.FC<Props> = ({
  institution, city, pincode,
  onInstitutionChange, onCityChange, onPincodeChange,
  errors = {}, extraColleges = [],
}) => {
  const [pincodeStatus, setPincodeStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [suggestions, setSuggestions] = useState<CollegeEntry[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [instInput, setInstInput] = useState(institution);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setShowDropdown(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Sync external institution value
  useEffect(() => { setInstInput(institution); }, [institution]);

  // Auto-fetch city from pincode
  useEffect(() => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      if (pincode.length === 0) setPincodeStatus('idle');
      return;
    }
    setPincodeStatus('loading');
    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      .then(r => r.json())
      .then(data => {
        const po = data?.[0];
        if (po?.Status === 'Success' && po.PostOffice?.length > 0) {
          let dist = po.PostOffice[0].District;
          dist = CITY_MAP[dist] ?? dist; // normalize city names
          onCityChange(dist);
          setPincodeStatus('ok');
        } else {
          setPincodeStatus('error');
        }
      })
      .catch(() => setPincodeStatus('error'));
  }, [pincode]);

  const handleInstInput = (val: string) => {
    setInstInput(val);
    onInstitutionChange(val);
    const results = searchColleges(val, city, extraColleges);
    setSuggestions(results);
    setShowDropdown(results.length > 0);
  };

  const handleInstFocus = () => {
    const results = searchColleges(instInput, city, extraColleges);
    setSuggestions(results);
    setShowDropdown(results.length > 0);
  };

  const pickCollege = (c: CollegeEntry) => {
    setInstInput(c.name);
    onInstitutionChange(c.name);
    if (!city) onCityChange(c.city);
    setShowDropdown(false);
  };

  return (
    <div className="md:col-span-2 space-y-4">
      {/* Pincode row */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelCls}>
            Institution Pincode <span className="text-gold text-xs">(auto-fills city)</span>
          </label>
          <div className="relative">
            <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            <input
              type="text"
              maxLength={6}
              inputMode="numeric"
              className={`${inputCls} pl-9 pr-9 ${errors.pincode ? 'border-danger' : ''}`}
              placeholder="e.g. 560107"
              value={pincode}
              onChange={e => onPincodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {pincodeStatus === 'loading' && <Loader2 size={14} className="text-muted animate-spin" />}
              {pincodeStatus === 'ok'      && <CheckCircle size={14} className="text-emerald-400" />}
              {pincodeStatus === 'error'   && <AlertCircle size={14} className="text-amber-400" />}
            </div>
          </div>
          <FieldError msg={errors.pincode} />
          {pincodeStatus === 'error' && (
            <p className="text-amber-400 text-xs mt-1">Could not fetch city — type manually below.</p>
          )}
        </div>

        <div>
          <label className={labelCls}>City</label>
          <input
            type="text"
            className={`${inputCls} ${errors.city ? 'border-danger' : ''}`}
            placeholder="Auto-filled or type city"
            value={city}
            onChange={e => onCityChange(e.target.value)}
          />
          <FieldError msg={errors.city} />
          {pincodeStatus === 'ok' && city && (
            <p className="text-emerald-400 text-xs mt-1 flex items-center gap-1">
              <CheckCircle size={11} /> City detected: {city}
            </p>
          )}
        </div>
      </div>

      {/* Institution autocomplete */}
      <div className="relative" ref={dropdownRef}>
        <label className={labelCls}>
          Institution / College *
        </label>
        <div className="relative">
          <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
          <input
            type="text"
            className={`${inputCls} pl-9 ${errors.institution ? 'border-danger' : ''}`}
            placeholder="Type to search or enter institution name"
            value={instInput}
            onChange={e => handleInstInput(e.target.value)}
            onFocus={handleInstFocus}
            autoComplete="off"
          />
          <Search size={13} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        </div>
        <FieldError msg={errors.institution} />

        {/* Dropdown */}
        {showDropdown && (
          <div className="absolute z-50 left-0 right-0 mt-1 bg-[#0A1628] border border-gold/20 rounded-lg shadow-2xl max-h-60 overflow-y-auto">
            {suggestions.map((c, i) => (
              <button
                key={i}
                type="button"
                onMouseDown={() => pickCollege(c)}
                className="w-full text-left px-4 py-2.5 hover:bg-gold/10 transition-colors border-b border-white/5 last:border-0"
              >
                <span className="text-white text-sm">{c.name}</span>
                <span className="text-gold text-xs ml-2 opacity-70">— {c.city}</span>
              </button>
            ))}
            {instInput && !suggestions.some(s => s.name.toLowerCase() === instInput.toLowerCase()) && (
              <div className="px-4 py-2.5 text-muted text-xs border-t border-white/5 italic">
                Not in list — your entry will be saved for future users
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InstitutionInput;
