import React from 'react';

interface InitialsAvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0]?.toUpperCase() || '?';
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const sizeClasses = {
  sm: 'w-12 h-12 text-base',
  md: 'w-20 h-20 text-xl',
  lg: 'w-32 h-32 text-3xl',
};

const InitialsAvatar: React.FC<InitialsAvatarProps> = ({ name, size = 'md', className = '' }) => {
  return (
    <div
      className={`rounded-full border-2 border-gold bg-navy-mid flex items-center justify-center text-gold font-bold font-serif select-none ${sizeClasses[size]} ${className}`}
      aria-label={`${name} avatar`}
    >
      {getInitials(name)}
    </div>
  );
};

export default InitialsAvatar;
