import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addUser, login, switchRole } from '../../redux/slices/authSlice';
import { UserRole, User } from '../../types';
import {
  BookOpen,
  Mail,
  Lock,
  User as UserIcon,
  GraduationCap,
  Video,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, activeRole } = useAppSelector((state) => state.auth);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [agreed, setAgreed] = useState(true);
  const [error, setError] = useState('');

  // If already authenticated, redirect immediately to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      const dest =
        activeRole === 'admin'
          ? '/admin/dashboard'
          : activeRole === 'instructor'
          ? '/instructor/dashboard'
          : '/dashboard';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, activeRole, navigate]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please complete all required fields.');
      return;
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      role,
      joinedDate: new Date().toISOString().split('T')[0],
      enrolledCoursesCount: 0,
      completedCoursesCount: 0,
      status: 'active',
    };

    dispatch(addUser(newUser));
    dispatch(login({ email: newUser.email, role: newUser.role }));
    dispatch(switchRole(newUser.role));

    if (role === 'instructor') {
      navigate('/instructor/dashboard', { replace: true });
    } else {
      navigate('/dashboard', { replace: true });
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
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/25 group-hover:scale-105 transition-transform">
              <BookOpen size={26} className="stroke-[2.5]" />
            </div>
            <span className="font-black text-3xl tracking-tight text-white">
              EduPath<span className="text-teal-400">.</span>
            </span>
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight mt-3">
            Create Account
          </h1>
          <p className="text-xs text-teal-200/80 mt-1">
            Join over 200,000+ students and educators today
          </p>
        </div>

        {/* Unified Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl shadow-teal-950/40 border border-slate-100">
          <form onSubmit={handleRegister} className="space-y-4">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                I want to join as a:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                    role === 'student'
                      ? 'border-teal-500 bg-teal-50/80 text-teal-950 shadow-sm ring-1 ring-teal-500/30'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                      <GraduationCap size={16} />
                    </div>
                    {role === 'student' && (
                      <CheckCircle2 size={16} className="text-teal-600" />
                    )}
                  </div>
                  <span className="text-xs font-bold mt-1">Student</span>
                  <span className="text-[10px] text-slate-500">Learn & earn certs</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('instructor')}
                  className={`p-3 rounded-2xl border text-left flex flex-col gap-1 transition-all ${
                    role === 'instructor'
                      ? 'border-teal-500 bg-teal-50/80 text-teal-950 shadow-sm ring-1 ring-teal-500/30'
                      : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
                      <Video size={16} />
                    </div>
                    {role === 'instructor' && (
                      <CheckCircle2 size={16} className="text-teal-600" />
                    )}
                  </div>
                  <span className="text-xs font-bold mt-1">Instructor</span>
                  <span className="text-[10px] text-slate-500">Publish & earn</span>
                </button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <UserIcon
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Miller"
                  required
                  className="w-full h-11 pl-11 pr-4 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Email Address */}
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

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
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

            {/* Terms Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-teal-600 border-slate-300 focus:ring-teal-500"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to the{' '}
                  <a href="#" className="text-teal-600 underline font-medium">
                    Terms of Service
                  </a>{' '}
                  and Privacy Policy
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!agreed}
              className={`w-full h-12 mt-2 rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                agreed
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 active:scale-[0.99] text-white shadow-teal-500/25 hover:shadow-lg hover:shadow-teal-500/35'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Create Free Account</span>
              <ArrowRight size={16} />
            </button>

            {/* Login Link */}
            <p className="text-center text-xs text-slate-500 pt-3">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-teal-600 hover:text-teal-700 hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
