import React, { useState } from 'react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppSelector } from '../../redux/store';
import { Button } from '../../components/common/Button';
import { UserAvatar } from '../../components/common/UserAvatar';
import { Users, Search, Mail, CheckCircle2, Clock } from 'lucide-react';

export const InstructorStudents: React.FC = () => {
  const { users } = useAppSelector((state) => state.auth);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);
  const { courses } = useAppSelector((state) => state.courses);

  const [search, setSearch] = useState('');
  const [selectedCourseFilter, setSelectedCourseFilter] = useState('all');

  const students = users.filter((u) => u.role === 'student');

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    return matchesSearch;
  });

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Enrolled Students</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Monitor student completion, quiz attempts, and learning milestones.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="relative flex-1 max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by student name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold">{filteredStudents.length} enrolled students</span>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pl-6">Student</th>
                  <th className="py-3.5">Enrolled Course</th>
                  <th className="py-3.5">Progress</th>
                  <th className="py-3.5">Enrolled Date</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((s, idx) => {
                  const progress = idx === 0 ? 100 : idx === 1 ? 50 : 25;
                  const courseTitle = idx === 0
                    ? 'React 18 & TypeScript Mastery'
                    : idx === 1
                      ? 'Modern UI/UX Design Systems'
                      : 'Generative AI & Machine Learning';

                  return (
                    <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 pl-6">
                        <div className="flex items-center gap-3">
                          <UserAvatar name={s.name} role="student" size="sm" showBadge={false} />
                          <div>
                            <p className="font-bold text-slate-900">{s.name}</p>
                            <p className="text-[11px] text-slate-400">{s.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-slate-700 font-medium">{courseTitle}</td>
                      <td className="py-4">
                        <div className="w-28 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold text-slate-700">
                            <span>{progress}%</span>
                            {progress === 100 && <span className="text-emerald-600">Done</span>}
                          </div>
                          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-teal-600 to-emerald-500'
                                }`}
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-slate-500 font-mono text-[11px]">{s.joinedDate}</td>
                      <td className="py-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                          Active Learner
                        </span>
                      </td>
                      <td className="py-4 pr-6 text-right">
                        <a
                          href={`mailto:${s.email}`}
                          className="inline-flex items-center gap-1.5 text-teal-700 hover:text-teal-900 font-bold bg-teal-50 hover:bg-teal-100 px-3 py-1.5 rounded-lg transition-colors"
                        >
                          <Mail size={13} /> Contact
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

