import React, { useState } from 'react';
import { Review } from '../../types';
import { RatingStars } from '../common/RatingStars';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addReview } from '../../redux/slices/courseSlice';
import { ThumbsUp, Star, CheckCircle, MessageSquare } from 'lucide-react';
import { UserAvatar } from '../common/UserAvatar';

interface ReviewSectionProps {
  courseId: string;
  reviews: Review[];
  rating: number;
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({ courseId, reviews, rating }) => {
  const dispatch = useAppDispatch();
  const { currentUser, isAuthenticated } = useAppSelector((state) => state.auth);

  const [ratingScore, setRatingScore] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Rating distribution calculations
  const totalReviews = reviews.length;
  const ratingCounts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(r.rating)));
    ratingCounts[star] = (ratingCounts[star] || 0) + 1;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      userName: currentUser?.name || 'Student Learner',
      userAvatar:
        currentUser?.avatar ||
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      rating: ratingScore,
      comment: comment.trim(),
      date: 'Just now',
      likes: 0,
    };

    dispatch(addReview({ courseId, review: newRev }));
    setComment('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8">
      {/* Rating Overview */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="text-center md:border-r border-slate-200/80 md:pr-6">
          <div className="text-5xl font-black text-slate-900 tracking-tight">{rating.toFixed(1)}</div>
          <div className="my-2 flex justify-center">
            <RatingStars rating={rating} size={18} showScore={false} />
          </div>
          <p className="text-xs text-slate-500 font-medium">Course Rating • {totalReviews} reviews</p>
        </div>

        {/* Breakdown bars */}
        <div className="md:col-span-2 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3 text-xs">
                <span className="w-12 font-semibold text-slate-600 flex items-center gap-1">
                  {stars} <Star size={12} className="text-amber-400 fill-amber-400 inline" />
                </span>
                <div className="flex-1 h-2.5 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right text-slate-400 font-medium">{Math.round(percentage)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Review Form */}
      {isAuthenticated ? (
        <form onSubmit={handleSubmitReview} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-soft">
          <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
            <MessageSquare size={18} className="text-teal-600" />
            Leave a Course Review
          </h4>
          <p className="text-xs text-slate-500 mb-4">
            Share your learning experience and feedback with other students and the instructor.
          </p>

          {/* Star selector */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold text-slate-700">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRatingScore(star)}
                  className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                >
                  <Star
                    size={22}
                    className={
                      star <= ratingScore ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'
                    }
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-600 ml-2">{ratingScore} of 5 Stars</span>
          </div>

          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your honest review here... What did you enjoy most about this course?"
            className="w-full p-3.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white resize-none"
            required
          />

          <div className="mt-3 flex items-center justify-between">
            {submitted ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle size={15} /> Thank you! Your review was published.
              </span>
            ) : <span />}
            <Button type="submit" size="sm" variant="primary">
              Post Review
            </Button>
          </div>
        </form>
      ) : null}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            No reviews yet for this course. Be the first to leave one!
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserAvatar name={rev.userName} role="student" size="sm" showBadge={false} />
                  <div>
                    <h5 className="text-sm font-bold text-slate-900">{rev.userName}</h5>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={rev.rating} size={12} showScore={false} />
                      <span className="text-[11px] text-slate-400">• {rev.date}</span>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed pl-12">
                {rev.comment}
              </p>

              <div className="pl-12 pt-1 flex items-center gap-3 text-xs text-slate-400">
                <button className="flex items-center gap-1 hover:text-slate-600 transition-colors">
                  <ThumbsUp size={13} />
                  Helpful ({rev.likes})
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

