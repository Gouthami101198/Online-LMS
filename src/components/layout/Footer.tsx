import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Github, Twitter, Linkedin, Heart, Shield, Award, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-600/30">
                <BookOpen size={22} className="stroke-[2.5]" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                EduPath<span className="text-teal-400">.</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering learners and creators worldwide with cutting-edge tech education, interactive code challenges, verifiable certificates, and world-class mentors.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Github size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-teal-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/courses" className="hover:text-white transition-colors">Course Catalog</Link>
              </li>
              <li>
                <Link to="/courses?category=Development" className="hover:text-white transition-colors">Web Development</Link>
              </li>
              <li>
                <Link to="/courses?category=Data Science & AI" className="hover:text-white transition-colors">Data Science & AI</Link>
              </li>
              <li>
                <Link to="/courses?category=Design" className="hover:text-white transition-colors">UI/UX Design</Link>
              </li>
              <li>
                <Link to="/courses?category=Cloud & DevOps" className="hover:text-white transition-colors">Cloud & DevOps</Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="hover:text-white transition-colors">Student Dashboard</Link>
              </li>
              <li>
                <Link to="/instructor/dashboard" className="hover:text-white transition-colors">Instructor Portal</Link>
              </li>
              <li>
                <Link to="/admin/dashboard" className="hover:text-white transition-colors">Admin Governance</Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-white transition-colors">Verify Certificate</Link>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-white transition-colors">Wishlist</Link>
              </li>
            </ul>
          </div>

          {/* Trust & Guarantee */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Excellence</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <Award size={18} className="text-teal-400 shrink-0 mt-0.5" />
                <span>Accredited certificate on completion of any curriculum.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Shield size={18} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>30-day money-back guarantee on all courses.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <span>Lifetime access with future lesson updates included.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} EduPath LMS Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <a href="#" className="hover:text-slate-400">Cookie Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

