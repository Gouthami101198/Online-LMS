import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { useAppSelector } from '../../redux/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Award,
  Clock,
  Sparkles,
  Play,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Video,
  Flame,
  MessageSquare,
  HelpCircle,
  Share2,
  ChevronRight,
  Target,
  Send,
  Check,
} from 'lucide-react';
import { CourseCard } from '../../components/course/CourseCard';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const { courses } = useAppSelector((state) => state.courses);
  const { enrolledCourses, certificates } = useAppSelector((state) => state.enrollment);

  const [askModalOpen, setAskModalOpen] = useState(false);
  const [doubtQuestion, setDoubtQuestion] = useState('');
  const [doubtSubject, setDoubtSubject] = useState('Full-Stack React 18 & TypeScript');
  const [doubtSubmitted, setDoubtSubmitted] = useState(false);

  const enrolledCourseIds = Object.keys(enrolledCourses);
  const enrolledList = courses.filter((c) => enrolledCourseIds.includes(c.id));
  const completedCount = Object.values(enrolledCourses).filter((e) => e.isCompleted).length;
  const inProgressCount = enrolledCourseIds.length - completedCount;

  // Active in-progress course
  const activeEnrollment =
    Object.values(enrolledCourses).find((e) => !e.isCompleted) ||
    Object.values(enrolledCourses)[0];
  const activeCourse = activeEnrollment
    ? courses.find((c) => c.id === activeEnrollment.courseId)
    : null;

  // Indian academic cohorts & live sessions
  const liveMasterclasses = [
    {
      id: 'live-1',
      title: 'Advanced React 18 Transitions & Low-Latency Rendering',
      instructor: 'Dr. Rajesh Varma',
      role: 'Principal Cloud & AI Architect',
      date: 'Today, Nov 19',
      time: '07:00 PM - 08:30 PM IST',
      attendees: 184,
      isLiveSoon: true,
      tag: 'Interactive Workshop',
    },
    {
      id: 'live-2',
      title: 'Enterprise System Design: Low-Level Design & Kafka Pipelines',
      instructor: 'Rohan Deshmukh',
      role: 'Lead Cloud Infrastructure Architect',
      date: 'Tomorrow, Nov 20',
      time: '06:30 PM - 08:00 PM IST',
      attendees: 142,
      isLiveSoon: false,
      tag: 'Architecture Masterclass',
    },
    {
      id: 'live-3',
      title: 'Fintech Design Systems & Token Architecture in Figma',
      instructor: 'Ananya Deshmukh',
      role: 'Design Director, Razorpay',
      date: 'Friday, Nov 22',
      time: '05:00 PM - 06:30 PM IST',
      attendees: 96,
      isLiveSoon: false,
      tag: 'UI/UX Lab',
    },
  ];

  // Student Doubt & Q&A feed
  const [doubts, setDoubts] = useState([
    {
      id: 'd-1',
      studentName: 'Aarav Sharma',
      question:
        'When should we prefer useDeferredValue over startTransition in high-frequency search autocomplete?',
      course: 'Full-Stack React 18 Mastery',
      repliedBy: 'Dr. Rajesh Varma',
      reply:
        'Use startTransition when you control the state update itself. Use useDeferredValue when you receive a new value via props or third-party hooks and want React to defer the re-render.',
      timeAgo: '15m ago',
      resolved: true,
    },
    {
      id: 'd-2',
      studentName: 'Tanvi Kulkarni',
      question:
        'How does RTK Query manage cache invalidation tags across optimistic mutations?',
      course: 'Full-Stack React 18 Mastery',
      repliedBy: 'Dr. Rajesh Varma',
      reply:
        'Tags provide declarative cache invalidation. Define providesTags on query endpoints and invalidatesTags on mutation endpoints; RTK Query triggers automated background re-fetches.',
      timeAgo: '2h ago',
      resolved: true,
    },
  ]);

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtQuestion.trim()) return;

    setDoubts([
      {
        id: `d-${Date.now()}`,
        studentName: currentUser?.name || 'Aarav Sharma',
        question: doubtQuestion,
        course: doubtSubject,
        repliedBy: 'Dr. Rajesh Varma (Faculty)',
        reply:
          'Question received and queued for Dr. Rajesh Varma! You will receive an alert during the live doubt resolution slot.',
        timeAgo: 'Just now',
        resolved: false,
      },
      ...doubts,
    ]);

    setDoubtSubmitted(true);
    setTimeout(() => {
      setDoubtSubmitted(false);
      setAskModalOpen(false);
      setDoubtQuestion('');
    }, 1800);
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-8">
        {/* Welcome Banner with 3D depth and Indian Cohort context */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-teal-950 to-emerald-950 p-6 sm:p-8 text-white shadow-xl border border-teal-800/40 transform-gpu hover:shadow-teal-900/30 transition-all duration-300"
          style={{
            boxShadow:
              '0 15px 30px -10px rgba(13, 148, 136, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/15 backdrop-blur-md text-xs font-semibold text-teal-300 border border-teal-500/30 mb-3 shadow-xs">
              <Sparkles size={14} className="text-emerald-400" />
              <span>Bengaluru Tech Cohort • Indian Institute of Science Partnered</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-snug">
              Welcome back, {currentUser?.name || 'Aarav Sharma'}! 🎓
            </h1>
            <p className="mt-2 text-sm text-teal-100/90 leading-relaxed font-normal">
              You are currently ranked in the <strong className="text-white font-semibold">Top 4%</strong> of your engineering cohort. Keep up your active study streak to unlock your verified credential.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/courses">
                <Button
                  variant="primary"
                  size="md"
                  className="bg-white text-teal-950 hover:bg-teal-50 shadow-md font-bold border-0 text-sm py-2 px-4 transition-transform hover:scale-105"
                >
                  Explore Indian Curricula
                </Button>
              </Link>
              <button
                onClick={() => setAskModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-white text-sm font-semibold border border-teal-400/30 backdrop-blur-md transition-all cursor-pointer hover:scale-105"
              >
                <HelpCircle size={15} className="text-emerald-300" />
                <span>Ask Faculty Doubt</span>
              </button>
            </div>
          </div>

          {/* 3D sphere background glows */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/25 to-transparent pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        </motion.div>

        {/* 4 3D Stat Cards with Hover Elevation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="In Progress"
            value={inProgressCount}
            subtitle="Active engineering tracks"
            icon={<BookOpen size={20} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Completed"
            value={completedCount}
            subtitle="100% finished modules"
            icon={<CheckCircle2 size={20} />}
            iconColor="bg-emerald-50 text-emerald-700 border border-emerald-200/60"
            isPositive={true}
            change="+1 this month"
          />
          <StatCard
            title="Certificates"
            value={certificates.length}
            subtitle="Verified Indian credentials"
            icon={<Award size={20} />}
            iconColor="bg-amber-50 text-amber-700 border border-amber-200/60"
          />
          <StatCard
            title="Learning Hours"
            value="42.5"
            unit="hrs"
            subtitle="Time invested in IST"
            icon={<Clock size={20} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
            isPositive={true}
            change="+4.2h"
          />
        </div>

        {/* Weekly Study Goals & Daily Streak (3D Glassmorphic Widget) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Daily Streak Box */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            whileHover={{ y: -5, scale: 1.015 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col justify-between group transform-gpu relative overflow-hidden"
            style={{
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Active Study Streak
                </span>
                <span className="flex items-center gap-1 text-xs font-black text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  <Flame size={14} className="fill-amber-500 text-amber-500 animate-bounce" />
                  5 Days
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                5-Day Learning Habit 🔥
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                You studied consecutively Monday through Friday this week!
              </p>
            </div>

            {/* Daily tracker badges */}
            <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-7 gap-1.5 text-center">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                <div key={idx} className="space-y-1">
                  <div
                    className={`h-8 rounded-xl flex items-center justify-center text-xs font-bold shadow-2xs transition-all ${
                      idx < 5
                        ? 'bg-gradient-to-tr from-amber-500 to-orange-400 text-white shadow-amber-500/20 scale-105'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {idx < 5 ? <Check size={13} className="stroke-[3]" /> : day}
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{day}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Weekly Target Hours */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            whileHover={{ y: -5, scale: 1.015 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group transform-gpu relative overflow-hidden"
            style={{
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Weekly Goal
                </span>
                <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/80">
                  92% Met
                </span>
              </div>
              <h3 className="text-xl font-black text-slate-900 mt-2">
                18.5 / 20.0 hrs
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Only 1.5 hours remaining to hit your weekly engineering quota.
              </p>
            </div>

            <div className="mt-5 space-y-2">
              <div className="h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '92.5%' }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full shadow-xs"
                />
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-500">
                <span>Paced for Friday target</span>
                <span className="text-teal-700 font-extrabold">+2.1h vs last week</span>
              </div>
            </div>
          </motion.div>

          {/* Verified Credential Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{ y: -5, scale: 1.015 }}
            className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 rounded-2xl p-5 sm:p-6 text-white border border-teal-800/40 shadow-xl flex flex-col justify-between group transform-gpu relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-500/20 px-2.5 py-0.5 rounded-full border border-teal-400/30">
                  Official Credential
                </span>
                <h4 className="text-base font-bold text-white mt-2">
                  Full-Stack React 18 Specialist
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  Verified by Dr. Rajesh Varma (Faculty)
                </p>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <Award size={20} />
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="font-mono text-teal-200/80 text-xs">
                ID: EDP-RC18-98421
              </span>
              <Link
                to="/certificates"
                className="text-teal-300 hover:text-white font-bold flex items-center gap-1 group-hover:underline text-xs"
              >
                View Credential <ChevronRight size={14} />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* "Continue Learning" Active Course Spotlight with 3D Card Hover */}
        {activeCourse && activeEnrollment && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -4, scale: 1.008 }}
            className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300/70 transition-all duration-300 group transform-gpu relative overflow-hidden"
            style={{
              boxShadow:
                '0 4px 12px -2px rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">Continue Next Lecture</h3>
              </div>
              <Link
                to={`/learn/${activeCourse.id}`}
                className="text-xs font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
              >
                Classroom Portal <ArrowRight size={14} />
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="aspect-video rounded-xl overflow-hidden relative group/thumb shadow-xs">
                <img
                  src={activeCourse.thumbnail}
                  alt={activeCourse.title}
                  className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-500"
                />
                <Link
                  to={`/learn/${activeCourse.id}`}
                  className="absolute inset-0 bg-slate-950/40 flex items-center justify-center text-white group-hover/thumb:bg-slate-950/30 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center pl-0.5 shadow-lg shadow-teal-500/40 group-hover/thumb:scale-115 transition-transform">
                    <Play size={20} className="fill-white" />
                  </div>
                </Link>
              </div>

              <div className="md:col-span-2 space-y-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-teal-200/60">
                      {activeCourse.category}
                    </span>
                    <span className="text-xs text-slate-400">• {activeCourse.duration}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mt-1.5">
                    {activeCourse.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-2">
                    <UserAvatar name={activeCourse.instructorName} role="instructor" size="xs" showBadge={false} />
                    <span className="text-xs font-semibold text-slate-700">
                      Faculty: {activeCourse.instructorName}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Overall Course Completion</span>
                    <span className="text-teal-700 font-extrabold">{activeEnrollment.progressPercent}%</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${activeEnrollment.progressPercent}%` }}
                      transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
                      className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500"
                    />
                  </div>
                </div>

                <div className="pt-1.5 flex flex-wrap items-center gap-3">
                  <Link to={`/learn/${activeCourse.id}`}>
                    <Button variant="primary" size="sm" leftIcon={<Play size={15} />} className="font-bold shadow-xs text-xs py-2 px-3.5 hover:scale-105 transition-transform">
                      Resume Lecture
                    </Button>
                  </Link>
                  {activeEnrollment.isCompleted && (
                    <Link to="/certificates">
                      <Button variant="outline" size="sm" leftIcon={<Award size={15} />} className="text-xs py-2 px-3.5 hover:scale-105 transition-transform">
                        View Official Certificate
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Live Cohort Masterclasses & Doubt Sessions (Indian Schedule IST) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Video size={19} className="text-teal-600" />
                Upcoming Live Masterclasses & Doubt Clearing (IST)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Interactive real-time faculty cohorts with live Q&A, code reviews, and office hours.
              </p>
            </div>
            <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 px-3 py-1 rounded-full">
              Indian Standard Time (UTC+5:30)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {liveMasterclasses.map((cls, idx) => (
              <motion.div
                key={cls.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * idx }}
                whileHover={{ y: -6, scale: 1.015 }}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-teal-300 transition-all duration-300 flex flex-col justify-between group transform-gpu relative overflow-hidden"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 rounded-full">
                      {cls.tag}
                    </span>
                    {cls.isLiveSoon && (
                      <span className="inline-flex items-center gap-1 text-xs font-black text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> Starting Soon
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-teal-900 transition-colors">
                    {cls.title}
                  </h4>

                  <div className="flex items-center gap-2.5 pt-1">
                    <UserAvatar name={cls.instructor} role="instructor" size="xs" showBadge={false} />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">{cls.instructor}</p>
                      <p className="text-xs text-slate-400 truncate">{cls.role}</p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                    <div className="flex items-center gap-2 font-medium">
                      <Calendar size={13} className="text-teal-600 shrink-0" />
                      <span>{cls.date}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-slate-800">
                      <Clock size={13} className="text-teal-600 shrink-0" />
                      <span>{cls.time}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-medium">
                    {cls.attendees} peers registered
                  </span>
                  <button
                    onClick={() => alert(`Registered for "${cls.title}". Meeting link dispatched to your email!`)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-bold shadow-2xs transition-all cursor-pointer hover:scale-105"
                  >
                    Join Cohort
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Student Doubt Resolution & Faculty Feedback */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs"
          style={{
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-slate-100 gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare size={19} className="text-teal-600" />
                Direct Faculty Doubt Resolution
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Ask questions regarding lectures, code bugs, and get verified answers from course instructors.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setAskModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all self-start sm:self-auto cursor-pointer"
            >
              <HelpCircle size={14} />
              <span>Ask New Doubt</span>
            </motion.button>
          </div>

          <div className="mt-4 space-y-3.5">
            {doubts.map((d, dIdx) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * dIdx }}
                whileHover={{ y: -2 }}
                className="p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 space-y-2.5 hover:bg-white hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <UserAvatar name={d.studentName} role="student" size="xs" showBadge={false} />
                    <span className="text-xs font-bold text-slate-900">{d.studentName}</span>
                    <span className="text-xs text-teal-700 bg-teal-50 border border-teal-200/60 px-2.5 py-0.5 rounded-full font-semibold">
                      {d.course}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{d.timeAgo}</span>
                </div>

                <p className="text-sm font-semibold text-slate-800 pl-8">
                  Q: {d.question}
                </p>

                {d.reply && (
                  <div className="ml-8 p-3.5 rounded-lg bg-white border border-teal-200/60 shadow-2xs space-y-1">
                    <div className="flex items-center gap-2">
                      <UserAvatar name={d.repliedBy} role="instructor" size="xs" showBadge={false} />
                      <span className="text-xs font-bold text-teal-900">{d.repliedBy}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        Verified Faculty Answer
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed pl-6 pt-0.5">
                      {d.reply}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enrolled Courses Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              My Enrolled Courses ({enrolledList.length})
            </h3>
            <Link to="/my-learning" className="text-xs font-bold text-teal-600 hover:underline">
              See all learning tracks →
            </Link>
          </div>

          {enrolledList.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-dashed border-slate-300">
              <BookOpen size={32} className="mx-auto text-slate-400 mb-2" />
              <h4 className="font-bold text-slate-800 text-sm">You haven't enrolled in any courses yet</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                Explore our catalog to start building your technical skills today.
              </p>
              <Link to="/courses" className="mt-3.5 inline-block">
                <Button size="sm" className="text-xs">Explore Courses</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {enrolledList.map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * idx }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Indian Curricula to Explore */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Recommended Curricula For You
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Tailored for Indian tech interviews and enterprise engineering stacks
              </p>
            </div>
            <Link to="/courses" className="text-xs font-bold text-teal-600 hover:underline">
              Browse full catalog (₹ INR) →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses
              .filter((c) => !enrolledCourseIds.includes(c.id))
              .slice(0, 3)
              .map((course, idx) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.05 * idx }}
                >
                  <CourseCard course={course} />
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {/* Ask Doubt Modal with AnimatePresence */}
      <AnimatePresence>
        {askModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
            onClick={() => setAskModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <HelpCircle size={18} className="text-teal-600" />
                  <h3 className="font-bold text-slate-900 text-base">Ask Faculty Doubt</h3>
                </div>
                <button
                  onClick={() => setAskModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-lg leading-none p-1 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {doubtSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2"
                >
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  Your doubt has been submitted! Dr. Rajesh Varma will respond shortly.
                </motion.div>
              ) : (
                <form onSubmit={handlePostDoubt} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Select Course Track
                    </label>
                    <select
                      value={doubtSubject}
                      onChange={(e) => setDoubtSubject(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 font-semibold"
                    >
                      <option value="Full-Stack React 18 & TypeScript">Full-Stack React 18 & TypeScript</option>
                      <option value="Generative AI & Machine Learning">Generative AI & Machine Learning</option>
                      <option value="Enterprise Cloud & DevOps with Kubernetes">Enterprise Cloud & DevOps with Kubernetes</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Your Question / Doubt Details
                    </label>
                    <textarea
                      rows={4}
                      value={doubtQuestion}
                      onChange={(e) => setDoubtQuestion(e.target.value)}
                      placeholder="Describe what concept or code snippet you are having difficulty with..."
                      required
                      className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-teal-500 resize-none font-medium"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setAskModalOpen(false)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-xs font-bold shadow-md shadow-teal-500/20 cursor-pointer"
                    >
                      Submit Question
                    </motion.button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
};
