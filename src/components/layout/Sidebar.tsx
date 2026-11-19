import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import {
  LayoutDashboard,
  BookOpen,
  Award,
  Heart,
  User,
  PlusCircle,
  Users,
  BarChart3,
  CheckSquare,
  DollarSign,
  FileText,
  ShieldCheck,
  Settings,
} from 'lucide-react';

interface SidebarProps {
  role?: 'student' | 'instructor' | 'admin';
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, className = '' }) => {
  const currentRole = role || useAppSelector((state) => state.auth.activeRole);

  const studentLinks = [
    { name: 'Overview', to: '/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', to: '/my-learning', icon: BookOpen },
    { name: 'Certificates', to: '/certificates', icon: Award },
    { name: 'Wishlist', to: '/wishlist', icon: Heart },
    { name: 'Profile & Settings', to: '/profile', icon: User },
  ];

  const instructorLinks = [
    { name: 'Dashboard', to: '/instructor/dashboard', icon: LayoutDashboard },
    { name: 'My Courses', to: '/instructor/courses', icon: BookOpen },
    { name: 'Create Course', to: '/instructor/create-course', icon: PlusCircle },
    { name: 'Students', to: '/instructor/students', icon: Users },
    { name: 'Analytics', to: '/instructor/analytics', icon: BarChart3 },
    { name: 'Profile & Payouts', to: '/profile', icon: Settings },
  ];

  const adminLinks = [
    { name: 'Admin Overview', to: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'User Management', to: '/admin/users', icon: Users },
    { name: 'Course Approvals', to: '/admin/courses', icon: CheckSquare },
    { name: 'Revenue & Payouts', to: '/admin/revenue', icon: DollarSign },
    { name: 'Platform Reports', to: '/admin/reports', icon: FileText },
    { name: 'System Settings', to: '/admin/settings', icon: ShieldCheck },
  ];

  const navItems =
    currentRole === 'admin'
      ? adminLinks
      : currentRole === 'instructor'
        ? instructorLinks
        : studentLinks;

  const roleTitle =
    currentRole === 'admin'
      ? 'Admin Center'
      : currentRole === 'instructor'
        ? 'Instructor Studio'
        : 'Student Hub';

  return (
    <aside className={`w-60 bg-white border-r border-slate-200/80 h-full p-3.5 flex flex-col justify-between shrink-0 overflow-y-auto select-none ${className}`}>
      <div>
        <div className="px-2.5 py-1.5 mb-2">
          <p className="text-xs font-bold text-slate-400 tracking-wider uppercase">
            {roleTitle}
          </p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={
                  item.to === '/dashboard' ||
                  item.to === '/instructor' ||
                  item.to === '/instructor/dashboard' ||
                  item.to === '/admin' ||
                  item.to === '/admin/dashboard'
                }
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2 rounded-xl font-medium text-sm transition-all ${isActive
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-xs shadow-teal-500/25 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Helpful Quick Tip Card */}
      <div className="p-3 bg-gradient-to-br from-teal-50 to-emerald-50/70 rounded-xl border border-teal-100 mt-4">
        <p className="font-bold flex items-center gap-1.5 text-teal-950 text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          Quick Tip
        </p>
        <p className="mt-1 text-teal-700 leading-relaxed text-xs">
          Switch personas at any time via the top banner to experience student, instructor, and admin capabilities!
        </p>
      </div>
    </aside>
  );
};

