import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcherBanner } from '../../components/common/RoleSwitcherBanner';
import { RatingStars } from '../../components/common/RatingStars';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { CurriculumAccordion } from '../../components/course/CurriculumAccordion';
import { ReviewSection } from '../../components/course/ReviewSection';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { toggleWishlist } from '../../redux/slices/cartSlice';
import { enrollCourse } from '../../redux/slices/enrollmentSlice';
import {
  Clock,
  BookOpen,
  Heart,
  Award,
  Globe,
  Calendar,
  CheckCircle2,
  Play,
  Lock,
  Share2,
  ShieldCheck,
  Sparkles,
  CreditCard,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../../utils/formatCurrency';
import { UserAvatar } from '../../components/common/UserAvatar';
import { getYouTubeId } from '../../components/player/VideoPlayer';

export const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { courses } = useAppSelector((state) => state.courses);
  const { wishlist } = useAppSelector((state) => state.cart);
  const { enrolledCourses } = useAppSelector((state) => state.enrollment);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const course = courses.find((c) => c.id === id);

  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  if (!course) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <RoleSwitcherBanner />
        <Navbar />
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-2xl border text-center">
          <h2 className="text-xl font-bold text-slate-800">Course not found</h2>
          <p className="text-xs text-slate-500 mt-2">The course you requested does not exist or has been removed.</p>
          <Link to="/courses" className="mt-4 inline-block">
            <Button size="sm">Back to Catalog</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isWishlisted = wishlist.includes(course.id);
  const isEnrolled = !!enrolledCourses[course.id];
  const totalLectures = course.chapters.reduce((acc, c) => acc + c.lessons.length, 0);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setCheckoutModalOpen(true);
  };

  const handleConfirmEnrollment = () => {
    setCheckoutProcessing(true);
    setTimeout(() => {
      dispatch(enrollCourse({ courseId: course.id }));
      setCheckoutProcessing(false);
      setPaymentSuccess(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setCheckoutModalOpen(false);
        navigate(`/learn/${course.id}`);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <RoleSwitcherBanner />
      <Navbar />

      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-12 lg:py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {/* Category Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-semibold text-teal-400">
                <Link to="/courses" className="hover:underline">Courses</Link>
                <span>/</span>
                <span>{course.category}</span>
                <span>/</span>
                <span className="text-slate-400">{course.level}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {course.subtitle}
              </p>

              {/* Rating & Enrollment metrics */}
              <div className="flex flex-wrap items-center gap-4 text-xs pt-2">
                <RatingStars rating={course.rating} reviewsCount={course.reviewsCount} size={16} />
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 font-semibold">
                  {course.studentsCount.toLocaleString()} students enrolled
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <Calendar size={13} className="text-slate-400" /> Last updated {course.lastUpdated}
                </span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <Globe size={13} className="text-slate-400" /> {course.language}
                </span>
              </div>

              {/* Instructor link */}
              <div className="flex items-center gap-3 pt-3">
                <UserAvatar name={course.instructorName} role="instructor" size="md" showBadge={false} />
                <div>
                  <p className="text-xs text-slate-400">Created by</p>
                  <p className="text-sm font-bold text-white hover:text-teal-300 transition-colors">
                    {course.instructorName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout with Sticky Pricing Card on the right */}
      <section className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Main Course Body (Left 2 cols) */}
          <div className="lg:col-span-2 space-y-10">
            {/* What you will learn */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles size={20} className="text-teal-600" />
                What You Will Master in This Course
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {course.whatYouWillLearn.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content / Curriculum Accordion */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Curriculum & Lessons</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {course.chapters.length} sections • {totalLectures} lectures • {course.duration} total runtime
                  </p>
                </div>
              </div>

              <CurriculumAccordion
                chapters={course.chapters}
                isEnrolled={isEnrolled}
                onSelectLesson={(lesson) => {
                  if (lesson.isFreePreview || isEnrolled) {
                    setPreviewModalOpen(true);
                  }
                }}
              />
            </div>

            {/* Requirements & Description */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Prerequisites & Requirements</h3>
                <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm text-slate-600">
                  {course.requirements.map((req, i) => (
                    <li key={i}>{req}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Course Description</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Instructor Bio Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Meet Your Instructor</h3>
              <div className="flex flex-col sm:flex-row gap-5 items-start">
                <UserAvatar name={course.instructorName} role="instructor" size="xl" showBadge={true} />
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900">{course.instructorName}</h4>
                  <p className="text-xs font-semibold text-teal-600">{course.instructorTitle}</p>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.instructorBio}
                  </p>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-soft">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Student Feedback & Reviews</h3>
              <ReviewSection courseId={course.id} reviews={course.reviews} rating={course.rating} />
            </div>
          </div>

          {/* Sticky Checkout Card (Right Col) */}
          <div className="lg:col-span-1 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl p-6 space-y-6">
              {/* Promo Video Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-black group cursor-pointer" onClick={() => setPreviewModalOpen(true)}>
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white flex items-center justify-center pl-1 shadow-md shadow-teal-500/30 group-hover:scale-110 transition-transform">
                    <Play size={24} className="fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-2.5 inset-x-0 text-center">
                  <span className="text-[11px] font-bold text-white bg-black/60 px-2.5 py-1 rounded-full backdrop-blur-xs">
                    Watch Free Course Preview
                  </span>
                </div>
              </div>

              {/* Pricing section */}
              <div>
                {isEnrolled ? (
                  <div className="text-center py-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 mb-3">
                      <CheckCircle2 size={16} /> You are enrolled in this course
                    </span>
                    <Link to={`/learn/${course.id}`} className="block">
                      <Button variant="primary" size="lg" className="w-full">
                        Go to Classroom
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-2">
                      {course.isFree ? (
                        <span className="text-3xl font-black text-emerald-600">Free</span>
                      ) : (
                        <>
                          <span className="text-3xl font-black text-slate-900">
                            {formatINR(course.discountPrice || course.price)}
                          </span>
                          {course.discountPrice && (
                            <span className="text-base text-slate-400 line-through">
                              {formatINR(course.price)}
                            </span>
                          )}
                          {course.discountPrice && (
                            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                              Save {Math.round(((course.price - course.discountPrice) / course.price) * 100)}%
                            </span>
                          )}
                        </>
                      )}
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-full font-bold shadow-teal-500/20"
                      onClick={handleEnrollClick}
                    >
                      {course.isFree ? 'Enroll for Free' : 'Enroll Now'}
                    </Button>

                    <Button
                      variant="outline"
                      size="md"
                      className="w-full"
                      onClick={() => dispatch(toggleWishlist(course.id))}
                      leftIcon={<Heart size={16} className={isWishlisted ? 'fill-rose-500 text-rose-500' : ''} />}
                    >
                      {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
                    </Button>
                  </div>
                )}
              </div>

              {/* Guarantee badge */}
              <div className="text-center pt-2 border-t border-slate-100">
                <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  30-Day Money-Back Guarantee
                </p>
              </div>

              {/* Course Includes checklist */}
              <div className="space-y-2.5 text-xs text-slate-600 pt-2">
                <span className="font-bold text-slate-900 block">This course includes:</span>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-teal-600" />
                  <span>{course.duration} on-demand video</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen size={14} className="text-teal-600" />
                  <span>{totalLectures} interactive lectures & quizzes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={14} className="text-teal-600" />
                  <span>Accredited Certificate of Completion</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-teal-600" />
                  <span>Full lifetime access across devices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Preview Video Modal */}
      <Modal
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        title={`Preview: ${course.title}`}
        maxWidth="2xl"
      >
        <div className="aspect-video bg-black rounded-xl overflow-hidden shadow-2xl relative">
          {getYouTubeId(course.promoVideoUrl) ? (
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(course.promoVideoUrl)}?autoplay=1&rel=0&modestbranding=1`}
              title={`Preview: ${course.title}`}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <video
              src={course.promoVideoUrl || 'https://www.youtube.com/watch?v=bMknfKXIFA8'}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-slate-500">Free preview lecture</span>
          {!isEnrolled && (
            <Button size="sm" onClick={() => { setPreviewModalOpen(false); handleEnrollClick(); }}>
              Enroll in Full Course
            </Button>
          )}
        </div>
      </Modal>

      {/* Checkout / Enrollment Simulation Modal */}
      <Modal
        isOpen={checkoutModalOpen}
        onClose={() => { if (!checkoutProcessing) setCheckoutModalOpen(false); }}
        title="Complete Your Enrollment"
        maxWidth="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-12 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80';
              }}
            />
            <div className="min-w-0 flex-1">
              <h5 className="font-bold text-slate-900 text-xs truncate">{course.title}</h5>
              <p className="text-[11px] text-slate-500">Instructor: {course.instructorName}</p>
              <p className="text-xs font-bold text-teal-600 mt-0.5">
                ${course.discountPrice || course.price}
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Course Tuition:</span>
              <span>${course.price}</span>
            </div>
            {course.discountPrice && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Promotional Discount:</span>
                <span>-${(course.price - course.discountPrice).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-900 font-bold border-t pt-2 text-sm">
              <span>Total Due:</span>
              <span>${course.discountPrice || course.price}</span>
            </div>
          </div>

          <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200 text-xs text-teal-900 flex items-center gap-2">
            <CreditCard size={18} className="text-teal-600 shrink-0" />
            <span>Simulated instant checkout with 100% money-back guarantee.</span>
          </div>

          {paymentSuccess ? (
            <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-2">
              <Check size={18} className="text-emerald-600" />
              Enrollment Confirmed! Redirecting to classroom...
            </div>
          ) : (
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={checkoutProcessing}
              onClick={handleConfirmEnrollment}
            >
              Confirm Enrollment (${course.discountPrice || course.price})
            </Button>
          )}
        </div>
      </Modal>

      <Footer />
    </div>
  );
};

