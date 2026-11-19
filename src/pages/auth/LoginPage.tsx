import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { login, switchRole } from '../../redux/slices/authSlice';
import {
  BookOpen,
  Mail,
  Lock,
  Sparkles,
  GraduationCap,
  Video,
  Shield,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, activeRole, users } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState('aarav.sharma@example.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<'student' | 'instructor' | 'admin'>('student');

  // If already authenticated, redirect immediately to the proper dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const fromPath = (location.state as { from?: string })?.from;
      if (fromPath && fromPath !== '/login') {
        navigate(fromPath, { replace: true });
      } else {
        const dest =
          activeRole === 'admin'
            ? '/admin/dashboard'
            : activeRole === 'instructor'
              ? '/instructor/dashboard'
              : '/dashboard';
        navigate(dest, { replace: true });
      }
    }
  }, [isAuthenticated, activeRole, navigate, location.state]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }
    const matched = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    dispatch(login({ email: email.trim() }));

    const targetRole = matched?.role || 'student';
    const dest =
      targetRole === 'admin'
        ? '/admin/dashboard'
        : targetRole === 'instructor'
          ? '/instructor/dashboard'
          : '/dashboard';
    navigate(dest, { replace: true });
  };

  const handleQuickLogin = (role: 'student' | 'instructor' | 'admin') => {
    setSelectedPersona(role);
    if (role === 'student') {
      setEmail('aarav.sharma@example.com');
      dispatch(login({ email: 'aarav.sharma@example.com' }));
      dispatch(switchRole('student'));
      navigate('/dashboard', { replace: true });
    } else if (role === 'instructor') {
      setEmail('rajesh.varma@edupath.in');
      dispatch(login({ email: 'rajesh.varma@edupath.in' }));
      dispatch(switchRole('instructor'));
      navigate('/instructor/dashboard', { replace: true });
    } else {
      setEmail('admin@edupath.in');
      dispatch(login({ email: 'admin@edupath.in' }));
      dispatch(switchRole('admin'));
      navigate('/admin/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950 to-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-[460px] mx-auto space-y-6 relative z-10">
        {/* Brand Header */}
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <BookOpen size={24} className="stroke-[2.5]" />
            </div>
            <span className="font-black text-3xl tracking-tight text-white">
              EduPath<span className="text-teal-400">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight mt-3">
            Welcome Back
          </h1>
          <p className="text-sm text-teal-200/90 mt-1">
            Sign in to access your learning dashboard and courses
          </p>
        </div>

        {/* Unified Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-teal-950/40 border border-slate-100">
          {/* Quick Demo Personas */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-500" /> 1-Click Demo Sign-In
              </span>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
                Instant Access
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('student')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 transform-gpu hover:-translate-y-1 hover:shadow-md cursor-pointer ${selectedPersona === 'student'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-900 shadow-sm ring-1 ring-teal-500/30'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100/80'
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-700 to-emerald-500 text-white flex items-center justify-center shadow-md shadow-teal-600/20">
                  <GraduationCap size={20} />
                </div>
                <span className="text-xs font-black mt-0.5">Aarav S.</span>
                <span className="text-xs text-teal-700 font-bold bg-teal-100/60 px-1.5 py-0.2 rounded-full">Student</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('instructor')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 transform-gpu hover:-translate-y-1 hover:shadow-md cursor-pointer ${selectedPersona === 'instructor'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-900 shadow-sm ring-1 ring-teal-500/30'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100/80'
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-teal-800 text-white flex items-center justify-center shadow-md shadow-slate-900/20">
                  <Video size={20} />
                </div>
                <span className="text-xs font-black mt-0.5">Dr. Rajesh</span>
                <span className="text-xs text-slate-700 font-bold bg-slate-200/60 px-1.5 py-0.2 rounded-full">Faculty</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('admin')}
                className={`p-3 rounded-2xl border text-center flex flex-col items-center justify-center gap-1 transition-all duration-200 transform-gpu hover:-translate-y-1 hover:shadow-md cursor-pointer ${selectedPersona === 'admin'
                    ? 'border-teal-500 bg-teal-50/80 text-teal-900 shadow-sm ring-1 ring-teal-500/30'
                    : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100/80'
                  }`}
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-950 to-emerald-600 text-white flex items-center justify-center shadow-md shadow-teal-950/20">
                  <Shield size={20} />
                </div>
                <span className="text-xs font-black mt-0.5">Vikram S.</span>
                <span className="text-xs text-emerald-800 font-bold bg-emerald-100/60 px-1.5 py-0.2 rounded-full">Admin</span>
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Or sign in with email
            </span>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Password
                </label>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('For demo accounts, use password: password123');
                  }}
                  className="text-[11px] text-teal-600 font-semibold hover:underline"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-11 pl-11 pr-11 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Keep Signed In Checkbox */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-teal-600 border-slate-300 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-600 font-medium">Remember this session</span>
              </label>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> SSL Secured
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full h-12 mt-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 active:scale-[0.99] text-white font-bold text-sm shadow-md shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/35 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Sign In to EduPath</span>
              <ArrowRight size={16} />
            </button>

            {/* Register Link */}
            <p className="text-center text-xs text-slate-500 pt-3">
              Don't have an account yet?{' '}
              <Link to="/register" className="font-bold text-teal-600 hover:text-teal-700 hover:underline">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
