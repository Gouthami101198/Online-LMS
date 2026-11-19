import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor?: string;
  sparkline?: boolean;
}

const AnimatedNumber: React.FC<{ value: string | number }> = ({ value }) => {
  const [display, setDisplay] = useState<string | number>(value);

  useEffect(() => {
    const str = String(value);
    const match = str.match(/[\d,]+(?:\.\d+)?/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const rawNumStr = match[0].replace(/,/g, '');
    const targetNum = parseFloat(rawNumStr);
    if (isNaN(targetNum) || targetNum === 0) {
      setDisplay(value);
      return;
    }

    const isDecimal = rawNumStr.includes('.');
    const duration = 750;
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = targetNum * ease;

      let formatted: string;
      if (isDecimal) {
        formatted = current.toFixed(1);
      } else {
        formatted = Math.floor(current).toLocaleString('en-IN');
      }

      setDisplay(str.replace(match[0], formatted));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setDisplay(value);
      }
    };

    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [value]);

  return <span>{display}</span>;
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  change,
  isPositive = true,
  subtitle,
  icon,
  iconColor = 'bg-teal-50 text-teal-700 border border-teal-200/60',
}) => {
  // If unit wasn't passed explicitly, auto-split units like "42.5 hrs" or "52 mins"
  let displayValue: string | number = value;
  let displayUnit: string | undefined = unit;

  if (typeof value === 'string' && !unit) {
    const trimmed = value.trim();
    // match number part (including currency or decimals) and alpha unit part
    const match = trimmed.match(/^([\$\d\.,₹]+)\s*([a-zA-Z%\/]+.*)$/);
    if (match) {
      displayValue = match[1];
      displayUnit = match[2];
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -4,
        scale: 1.015,
        boxShadow:
          '0 16px 30px -10px rgba(13, 148, 136, 0.16), 0 4px 6px -2px rgba(0, 0, 0, 0.04), inset 0 1px 0 0 rgba(255, 255, 255, 0.95)',
      }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:border-teal-300 transition-colors duration-300 flex flex-col justify-between min-h-[125px] group overflow-hidden cursor-default transform-gpu"
      style={{
        boxShadow:
          '0 2px 4px -1px rgba(0, 0, 0, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
      }}
    >
      {/* 3D Top Glossy Accent Bar on Hover */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal-500 via-emerald-400 to-teal-600 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* 3D Glossy Light Sweep Animation on Hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Subtle Ambient Radial Highlight on Card Background */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-teal-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-teal-500/10 transition-colors" />

      {/* Top Header: Title & 3D Icon Box */}
      <div className="flex items-start justify-between gap-2 relative z-10">
        <span className="text-xs font-semibold text-slate-500 tracking-wide line-clamp-1 group-hover:text-slate-700 transition-colors">
          {title}
        </span>
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-2xs ${iconColor} relative overflow-hidden`}
          style={{
            boxShadow:
              'inset 0 1px 1px 0 rgba(255, 255, 255, 0.6), 0 2px 4px -1px rgba(13, 148, 136, 0.12)',
          }}
        >
          {/* Subtle glossy sheen */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none" />
          <span className="relative z-10">{icon}</span>
        </div>
      </div>

      {/* Middle: Value, Unit & Trend Badge */}
      <div className="mt-2 flex items-baseline justify-between gap-2 relative z-10">
        <div className="flex items-baseline whitespace-nowrap overflow-hidden">
          <span className="text-2xl font-black text-slate-900 tracking-tight leading-none truncate group-hover:text-teal-950 transition-colors">
            <AnimatedNumber value={displayValue} />
          </span>
          {displayUnit && (
            <span className="text-xs font-bold text-slate-500 ml-1 leading-none">
              {displayUnit}
            </span>
          )}
        </div>

        {change && (
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 shadow-2xs border transition-transform duration-300 group-hover:scale-105 ${
              isPositive
                ? 'text-emerald-700 bg-emerald-50/90 border-emerald-200/80 shadow-emerald-500/10'
                : 'text-rose-700 bg-rose-50/90 border-rose-200/80'
            }`}
          >
            {isPositive ? (
              <ArrowUpRight size={12} className="mr-0.5 stroke-[2.5]" />
            ) : (
              <ArrowDownRight size={12} className="mr-0.5 stroke-[2.5]" />
            )}
            {change}
          </span>
        )}
      </div>

      {/* Bottom: Subtitle / Context with micro-bar */}
      {subtitle ? (
        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium relative z-10">
          <span className="line-clamp-1">{subtitle}</span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
          </span>
        </div>
      ) : (
        <div className="mt-1 h-3" />
      )}
    </motion.div>
  );
};

export default StatCard;
