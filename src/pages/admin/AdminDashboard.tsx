import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { StatCard } from '../../components/common/StatCard';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { formatINR, formatINRCompact } from '../../utils/formatCurrency';
import { useAppSelector } from '../../redux/store';
import {
  DollarSign,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowRight,
  PieChart as PieIcon,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { users } = useAppSelector((state) => state.auth);
  const { courses } = useAppSelector((state) => state.courses);
  const { revenueHistory, categoryDistribution, platformCommissionPercent } = useAppSelector(
    (state) => state.admin
  );

  const studentsCount = users.filter((u) => u.role === 'student').length;
  const instructorsCount = users.filter((u) => u.role === 'instructor').length;
  const totalRevenue = revenueHistory.reduce((acc, r) => acc + r.revenue, 0);
  const totalStudentsEnrolled = courses.reduce((acc, c) => acc + c.studentsCount, 0);

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8 max-w-7xl mx-auto w-full">
        {/* Header with Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              System Governance
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1.5">
              Admin Operations Center
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Comprehensive platform supervision, financial settlements (₹ INR), and user management.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/admin/courses">
                <Button size="sm" variant="outline" className="text-sm font-semibold shadow-xs">
                  Review Courses
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/admin/reports">
                <Button size="sm" variant="primary" className="text-sm font-semibold shadow-md shadow-teal-600/20">
                  System Reports
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* 4 Primary Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Total Platform GMV"
            value={formatINR(totalRevenue * 10)}
            change="+28.4%"
            isPositive={true}
            subtitle={`Platform fee: ${platformCommissionPercent}%`}
            icon={<TrendingUp size={18} />}
            iconColor="bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          />
          <StatCard
            title="Active Learners"
            value={totalStudentsEnrolled.toLocaleString()}
            change="+1.8k mo"
            isPositive={true}
            subtitle={`${studentsCount} registered profiles`}
            icon={<Users size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Live Courses"
            value={courses.length}
            subtitle="Across 8 categories"
            icon={<BookOpen size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Verified Instructors"
            value={instructorsCount}
            subtitle="100% credential verified"
            icon={<ShieldCheck size={18} />}
            iconColor="bg-amber-50 text-amber-700 border border-amber-200/60"
          />
        </div>

        {/* Revenue Trends & Category Share */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Area Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            whileHover={{ y: -3 }}
            className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 space-y-3 group relative overflow-hidden"
            style={{
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp size={18} className="text-emerald-600" />
                  Monthly Gross Revenue & Enrollment Growth
                </h3>
                <p className="text-xs text-slate-500">6-Month financial trajectory in Indian Rupees (₹)</p>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/70">
                +28.4% YoY
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueHistory} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminColorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} tickFormatter={(val) => formatINRCompact(val * 10)} />
                  <Tooltip
                    formatter={(val: number) => [formatINR(val * 10), 'Gross Revenue']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#adminColorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Distribution Pie */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            whileHover={{ y: -3 }}
            className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 space-y-4 group relative overflow-hidden flex flex-col justify-between"
            style={{
              boxShadow:
                '0 4px 6px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
            }}
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-400 via-teal-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div>
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <PieIcon size={17} className="text-teal-600" />
                    Revenue by Subject
                  </h3>
                  <p className="text-xs text-slate-500">Curricula volume share</p>
                </div>
              </div>

              <div className="h-52 w-full flex items-center justify-center pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(val: number) => [`${val}%`, 'Share']}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100 text-xs">
              {categoryDistribution.slice(0, 4).map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600 font-medium">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick User Approvals & System Status Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/80 shadow-xs space-y-4"
          style={{
            boxShadow:
              '0 4px 6px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
          }}
        >
          <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={19} className="text-teal-600" />
                Recent User Accounts & System Governance
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Quickly monitor user compliance, Indian cohort registrations, and access privileges
              </p>
            </div>
            <Link to="/admin/users" className="text-xs font-bold text-teal-600 hover:underline flex items-center gap-1">
              <span>Manage all accounts</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                  <th className="pb-3 pl-2">Name & Email</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 pr-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.slice(0, 5).map((user) => (
                  <tr key={user.id} className="hover:bg-teal-50/40 transition-colors group">
                    <td className="py-3 pl-2">
                      <div className="flex items-center gap-3">
                        <UserAvatar name={user.name} role={user.role} size="sm" showBadge={false} />
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-teal-900 transition-colors">{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 font-bold uppercase text-xs">
                      <span className={`px-2 py-0.5 rounded-full border ${
                        user.role === 'admin'
                          ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                          : user.role === 'instructor'
                          ? 'bg-teal-50 text-teal-700 border border-teal-200/60'
                          : 'bg-slate-50 text-slate-700 border-slate-200/60'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 text-slate-500 font-mono text-xs">{user.joinedDate}</td>
                    <td className="py-3">
                      <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-right">
                      <Link to="/admin/users" className="text-teal-600 hover:text-teal-800 font-bold hover:underline">
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};


