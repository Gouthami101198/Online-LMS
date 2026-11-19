import React from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppSelector } from '../../redux/store';
import { StatCard } from '../../components/common/StatCard';
import {
  TrendingUp,
  Award,
  Users,
  Clock,
  CheckCircle,
  HelpCircle,
  BarChart2,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

export const CourseAnalytics: React.FC = () => {
  const { revenueHistory } = useAppSelector((state) => state.admin);

  const engagementData = [
    { name: 'Mon', activeUsers: 480, completionMins: 32 },
    { name: 'Tue', activeUsers: 620, completionMins: 45 },
    { name: 'Wed', activeUsers: 790, completionMins: 58 },
    { name: 'Thu', activeUsers: 710, completionMins: 52 },
    { name: 'Fri', activeUsers: 540, completionMins: 40 },
    { name: 'Sat', activeUsers: 890, completionMins: 68 },
    { name: 'Sun', activeUsers: 950, completionMins: 74 },
  ];

  const quizPerformanceData = [
    { name: 'Passed First Attempt', value: 74, color: '#10b981' },
    { name: 'Passed on Retake', value: 19, color: '#6366f1' },
    { name: 'Needs Review', value: 7, color: '#f43f5e' },
  ];

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Analytics & Course Insights</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Deep dive into student engagement, retention rates, and exam success scores.
          </p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          <StatCard
            title="Avg Completion Rate"
            value="68.4"
            unit="%"
            change="+5.1%"
            isPositive={true}
            subtitle="Industry avg: 45%"
            icon={<CheckCircle size={18} />}
            iconColor="bg-emerald-50 text-emerald-700 border border-emerald-200/60"
          />
          <StatCard
            title="Weekly Active Students"
            value="4,980"
            change="+12.4%"
            isPositive={true}
            subtitle="Engaging in video & labs"
            icon={<Users size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
          <StatCard
            title="Avg Quiz Score"
            value="91.2"
            unit="%"
            subtitle="Across 3,240 quizzes"
            icon={<HelpCircle size={18} />}
            iconColor="bg-amber-50 text-amber-700 border border-amber-200/60"
          />
          <StatCard
            title="Avg Study Duration"
            value="52"
            unit="mins"
            change="+8m"
            isPositive={true}
            subtitle="Per student session"
            icon={<Clock size={18} />}
            iconColor="bg-teal-50 text-teal-700 border border-teal-200/60"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Daily Active Students & Study Mins */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart2 size={18} className="text-teal-600" />
                  Daily Student Engagement
                </h3>
                <p className="text-xs text-slate-500">Active students watching lectures throughout the week</p>
              </div>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={engagementData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                  <Bar dataKey="activeUsers" fill="#0d9488" radius={[6, 6, 0, 0]} name="Active Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quiz Pass Rate Pie */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-4">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Quiz & Exam Success Rate</h3>
              <p className="text-xs text-slate-500">First attempt vs retry outcomes</p>
            </div>

            <div className="h-56 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={quizPerformanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {quizPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: number) => [`${val}%`, 'Students']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              {quizPerformanceData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

