import React, { useState, useEffect } from 'react';
import { Flame, Clock, Sparkles, Copy, Check } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function FlashBanner() {
  const { applyPromo } = useStore();
  const [copied, setCopied] = useState(false);

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard?.writeText('ARCUS20');
    applyPromo('ARCUS20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 text-white text-xs md:text-sm py-2 px-4 shadow-inner relative z-30">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-500/30 text-amber-300 animate-pulse">
            <Flame className="w-4 h-4 fill-amber-300" />
          </span>
          <span className="font-semibold tracking-wide">FLASH SALE:</span>
          <span className="hidden sm:inline text-brand-100">
            Up to 30% off Titanium & Carbon Gear + Free Global Express Shipping over $200
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 font-mono bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs border border-white/10">
            <Clock className="w-3.5 h-3.5 text-brand-300" />
            <span className="text-white font-bold">{pad(timeLeft.hours)}</span>:
            <span className="text-white font-bold">{pad(timeLeft.minutes)}</span>:
            <span className="text-amber-300 font-bold">{pad(timeLeft.seconds)}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 bg-white text-brand-900 hover:bg-brand-50 px-3 py-1 rounded-full font-semibold text-xs transition-all shadow-sm active:scale-95"
            title="Click to apply coupon code ARCUS20"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Code: <strong>ARCUS20</strong></span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
