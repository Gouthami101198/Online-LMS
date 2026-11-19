import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { RoleSwitcherBanner } from '../components/common/RoleSwitcherBanner';
import { CourseCard } from '../components/course/CourseCard';
import { Button } from '../components/common/Button';
import { useAppSelector } from '../redux/store';
import { INITIAL_CATEGORIES } from '../api/mockData';
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  Award,
  Video,
  PlayCircle,
  Users,
  ShieldCheck,
  Star,
  BookOpen,
  Code,
  Brain,
  Palette,
  Cloud,
  Shield,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { UserAvatar } from '../components/common/UserAvatar';

export const Home: React.FC = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const featuredCourses = courses.filter((c) => c.isFeatured).slice(0, 3);

  const categoryIcons: Record<string, any> = {
    Code,
    Palette,
    Brain,
    Cloud,
    Shield,
    Smartphone,
    Briefcase: Laptop,
    TrendingUp: Star,
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <RoleSwitcherBanner />
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-teal-50/30 to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-xs font-bold text-teal-700 shadow-xs">
                  <Sparkles size={14} className="text-emerald-500" />
                  Next-Generation Learning Experience
                </div>

                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Learn in-demand skills.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500">
                    Build real projects.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                  Join 150,000+ developers, designers, and AI engineers advancing their careers with video lectures, interactive quizzes, automated progress tracking, and accredited certificates.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                  <Link to="/courses">
                    <Button size="lg" variant="primary" rightIcon={<ArrowRight size={18} />}>
                      Explore All Courses
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button size="lg" variant="outline" className="bg-white">
                      Start Learning Free
                    </Button>
                  </Link>
                </div>

                {/* Social proof trust bar */}
                <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <UserAvatar name="Aarav Sharma" role="student" size="xs" showBadge={false} />
                      <UserAvatar name="Tanvi Kulkarni" role="student" size="xs" showBadge={false} />
                      <UserAvatar name="Rohan Deshmukh" role="student" size="xs" showBadge={false} />
                    </div>
                    <span>4.9/5 from 15,000+ reviews</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-600">
                    <ShieldCheck size={16} />
                    <span>30-Day Money Back Guarantee</span>
                  </div>
                </div>
              </div>

              {/* Right Hero Visual Card */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl bg-slate-900 p-6 sm:p-7 shadow-2xl border border-slate-800 text-white">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-rose-500" />
                      <span className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-mono text-teal-400 font-semibold">EduPath Live Classroom</span>
                  </div>

                  {/* Video preview mock */}
                  <div className="mt-4 relative aspect-video rounded-2xl overflow-hidden bg-slate-800">
                    <img
                      src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=80"
                      alt="React Mastery"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 flex items-center justify-center pl-1 shadow-lg shadow-teal-500/40 animate-pulse">
                        <PlayCircle size={30} className="fill-white text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Floating feature pills */}
                  <div className="mt-5 space-y-3">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-emerald-400" />
                        <span>Interactive Quiz Passed</span>
                      </div>
                      <span className="text-emerald-400 font-bold">100% Score</span>
                    </div>

                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Award size={16} className="text-amber-400" />
                        <span>Accredited Certificate</span>
                      </div>
                      <span className="text-amber-300 font-bold">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section className="py-16 bg-white border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                  Featured Programs
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Most Popular Courses
                </h2>
              </div>
              <Link to="/courses" className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1">
                View all courses <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                Browse by Specialty
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Top Learning Categories
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Pick your learning track and start building practical real-world applications today.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {INITIAL_CATEGORIES.map((cat) => {
                const IconComponent = categoryIcons[cat.icon] || Code;
                return (
                  <Link
                    key={cat.id}
                    to={`/courses?category=${encodeURIComponent(cat.name)}`}
                    className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-xl hover:border-teal-200 transition-all group flex flex-col justify-between"
                  >
                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-gradient-to-r group-hover:from-teal-600 group-hover:to-emerald-500 group-hover:text-white transition-all shadow-xs">
                      <IconComponent size={22} />
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-teal-600 transition-colors">
                        {cat.name}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">{cat.count} courses</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Your Roadmap from Beginner to Mastery
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-teal-500/20">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-base">Select Your Track</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Browse hand-crafted curriculum designed by principal engineers and industry practitioners.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-teal-500/20">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-base">Watch & Complete Quizzes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Engage with high-definition video player, take structured quizzes, and track your completion real-time.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/70 text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md shadow-teal-500/20">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-base">Earn Official Certificate</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Confer accredited credentials with verifiable verification codes ready for LinkedIn and your resume.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="py-16 bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 text-white border-t border-teal-900/40">
          <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Ready to elevate your software career?
            </h2>
            <p className="text-sm sm:text-base text-teal-100 max-w-xl mx-auto leading-relaxed">
              Join thousands of engineers learning cutting-edge skills today. No credit card required to start free previews.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/courses">
                <Button size="lg" className="bg-white text-teal-900 hover:bg-teal-50 font-bold shadow-none">
                  Get Started Today
                </Button>
              </Link>
              <Link to="/register">
                <Button size="lg" variant="outline" className="border-teal-500/30 text-white hover:bg-white/10">
                  Teach on EduPath
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

