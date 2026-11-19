import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateProfile } from '../../redux/slices/authSlice';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  CheckCircle,
  Shield,
  Award,
  BookOpen,
  Sparkles,
  Fingerprint,
} from 'lucide-react';

export const StudentProfile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { currentUser, activeRole } = useAppSelector((state) => state.auth);
  const { certificates, enrolledCourses } = useAppSelector((state) => state.enrollment);

  const [name, setName] = useState(currentUser?.name || 'Aarav Sharma');
  const [title, setTitle] = useState(currentUser?.title || 'Computer Science Scholar & Full-Stack Aspirant');
  const [bio, setBio] = useState(
    currentUser?.bio ||
    'Passionate engineering student at IISc Bengaluru specializing in Full-Stack TypeScript, React 18, and Cloud Microservices.'
  );
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(currentUser?.location || 'Bengaluru, Karnataka, India');
  const [website, setWebsite] = useState(currentUser?.website || 'https://github.com/aarav-sharma-in');

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!bio.trim()) newErrors.bio = 'Please provide a short bio';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    dispatch(
      updateProfile({
        name,
        title,
        bio,
        phone,
        location,
        website,
        avatar: '',
      })
    );

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <DashboardLayout role={activeRole}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Account & Profile Identity</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your personal bio, contact info, and Indian academic & industry credentials.
          </p>
        </div>

        {/* Overview Stats Bar with 3D depth */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center border border-teal-200/60 shadow-xs">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Enrolled Courses</p>
              <h4 className="text-xl font-black text-slate-900">{Object.keys(enrolledCourses).length}</h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200/60 shadow-xs">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Certificates Earned</p>
              <h4 className="text-xl font-black text-slate-900">{certificates.length}</h4>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/60 shadow-xs">
              <Shield size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold">Account Verification</p>
              <h4 className="text-sm font-black text-emerald-700 capitalize flex items-center gap-1">
                <CheckCircle size={14} /> Verified {activeRole}
              </h4>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-lg space-y-6">
          {savedSuccess && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle size={16} className="text-emerald-600 shrink-0" />
              Profile updated successfully! All changes are now live across EduPath.
            </div>
          )}

          {/* 3D Monogram Avatar Identity Section (NO photo images) */}
          <div className="flex flex-col sm:flex-row items-center gap-5 pb-6 border-b border-slate-100">
            <div className="relative">
              <UserAvatar name={name || currentUser?.name || 'User'} role={activeRole} size="xl" showBadge={true} />
            </div>

            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Fingerprint size={14} className="text-teal-600" />
                  Official 3D Monogram Credential
                </span>
                <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 border border-teal-200/60 px-2 py-0.5 rounded-full">
                  Zero Photo Policy
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                EduPath securely generates your identity badge using 3D spherical gradients with cryptographic initials and role indicators. No photo uploads are required.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-semibold"
                  required
                />
              </div>
              {errors.name && <p className="text-[11px] text-rose-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={currentUser?.email || ''}
                  disabled
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Professional Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Full-Stack Developer & Cloud Architect"
                className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (India)</label>
              <div className="relative">
                <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">City & State (India)</label>
              <div className="relative">
                <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Bengaluru, Karnataka, India"
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Portfolio / GitHub Profile</label>
              <div className="relative">
                <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://github.com/aarav-sharma-in"
                  className="w-full pl-10 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-medium"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Biography</label>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Share your technical goals, cohort details, and academic interests..."
              className="w-full p-3.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 resize-none font-medium"
            />
            {errors.bio && <p className="text-[11px] text-rose-500 mt-1">{errors.bio}</p>}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Sparkles size={14} className="text-teal-500" /> Encrypted & synced with EduPath Cloud (Mumbai Region)
            </span>
            <Button type="submit" variant="primary" size="md" className="font-bold shadow-md shadow-teal-500/20">
              Save Profile Changes
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};
