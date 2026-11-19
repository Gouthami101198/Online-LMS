import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { switchRole } from '../../redux/slices/authSlice';
import { UserRole } from '../../types';
import { Shield, GraduationCap, Video, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const RoleSwitcherBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { activeRole, currentUser, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated || !currentUser) {
    return null;
  }

  const handleRoleChange = (role: UserRole) => {
    dispatch(switchRole(role));
    if (role === 'student') {
      navigate('/dashboard');
    } else if (role === 'instructor') {
      navigate('/instructor/dashboard');
    } else if (role === 'admin') {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-950 via-teal-950 to-slate-950 text-white text-xs py-2 px-4 border-b border-teal-800/40 shadow-inner flex flex-wrap items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
        </span>
        <span className="text-slate-300 font-medium hidden sm:inline">Role Switcher:</span>
        <span className="text-slate-100 font-bold bg-white/10 px-2.5 py-0.5 rounded-full border border-teal-500/30 flex items-center gap-1.5">
          <Sparkles size={13} className="text-emerald-400" />
          {currentUser?.name} ({activeRole.toUpperCase()})
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-slate-400 font-medium hidden md:inline">Switch Role:</span>
        <button
          onClick={() => handleRoleChange('student')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            activeRole === 'student'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <GraduationCap size={14} />
          Student
        </button>
        <button
          onClick={() => handleRoleChange('instructor')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            activeRole === 'instructor'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Video size={14} />
          Instructor
        </button>
        <button
          onClick={() => handleRoleChange('admin')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-semibold transition-all ${
            activeRole === 'admin'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
              : 'text-slate-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Shield size={14} />
          Admin
        </button>
      </div>
    </div>
  );
};

