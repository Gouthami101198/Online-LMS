import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { RoleSwitcherBanner } from '../common/RoleSwitcherBanner';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: 'student' | 'instructor' | 'admin';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      {/* Top Fixed Header: Role Switcher Banner + Role-Tailored Navbar */}
      <div className="shrink-0 z-40 bg-white">
        <RoleSwitcherBanner />
        <Navbar />
      </div>

      {/* Main App Body */}
      <div className="flex-1 flex min-h-0 w-full overflow-hidden">
        {/* Desktop Fixed Sidebar: Flush on left (0 gap), completely fixed, independent scroll */}
        <div className="hidden lg:flex shrink-0 h-full">
          <Sidebar role={role} />
        </div>

        {/* Mobile Sidebar Modal/Drawer */}
        {mobileSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 flex flex-col">
              <div className="p-4 flex items-center justify-between border-b border-slate-100">
                <span className="font-bold text-slate-800 text-sm">Dashboard Menu</span>
                <button
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto" onClick={() => setMobileSidebarOpen(false)}>
                <Sidebar role={role} className="w-full border-r-0" />
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area: Smooth Independent Vertical Scroll while Sidebar stays fixed */}
        <main className="flex-1 min-w-0 h-full overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 px-3 py-2 rounded-xl shadow-xs"
              >
                <Menu size={16} />
                <span>Menu Options</span>
              </button>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
