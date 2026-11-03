import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Truck, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeroBanner() {
  const { setSelectedCategory, setIsAccountOpen, setIsCompareOpen } = useStore();

  return (
    <section className="relative overflow-hidden pt-4 pb-6 sm:pt-8 sm:pb-12 lg:pt-14 lg:pb-16 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-center">
          {/* Left Text & Call To Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full glass border border-brand-500/30 text-[10px] sm:text-xs font-semibold text-brand-600 dark:text-brand-400 shadow-sm">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Next-Gen 2026 Collection — SaaZ™ Official Store</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-[1.15] text-slate-900 dark:text-white">
              Precision Crafted.{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-400 to-indigo-400 bg-clip-text text-transparent">
                Engineered for Tomorrow.
              </span>
            </h1>

            <p className="text-xs sm:text-base lg:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore titanium smartwatches, spatial beryllium acoustics, aerogel thermal apparel, and kinetic sanctuary art. Seamless bKash, Nagad, card & COD delivery across all districts of Bangladesh.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 pt-1">
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-brand-500/30 flex items-center gap-1.5 transition-all active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              <button
                onClick={() => setIsAccountOpen(true)}
                className="px-4 sm:px-5 py-2.5 sm:py-3.5 rounded-xl sm:rounded-2xl glass hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-800 transition-all"
              >
                VIP Rewards (2,450 Pts)
              </button>
            </div>

            {/* Key trust badges */}
            <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-2 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500 shrink-0" />
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Pathao Express</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500">24-48h Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">Official Warranty</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500">2-Year Replacement</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-200">bKash & COD</div>
                  <div className="text-[9px] sm:text-[10px] text-slate-500">Instant Verification</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 shadow-2xl p-2.5 sm:p-4 bg-gradient-to-tr from-slate-900/10 to-brand-500/10">
                <div className="relative h-48 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                    alt="Aether Pro Headphones"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating card caption */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-white">
                    <div className="inline-block px-2 py-0.5 rounded-full bg-brand-500 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider mb-1">
                      Featured Flagship
                    </div>
                    <div className="text-sm sm:text-lg font-bold">Aether Pro Spatial ANC</div>
                    <div className="text-[10px] sm:text-xs text-slate-300">Beryllium 40mm Transducers · 60h Battery</div>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -bottom-2 -left-2 sm:-bottom-3 sm:-left-3 glass px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl border border-white/20 shadow-xl flex items-center gap-1.5 sm:gap-2">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <div>
                    <div className="text-[10px] sm:text-xs font-bold text-slate-900 dark:text-white">4.9 / 5.0 Rating</div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500">300+ Verified Buyers</div>
                  </div>
                </div>

                {/* Floating Stock Badge */}
                <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 glass px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-1.5 text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>In Stock Dhaka</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
