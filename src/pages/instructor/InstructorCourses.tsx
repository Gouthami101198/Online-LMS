import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { deleteCourse, updateCourseStatus } from '../../redux/slices/courseSlice';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { RatingStars } from '../../components/common/RatingStars';
import { CourseStatus } from '../../types';
import { formatINR } from '../../utils/formatCurrency';
import {
  PlusCircle,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  Edit,
  Clock,
  BookOpen,
  Users,
  CheckCircle,
} from 'lucide-react';

export const InstructorCourses: React.FC = () => {
  const dispatch = useAppDispatch();
  const { courses } = useAppSelector((state) => state.courses);
  const { currentUser } = useAppSelector((state) => state.auth);

  const [search, setSearch] = useState('');
  const [deleteModalId, setDeleteModalId] = useState<string | null>(null);

  const instructorCourses = courses.filter((c) => {
    const isOwner = c.instructorId === currentUser?.id || c.instructorName === currentUser?.name;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return isOwner && matchesSearch;
  });

  const handleDelete = (id: string) => {
    dispatch(deleteCourse(id));
    setDeleteModalId(null);
  };

  return (
    <DashboardLayout role="instructor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Course Management</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Create, update, organize curriculum, and manage pricing for your courses.
            </p>
          </div>

          <Link to="/instructor/create-course">
            <Button size="sm" variant="primary" leftIcon={<PlusCircle size={15} />}>
              Create Course
            </Button>
          </Link>
        </div>

        {/* Filter bar */}
        <div className="flex items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search your courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <span className="text-xs text-slate-400 font-semibold">{instructorCourses.length} courses total</span>
        </div>

        {/* Course Cards / Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {instructorCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-video w-full bg-slate-100">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3">
                    <Badge variant="primary" size="sm" className="bg-white/95">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${course.status === 'published'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-amber-500 text-white shadow-sm'
                        }`}
                    >
                      {course.status}
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="font-bold text-slate-900 text-base line-clamp-2">
                    {course.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                    <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} size={13} />
                    <span className="font-semibold text-slate-700">{course.studentsCount.toLocaleString()} enrolled</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <Clock size={13} /> {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={13} /> {course.totalLessons} lessons
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                <span className="text-base font-extrabold text-slate-900">
                  {formatINR(course.discountPrice || course.price)}
                </span>

                <div className="flex items-center gap-2">
                  <Link to={`/course/${course.id}`}>
                    <Button size="sm" variant="outline" leftIcon={<Eye size={13} />}>
                      View
                    </Button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Delete course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

