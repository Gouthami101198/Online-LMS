import React from 'react';
import { Link } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleWishlist } from '../../redux/slices/cartSlice';
import { enrollCourse } from '../../redux/slices/enrollmentSlice';
import { Button } from '../../components/common/Button';
import { RatingStars } from '../../components/common/RatingStars';
import { formatINR } from '../../utils/formatCurrency';
import { Heart, Trash2, BookOpen, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { wishlist } = useAppSelector((state) => state.cart);
  const { courses } = useAppSelector((state) => state.courses);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);

  const wishlistedCourses = courses.filter((c) => wishlist.includes(c.id));

  const handleEnroll = (courseId: string) => {
    dispatch(enrollCourse({ courseId }));
    dispatch(toggleWishlist(courseId));
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Saved Wishlist</h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Courses you have saved to learn later. Enroll whenever you are ready!
            </p>
          </div>

          <Link to="/courses">
            <Button size="sm" variant="outline">
              Browse More Courses
            </Button>
          </Link>
        </div>

        {wishlistedCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-dashed border-slate-200">
            <Heart size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="font-bold text-slate-800 text-base">Your wishlist is currently empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Save courses by clicking the heart icon on any course card while exploring.
            </p>
            <Link to="/courses" className="mt-4 inline-block">
              <Button size="sm">Explore Catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {wishlistedCourses.map((course) => {
              const isEnrolled = !!enrolledCourses[course.id];

              return (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-soft flex flex-col sm:flex-row items-center gap-5 justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-24 h-16 sm:w-32 sm:h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[11px] font-bold text-teal-600 uppercase">
                        {course.category}
                      </span>
                      <Link to={`/course/${course.id}`}>
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base hover:text-teal-600 line-clamp-1 transition-colors">
                          {course.title}
                        </h4>
                      </Link>
                      <p className="text-xs text-slate-500">By {course.instructorName}</p>
                      <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} size={13} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      {course.discountPrice ? (
                        <div>
                          <span className="text-lg font-black text-slate-900">{formatINR(course.discountPrice)}</span>
                          <span className="text-xs text-slate-400 line-through ml-1.5">{formatINR(course.price)}</span>
                        </div>
                      ) : (
                        <span className="text-lg font-black text-slate-900">{formatINR(course.price)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {isEnrolled ? (
                        <Link to={`/learn/${course.id}`}>
                          <Button size="sm" variant="outline" rightIcon={<ArrowRight size={14} />}>
                            Resume
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          size="sm"
                          variant="primary"
                          onClick={() => handleEnroll(course.id)}
                          leftIcon={<ShoppingBag size={14} />}
                        >
                          Enroll Now
                        </Button>
                      )}

                      <button
                        onClick={() => dispatch(toggleWishlist(course.id))}
                        className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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

