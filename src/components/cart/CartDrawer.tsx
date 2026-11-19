import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { removeFromCart, clearCart } from '../../redux/slices/cartSlice';
import { enrollCourse } from '../../redux/slices/enrollmentSlice';
import { Button } from '../common/Button';
import { X, ShoppingBag, Trash2, Tag, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatINR } from '../../utils/formatCurrency';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const { courses } = useAppSelector((state) => state.courses);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  if (!isOpen) return null;

  const cartCourses = courses.filter((c) => cart.includes(c.id));

  const subtotal = cartCourses.reduce(
    (acc, c) => acc + (c.discountPrice || c.price),
    0
  );
  const discountAmount = promoApplied ? (subtotal * discountPercent) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'EDUPATH50') {
      setDiscountPercent(50);
      setPromoApplied(true);
      setPromoError('');
    } else if (code === 'LEARN25') {
      setDiscountPercent(25);
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try "EDUPATH50" or "LEARN25"');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      // Enroll in all cart courses
      cartCourses.forEach((c) => {
        dispatch(enrollCourse({ courseId: c.id }));
      });
      dispatch(clearCart());
      setIsCheckingOut(false);
      onClose();
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });
      navigate('/my-learning');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-teal-600" />
            <h3 className="font-extrabold text-slate-900 text-base">Shopping Cart</h3>
            <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full font-bold">
              {cartCourses.length} {cartCourses.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cartCourses.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingBag size={48} className="mx-auto text-slate-300 stroke-[1.5]" />
              <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our catalog to find industry-leading courses and begin your learning path.
              </p>
              <Button size="sm" variant="outline" onClick={() => { onClose(); navigate('/courses'); }}>
                Browse Catalog
              </Button>
            </div>
          ) : (
            cartCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3.5 p-3.5 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors"
              >
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-16 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs text-slate-900 truncate">
                    {course.title}
                  </h5>
                  <p className="text-[11px] text-slate-500">By {course.instructorName}</p>
                  <span className="font-bold text-xs text-slate-900 mt-1 inline-block">
                    {formatINR(course.discountPrice || course.price)}
                  </span>
                </div>

                <button
                  onClick={() => dispatch(removeFromCart(course.id))}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove from cart"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cartCourses.length > 0 && (
          <div className="p-5 border-t border-slate-100 bg-white space-y-4 shadow-lg">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromo} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. EDUPATH50)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                    className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl uppercase font-mono tracking-wider focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <Button
                  type="submit"
                  size="sm"
                  variant={promoApplied ? 'success' : 'outline'}
                  disabled={promoApplied || !promoCode.trim()}
                  leftIcon={promoApplied ? <Check size={14} /> : undefined}
                >
                  {promoApplied ? 'Applied' : 'Apply'}
                </Button>
              </div>
              {promoError && <p className="text-[11px] text-rose-500">{promoError}</p>}
              {promoApplied && (
                <p className="text-[11px] text-emerald-600 font-semibold">
                  Coupon active: {discountPercent}% discount applied!
                </p>
              )}
            </form>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600 pt-1">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-800">{formatINR(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({discountPercent}%):</span>
                  <span>-{formatINR(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-extrabold text-slate-900 border-t pt-2">
                <span>Total Due:</span>
                <span>{formatINR(finalTotal)}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <Button
              variant="primary"
              size="lg"
              className="w-full font-bold shadow-teal-500/20"
              isLoading={isCheckingOut}
              onClick={handleCheckout}
              rightIcon={<ArrowRight size={16} />}
            >
              Pay via UPI / Cards ({formatINR(finalTotal)})
            </Button>

            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" />
              30-Day Money-Back Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

