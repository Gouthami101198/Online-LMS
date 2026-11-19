import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { deleteCourse } from '../../redux/slices/courseSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { StatCard } from '../../components/common/StatCard';
import { UserAvatar } from '../../components/common/UserAvatar';
import { formatINR, formatINRCompact } from '../../utils/formatCurrency';
import {
  DollarSign,
  Users,
  Star,
  BookOpen,
  PlusCircle,
  TrendingUp,
  Search,
  Eye,
  Trash2,
  Edit3,
  BarChart3,
  CheckCircle2,
  Send,
  Sparkles,
  Award,
  Clock,
  HelpCircle,
  CheckCircle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const InstructorDashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { currentUser, users } = useAppSelector((state) => state.auth);
  const { courses } = useAppSelector((state) => state.courses);
  const { revenueHistory } = useAppSelector((state) => state.admin);

  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'analytics'>('courses');
  const [courseSearch, setCourseSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Author's courses or all if instructor
  const instructorCourses = courses.filter(
    (c) =>
      c.instructorId === currentUser?.id ||
      c.instructorName === currentUser?.name ||
      currentUser?.role === 'instructor'
  );

  const filteredCourses = instructorCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.category.toLowerCase().includes(courseSearch.toLowerCase())
  );

  const totalStudents = instructorCourses.reduce((acc, c) => acc + c.studentsCount, 0);
  const totalReviews = instructorCourses.reduce((acc, c) => acc + c.reviewsCount, 0);
  const avgRating =
    instructorCourses.length > 0
      ? (instructorCourses.reduce((acc, c) => acc + c.rating, 0) / instructorCourses.length).toFixed(1)
      : '4.92';

  // Mock enrolled students with real course linkage
  const rawStudents = users.filter((u) => u.role === 'student');
  const enrolledStudentList = [
    {
      id: 'st-1',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@example.com',
      avatar: '',
      course: instructorCourses[0]?.title || 'Full-Stack React 18 Mastery',
      date: 'Today, 10:15 AM',
      progress: '78%',
      status: 'Active',
    },
    {
      id: 'st-2',
      name: 'Tanvi Kulkarni',
      email: 'tanvi.k@example.com',
      avatar: '',
      course: instructorCourses[1]?.title || 'Enterprise Cloud & DevOps',
      date: 'Yesterday, 4:30 PM',
      progress: '92%',
      status: 'Active',
    },
    {
      id: 'st-3',
      name: 'Rohan Deshmukh',
      email: 'rohan.d@example.com',
      avatar: '',
      course: instructorCourses[2]?.title || 'Generative AI & LangChain',
      date: 'Nov 14, 2026',
      progress: '100%',
      status: 'Completed',
    },
    {
      id: 'st-4',
      name: 'Aditi Sundaram',
      email: 'aditi.s@example.com',
      avatar: '',
      course: instructorCourses[0]?.title || 'Full-Stack React 18 Mastery',
      date: 'Nov 12, 2026',
      progress: '45%',
      status: 'Active',
    },
    {
      id: 'st-5',
      name: 'Nikhil Verma',
      email: 'nikhil.v@example.com',
      avatar: '',
      course: instructorCourses[1]?.title || 'Enterprise Cloud & DevOps',
      date: 'Nov 10, 2026',
      progress: '60%',
      status: 'Active',
    },
  ];

  const filteredStudents = enrolledStudentList.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.course.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove course "${title}"?`)) {
      dispatch(deleteCourse(id));
      showToast(`Course "${title}" removed successfully.`);
    }
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-8 max-w-7xl mx-auto w-full transition-colors duration-200">
        {/* Toast Notification */}
        <AnimatePresence>
          {toastMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 text-xs font-semibold"
            >
              <CheckCircle2 size={16} className="text-emerald-400" />
              <span>{toastMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider mb-1 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200/60">
              <Sparkles size={13} className="text-teal-600" />
              Instructor Studio
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Course Management & Performance
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Publish rich interactive lectures, track student completion, and view revenue analytics.
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/instructor/create-course"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white text-sm font-bold transition-all shadow-md shadow-teal-500/25"
            >
              <PlusCircle size={16} />
              <span>Create New Course</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* 4 KPI Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Monthly Revenue"
            value={formatINR(currentUser?.totalEarnings || 1489200)}
            change="+18.2%"
            isPositive={true}
            subtitle="IST payouts settled"
            icon={<TrendingUp size={18} />}
            iconColor="bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          />
          <StatCard
            title="Total Learners"
            value={totalStudents > 0 ? totalStudents : 88400}
            change="+3.4k"
            isPositive={true}
            subtitle="Across live cohorts"
            icon={<Users size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Active Courses"
            value={instructorCourses.length}
            subtitle="Curated engineering tracks"
            icon={<BookOpen size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Instructor Rating"
            value={avgRating}
            change="+0.2"
            isPositive={true}
            subtitle={`${totalReviews > 0 ? totalReviews : 1420} verified reviews`}
            icon={<Star size={18} className="fill-amber-400 text-amber-500" />}
            iconColor="bg-amber-50 text-amber-700 border border-amber-200/60"
          />
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="border-b border-slate-200 flex items-center gap-6 text-sm font-bold pt-2">
          <button
            onClick={() => setActiveTab('courses')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'courses' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>My Courses Studio ({instructorCourses.length})</span>
            {activeTab === 'courses' && (
              <motion.span
                layoutId="instTab"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'students' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Enrolled Students ({filteredStudents.length})</span>
            {activeTab === 'students' && (
              <motion.span
                layoutId="instTab"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 transition-colors relative cursor-pointer ${
              activeTab === 'analytics' ? 'text-teal-700' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Earnings & Analytics</span>
            {activeTab === 'analytics' && (
              <motion.span
                layoutId="instTab"
                className="absolute bottom-0 inset-x-0 h-0.5 bg-gradient-to-r from-teal-600 to-emerald-500 rounded-full"
              />
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
        {/* Tab 1: My Courses Studio */}
        {activeTab === 'courses' && (
          <motion.div
            key="tab-courses"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs"
          >
            <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Course Catalog Management</h3>
                <p className="text-xs text-slate-500">Active certified courses published on EduPath LMS</p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter courses..."
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3.5 px-4 sm:px-6">Course</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Enrolled Students</th>
                    <th className="py-3.5 px-4">Rating</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400 text-xs">
                        No courses found matching "{courseSearch}".
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((course) => (
                      <tr key={course.id} className="hover:bg-slate-50/80 transition-colors">
                        {/* Course Title & Thumbnail */}
                        <td className="py-4 px-4 sm:px-6">
                          <div className="flex items-center gap-3">
                            <img
                              src={course.thumbnail}
                              alt={course.title}
                              className="w-12 h-8 rounded-lg object-cover flex-shrink-0 shadow-xs"
                              onError={(e) => {
                                e.currentTarget.src =
                                  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                              }}
                            />
                            <div className="min-w-0">
                              <span className="font-bold text-slate-900 line-clamp-1">
                                {course.title}
                              </span>
                              <span className="text-[11px] text-slate-400">
                                {course.totalLessons} lessons • {course.duration}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-4 px-4 whitespace-nowrap text-slate-600 font-semibold">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                            {course.category}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="py-4 px-4 whitespace-nowrap font-bold text-slate-900">
                          {course.price === 0 ? (
                            <span className="text-emerald-600">Free</span>
                          ) : (
                            formatINR(course.discountPrice || course.price)
                          )}
                        </td>

                        {/* Enrolled Students */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          {course.studentsCount.toLocaleString()}
                        </td>

                        {/* Rating */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 font-bold text-slate-900">
                            <Star size={14} className="text-amber-400 fill-amber-400" />
                            {course.rating.toFixed(1)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
                            <CheckCircle2 size={12} /> Published
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap space-x-1">
                          <button
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                            title="Preview Course"
                          >
                            <Eye size={15} />
                          </button>
                          <button
                            onClick={() => navigate(`/instructor/create-course`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                            title="Edit Curriculum"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => navigate(`/instructor/analytics`)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition-colors"
                            title="Course Analytics"
                          >
                            <BarChart3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteCourse(course.id, course.title)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Course"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Enrolled Students */}
        {activeTab === 'students' && (
          <motion.div
            key="tab-students"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs p-5 sm:p-6 space-y-4"
          >
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Active Students Directory</h3>
                <p className="text-xs text-slate-500">Learners currently active in your enrolled courses</p>
              </div>
              <div className="relative w-full sm:w-64">
                <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Filter student name or course..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4">Student</th>
                    <th className="py-3 px-4">Enrolled Course</th>
                    <th className="py-3 px-4">Joined Date</th>
                    <th className="py-3 px-4">Progress</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                  {filteredStudents.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-10 text-center text-slate-400 text-xs">
                        No students found matching "{studentSearch}".
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map((st) => (
                      <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <UserAvatar name={st.name} role="student" size="sm" showBadge={false} />
                            <div>
                              <div className="font-bold text-slate-900">{st.name}</div>
                              <div className="text-[11px] text-slate-400">{st.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-700 line-clamp-1 max-w-[200px]">
                          {st.course}
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{st.date}</td>
                        <td className="py-3.5 px-4">
                          <span className="font-bold text-teal-700">{st.progress}</span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                              st.status === 'Completed'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                                : 'bg-teal-50 text-teal-700 border-teal-200/60'
                            }`}
                          >
                            {st.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => showToast(`Direct message sent to ${st.name}`)}
                            className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                          >
                            <Send size={12} />
                            <span>Message</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Earnings & Analytics */}
        {activeTab === 'analytics' && (
          <motion.div
            key="tab-analytics"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="space-y-6"
          >
            {/* Main Area Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                <div>
                  <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                    <TrendingUp size={18} className="text-teal-600" />
                    Monthly Revenue Performance
                  </h3>
                  <p className="text-xs text-slate-500">
                    Gross instructor payouts for the last 6 billing cycles
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60">
                  +18.4% vs last period
                </span>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={revenueHistory}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="instRevGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                    <YAxis
                      stroke="#94a3b8"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(val) => formatINRCompact(val)}
                    />
                    <Tooltip
                      formatter={(val: number) => [formatINR(val), 'Earnings']}
                      contentStyle={{
                        backgroundColor: '#0f172a',
                        borderRadius: '12px',
                        border: 'none',
                        color: '#fff',
                        fontSize: '12px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0d9488"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#instRevGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sub Performance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Avg Completion Rate</div>
                <div className="text-2xl font-black text-slate-900">78.4%</div>
                <div className="text-[11px] text-emerald-600 font-semibold">+8.2% vs industry avg</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Weekly Study Hours</div>
                <div className="text-2xl font-black text-slate-900">2,480 hrs</div>
                <div className="text-[11px] text-teal-600 font-semibold">Active student lab time</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Student Satisfaction</div>
                <div className="text-2xl font-black text-slate-900">98.2%</div>
                <div className="text-[11px] text-amber-600 font-semibold">Across 3,570 ratings</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1">
                <div className="text-xs text-slate-500 font-medium">Next Payout</div>
                <div className="text-xl sm:text-2xl font-black text-slate-900">{formatINR(345000)}</div>
                <div className="text-[11px] text-slate-400 font-medium">Direct UPI/NEFT to HDFC A/c Dec 1</div>
              </div>
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default InstructorDashboard;
