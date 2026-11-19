import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppSelector } from '../../redux/store';
import { Button } from '../../components/common/Button';
import { BookOpen, Play, Award, CheckCircle2, Search } from 'lucide-react';

export const MyCourses: React.FC = () => {
  const { courses } = useAppSelector((state) => state.courses);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);

  const [activeTab, setActiveTab] = useState<'all' | 'in_progress' | 'completed'>('all');
  const [filterText, setFilterText] = useState('');

  const enrolledCourseIds = Object.keys(enrolledCourses);
  const myCourses = courses.filter((c) => enrolledCourseIds.includes(c.id));

  const filteredCourses = myCourses.filter((course) => {
    const enrollment = enrolledCourses[course.id];
    if (activeTab === 'in_progress' && enrollment.isCompleted) return false;
    if (activeTab === 'completed' && !enrollment.isCompleted) return false;
    if (filterText && !course.title.toLowerCase().includes(filterText.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">My Learning</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Track your enrolled courses, resume lessons, and download earned certificates.
            </p>
          </div>

          <Link to="/courses">
            <Button size="sm" variant="outline" leftIcon={<Search size={14} />}>
              Explore More Courses
            </Button>
          </Link>
        </div>

        {/* Tab Filters and Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-slate-200">
          <div className="flex items-center gap-1.5 overflow-x-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              All Courses ({myCourses.length})
            </button>
            <button
              onClick={() => setActiveTab('in_progress')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'in_progress'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              In Progress ({myCourses.filter((c) => !enrolledCourses[c.id]?.isCompleted).length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'completed'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-500 text-white shadow-sm shadow-teal-500/25'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              Completed ({myCourses.filter((c) => enrolledCourses[c.id]?.isCompleted).length})
            </button>
          </div>

          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter my courses..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-1.5 text-xs w-full sm:w-56 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Course Cards List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
            <BookOpen size={40} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">No matching courses found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your tab or search filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => {
              const enrollment = enrolledCourses[course.id];
              const isCompleted = enrollment?.isCompleted;
              const progress = enrollment?.progressPercent || 0;

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-soft hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-video w-full bg-slate-100">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-emerald-600 px-2.5 py-1 rounded-full shadow-md">
                            <CheckCircle2 size={13} /> Completed
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-500 px-2.5 py-1 rounded-full shadow-md shadow-teal-500/25">
                            {progress}% Done
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider">
                        {course.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-base mt-1 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Instructor: {course.instructorName}
                      </p>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                          <span>Progress</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isCompleted ? 'bg-emerald-500' : 'bg-gradient-to-r from-teal-600 to-emerald-500'
                            }`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1.5">
                          {enrollment.completedLessons.length} of {course.totalLessons} lessons completed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-4 flex items-center gap-2">
                    <Link to={`/learn/${course.id}`} className="flex-1">
                      <Button
                        size="sm"
                        variant={isCompleted ? 'outline' : 'primary'}
                        className="w-full"
                        leftIcon={<Play size={14} />}
                      >
                        {isCompleted ? 'Review Course' : 'Continue'}
                      </Button>
                    </Link>

                    {isCompleted && (
                      <Link to="/certificates">
                        <Button
                          size="sm"
                          variant="primary"
                          className="bg-amber-600 hover:bg-amber-700 shadow-amber-200"
                          leftIcon={<Award size={14} />}
                        >
                          Certificate
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

