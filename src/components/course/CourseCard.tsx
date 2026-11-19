import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Badge } from '../common/Badge';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleWishlist } from '../../redux/slices/cartSlice';
import { Clock, BookOpen, Heart, CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatINR } from '../../utils/formatCurrency';
import { UserAvatar } from '../common/UserAvatar';

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { wishlist } = useAppSelector((state) => state.cart);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);

  const isWishlisted = wishlist.includes(course.id);
  const enrollment = enrolledCourses[course.id];
  const isEnrolled = !!enrollment;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(course.id));
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-soft hover:shadow-xl hover:border-teal-200 flex flex-col group transition-all"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />

        {/* Category & Featured Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant="primary" size="sm" className="bg-white/95 text-teal-800 backdrop-blur-xs shadow-xs border border-teal-200/60 font-bold">
            {course.category}
          </Badge>
          {course.isFeatured && (
            <Badge variant="warning" size="sm" className="bg-amber-500 text-white border-none shadow-xs">
              <Sparkles size={11} className="mr-0.5 inline" /> Featured
            </Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-500 shadow-xs'
          }`}
        >
          <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
        </button>

        {/* Level pill */}
        <div className="absolute bottom-2.5 right-3">
          <span className="text-[11px] font-semibold text-white/90 bg-slate-900/75 px-2 py-0.5 rounded-md backdrop-blur-xs">
            {course.level}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & reviews */}
          <div className="flex items-center justify-between mb-2">
            <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} size={14} />
            <span className="text-xs text-slate-400 font-medium">{course.studentsCount.toLocaleString()} students</span>
          </div>

          {/* Title */}
          <Link to={`/course/${course.id}`}>
            <h3 className="font-bold text-slate-900 text-base line-clamp-2 group-hover:text-teal-600 transition-colors leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Subtitle / Description excerpt */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 leading-relaxed">
            {course.subtitle}
          </p>

          {/* Instructor line */}
          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
            <UserAvatar name={course.instructorName} role="instructor" size="xs" showBadge={false} />
            <span className="text-xs text-slate-600 font-semibold truncate">
              {course.instructorName}
            </span>
          </div>
        </div>

        {/* Meta & Pricing Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen size={13} className="text-slate-400" />
              {course.totalLessons} lessons
            </span>
          </div>

          <div className="text-right">
            {isEnrolled ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                <CheckCircle2 size={13} /> Enrolled ({enrollment.progressPercent}%)
              </span>
            ) : course.isFree ? (
              <span className="text-base font-extrabold text-emerald-600">Free</span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                {course.discountPrice ? (
                  <>
                    <span className="text-base font-extrabold text-slate-900">
                      {formatINR(course.discountPrice)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatINR(course.price)}
                    </span>
                  </>
                ) : (
                  <span className="text-base font-extrabold text-slate-900">
                    {formatINR(course.price)}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

