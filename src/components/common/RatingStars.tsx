import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxStars?: number;
  size?: number;
  showScore?: boolean;
  reviewsCount?: number;
  className?: string;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxStars = 5,
  size = 16,
  showScore = true,
  reviewsCount,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      {showScore && (
        <span className="font-bold text-amber-500 text-sm">{rating.toFixed(1)}</span>
      )}
      <div className="flex items-center gap-0.5">
        {Array.from({ length: maxStars }).map((_, index) => {
          const fillPercent = Math.max(0, Math.min(1, rating - index));
          return (
            <div key={index} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="text-slate-200 fill-slate-200"
              />
              {fillPercent > 0 && (
                <div
                  className="absolute top-0 left-0 overflow-hidden"
                  style={{ width: `${fillPercent * 100}%` }}
                >
                  <Star
                    size={size}
                    className="text-amber-400 fill-amber-400 flex-shrink-0"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {reviewsCount !== undefined && (
        <span className="text-xs text-slate-500">
          ({reviewsCount.toLocaleString()})
        </span>
      )}
    </div>
  );
};
