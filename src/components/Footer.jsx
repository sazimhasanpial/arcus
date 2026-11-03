import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Mail,
  Check,
  ChevronUp,
  MapPin,
  Clock,
  Headphones,
  Zap,
  Lock
} from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, showToast, setIsAccountOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed! Welcome voucher ARCUS20 unlocked 🎉');
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50/50 to-slate-100/70 dark:from-slate-950 dark:via-slate-950/80 dark:to-black mt-16 transition-colors overflow-hidden">
      {/* 🌟 1. Core Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">Pathao Priority</div>
              <div className="text-slate-500 text-[11px]">24-48h Dhaka delivery</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">2-Year Warranty</div>
              <div className="text-slate-500 text-[11px]">Official replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">30-Day Returns</div>
              <div className="text-slate-500 text-[11px]">Doorstep return pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-xs">24/7 AI Concierge</div>
              <div className="text-slate-500 text-[11px]">Direct admin notify</div>
            </div>
          </div>
        </div>
      </div>

      {/* 🌟 2. Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Info & Newsletter (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-4 h-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-0.5">
                  <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-400 dark:to-white bg-clip-text text-transparent font-sans leading-none">
                    SaaZ
                  </span>
                  <span className="text-[10px] font-extrabold text-brand-600 dark:text-brand-400 -mt-2">
                    ™
                  </span>
                </div>
                <span className="text-[8px] font-extrabold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 mt-0.5">
                  BY SAZIM HASAN PIAL
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Precision acoustic architecture, aerospace titanium hardware, and minimal lifestyle gear by SaaZ.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-1 max-w-sm">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for ARCUS20 discount..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1 shadow-md transition-all active:scale-95"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <span>Join</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Collections (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Collections
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setSelectedCategory('Electronics')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Acoustics & Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Electronics')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Titanium Smartwatches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Apparel')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Aerogel Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Accessories')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Carbon Gear
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care (2.5 cols) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-brand-500 transition-colors"
                >
                  Pathao Package Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-brand-500 transition-colors"
                >
                  VIP Membership Hub
                </button>
              </li>
              <li>
                <span className="text-slate-400">
                  Mushak-6.3 Tax Invoices
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  Banani Flagship Center
                </span>
              </li>
            </ul>
          </div>

          {/* Payment Gateways (2 Cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Payment Methods
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-lg bg-pink-500/10 text-pink-600 border border-pink-500/20">
                bKash
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Nagad
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-500/20">
                Rocket
              </span>
              <span className="px-2 py-0.5 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                VISA / Master
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Cash on Delivery (COD)
              </span>
            </div>
            <p className="text-[10px] text-slate-400 pt-1">
              Level 8, Arcus Tower, Road 11, Banani, Dhaka-1213
            </p>
          </div>
        </div>

        {/* 🌟 3. Single-Line Clean Footer Bar (No second line, no clutter) */}
        <div className="pt-6 mt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-2 text-center sm:text-left text-[11px]">
            <span>© {new Date().getFullYear()} SaaZ™ Official Store | By Sazim Hasan Pial</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full glass border border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all active:scale-95"
            title="Scroll to top"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
