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
    <div className="bg-gradient-to-r from-brand-900 via-brand-700 to-brand-900 text-white text-[11px] sm:text-xs py-1.5 px-3 shadow-inner relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 truncate">
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-brand-500/30 text-amber-300 shrink-0 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-amber-300" />
          </span>
          <span className="font-bold tracking-wide shrink-0">FLASH SALE:</span>
          <span className="hidden sm:inline text-brand-100 truncate">
            Up to 30% off Titanium & Carbon Gear + Free Express Delivery over $200
          </span>
          <span className="sm:hidden text-brand-100 truncate">
            30% OFF Today
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-1 font-mono bg-black/30 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] sm:text-xs border border-white/10">
            <Clock className="w-3 h-3 text-brand-300 hidden xs:inline" />
            <span className="text-white font-bold">{pad(timeLeft.hours)}</span>:
            <span className="text-white font-bold">{pad(timeLeft.minutes)}</span>:
            <span className="text-amber-300 font-bold">{pad(timeLeft.seconds)}</span>
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1 bg-white text-brand-900 hover:bg-brand-50 px-2 sm:px-2.5 py-0.5 rounded-full font-bold text-[10px] sm:text-xs transition-all shadow-sm active:scale-95"
            title="Click to apply coupon code ARCUS20"
          >
            <Sparkles className="w-3 h-3 text-brand-600" />
            <span>ARCUS20</span>
            {copied ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
