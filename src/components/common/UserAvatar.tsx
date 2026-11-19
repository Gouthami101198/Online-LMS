import React from 'react';
import { UserRole } from '../../types';
import { GraduationCap, Video, Shield } from 'lucide-react';

interface UserAvatarProps {
  name: string;
  role?: UserRole;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showBadge?: boolean;
}

export const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  role = 'student',
  size = 'md',
  className = '',
  showBadge = true,
}) => {
  // Extract clean 2-letter initials (ignoring Dr., Mr., etc.)
  const cleanName = name.replace(/^(Dr\.|Prof\.|Mr\.|Ms\.|Mrs\.)\s+/i, '').trim();
  const parts = cleanName.split(' ').filter(Boolean);
  let initials = 'IN';
  if (parts.length >= 2) {
    initials = `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  } else if (parts.length === 1 && parts[0].length >= 2) {
    initials = parts[0].substring(0, 2).toUpperCase();
  } else if (parts.length === 1) {
    initials = parts[0][0].toUpperCase();
  }

  // Dimension mapping
  const sizeMap = {
    xs: 'w-6 h-6 text-[10px]',
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  const badgeSizeMap = {
    xs: 'w-2.5 h-2.5 p-0.5',
    sm: 'w-3.5 h-3.5 p-0.5',
    md: 'w-4 h-4 p-0.5',
    lg: 'w-5 h-5 p-1',
    xl: 'w-6 h-6 p-1',
  };

  const iconSizeMap = {
    xs: 8,
    sm: 9,
    md: 10,
    lg: 12,
    xl: 14,
  };

  // 3D Gradients per role
  const gradientMap: Record<UserRole, string> = {
    student:
      'bg-gradient-to-tr from-teal-700 via-teal-600 to-emerald-400 text-white shadow-teal-700/30',
    instructor:
      'bg-gradient-to-tr from-slate-900 via-teal-900 to-emerald-600 text-white shadow-slate-900/30',
    admin:
      'bg-gradient-to-tr from-slate-950 via-teal-950 to-emerald-500 text-white shadow-teal-950/40',
  };

  const ringMap: Record<UserRole, string> = {
    student: 'ring-teal-500/20',
    instructor: 'ring-emerald-500/30',
    admin: 'ring-teal-400/40',
  };

  const badgeBgMap: Record<UserRole, string> = {
    student: 'bg-emerald-500 text-white',
    instructor: 'bg-teal-600 text-white',
    admin: 'bg-slate-900 text-teal-300',
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {/* 3D Sphere with inner highlight & shadow */}
      <div
        className={`${sizeMap[size]} rounded-2xl font-black flex items-center justify-center shadow-lg ring-2 ${ringMap[role]} ${gradientMap[role]} transition-transform duration-300 select-none relative overflow-hidden`}
        style={{
          boxShadow:
            'inset 0 1px 1px 0 rgba(255, 255, 255, 0.4), inset 0 -2px 4px 0 rgba(0, 0, 0, 0.25), 0 4px 10px -2px rgba(13, 148, 136, 0.25)',
        }}
      >
        {/* Subtle 3D glossy highlight on top edge */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-2xl" />
        <span className="relative z-10 tracking-wider drop-shadow-xs">{initials}</span>
      </div>

      {/* Role Badge Indicator */}
      {showBadge && (
        <span
          className={`absolute -bottom-1 -right-1 rounded-full ${badgeSizeMap[size]} ${badgeBgMap[role]} shadow-md border-2 border-white flex items-center justify-center`}
        >
          {role === 'student' ? (
            <GraduationCap size={iconSizeMap[size]} />
          ) : role === 'instructor' ? (
            <Video size={iconSizeMap[size]} />
          ) : (
            <Shield size={iconSizeMap[size]} />
          )}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;

