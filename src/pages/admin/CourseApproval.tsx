import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { updateCourseStatus, deleteCourse } from '../../redux/slices/courseSlice';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RatingStars } from '../../components/common/RatingStars';
import { CourseStatus } from '../../types';
import { formatINR } from '../../utils/formatCurrency';
import {
  BookOpen,
  Search,
  CheckCircle2,
  XCircle,
  Eye,
  Trash2,
  Sparkles,
} from 'lucide-react';

export const CourseApproval: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | CourseStatus>('all');

  const filteredCourses = courses.filter((c) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const handleStatusChange = (courseId: string, status: CourseStatus) => {
    dispatch(updateCourseStatus({ courseId, status }));
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Course Quality & Approval</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Audit newly submitted courses, verify curriculum standards, and approve for public catalog.
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-soft">
          <div className="relative flex-1 max-w-sm w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search course title or instructor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold">{filteredCourses.length} courses</span>
        </div>

        {/* Courses Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 pl-6">Course</th>
                  <th className="py-3.5">Instructor</th>
                  <th className="py-3.5">Price</th>
                  <th className="py-3.5">Lectures</th>
                  <th className="py-3.5">Status</th>
                  <th className="py-3.5 pr-6 text-right">Approval Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <img src={c.thumbnail} alt={c.title} className="w-14 h-9 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{c.title}</p>
                          <span className="text-[10px] text-teal-600 font-semibold">{c.category} • {c.level}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-slate-700 font-medium">{c.instructorName}</td>
                    <td className="py-4 font-bold text-slate-900">{formatINR(c.discountPrice || c.price)}</td>
                    <td className="py-4 text-slate-600">{c.totalLessons} lectures</td>
                    <td className="py-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                          c.status === 'published'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 pr-6 text-right space-x-2">
                      <Link to={`/course/${c.id}`}>
                        <button className="p-1.5 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg">
                          <Eye size={15} />
                        </button>
                      </Link>

                      {c.status !== 'published' ? (
                        <button
                          onClick={() => handleStatusChange(c.id, 'published')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-emerald-700 bg-emerald-50 hover:bg-emerald-100 font-bold"
                        >
                          <CheckCircle2 size={13} /> Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusChange(c.id, 'draft')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-amber-700 bg-amber-50 hover:bg-amber-100 font-bold"
                        >
                          Unpublish
                        </button>
                      )}

                      <button
                        onClick={() => dispatch(deleteCourse(c.id))}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
                        title="Delete course"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

