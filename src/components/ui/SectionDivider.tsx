import React from 'react';

interface SectionDividerProps {
  label?: string;
  className?: string;
}

const SectionDivider: React.FC<SectionDividerProps> = ({ label, className = '' }) => {
  if (!label) {
    return <hr className={`border-0 h-px bg-gold/40 my-12 ${className}`} />;
  }

  return (
    <div className={`flex items-center gap-4 my-12 ${className}`}>
      <hr className="flex-1 border-0 h-px bg-gold/40" />
      <span className="text-gold text-sm uppercase tracking-widest font-sans whitespace-nowrap">
        {label}
      </span>
      <hr className="flex-1 border-0 h-px bg-gold/40" />
    </div>
  );
};

export default SectionDivider;
