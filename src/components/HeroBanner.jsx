import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Truck, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function HeroBanner() {
  const { setSelectedCategory, setIsAccountOpen, setIsCompareOpen } = useStore();

  return (
    <section className="relative overflow-hidden pt-8 pb-12 lg:pt-14 lg:pb-16 bg-gradient-to-b from-brand-500/5 via-transparent to-transparent">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text & Call To Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-brand-500/30 text-xs font-semibold text-brand-600 dark:text-brand-400 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen 2026 Collection — Arcus Flagship</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900 dark:text-white">
              Precision Crafted.{' '}
              <span className="bg-gradient-to-r from-brand-600 via-brand-400 to-indigo-400 bg-clip-text text-transparent">
                Engineered for Tomorrow.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Explore titanium smartwatches, spatial beryllium acoustics, aerogel thermal apparel, and kinetic sanctuary art. Seamless multi-currency checkout with instant bKash, cards, and BNPL.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm shadow-xl shadow-brand-500/30 flex items-center gap-2 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsAccountOpen(true)}
                className="px-5 py-3.5 rounded-2xl glass hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 font-bold text-sm border border-slate-200 dark:border-slate-800 transition-all duration-300"
              >
                VIP Loyalty Hub (2,450 Pts)
              </button>
            </div>

            {/* Key trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <Truck className="w-4 h-4 text-brand-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Express Delivery</div>
                  <div className="text-[10px] text-slate-500">Global air cargo</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">2-Year Guarantee</div>
                  <div className="text-[10px] text-slate-500">Official warranty</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-left">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">Instant bKash/Card</div>
                  <div className="text-[10px] text-slate-500">3D secure checkout</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main showcase card */}
              <div className="relative rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 shadow-2xl p-4 bg-gradient-to-tr from-slate-900/10 to-brand-500/10">
                <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80"
                    alt="Aether Pro Headphones"
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating card caption */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-block px-2.5 py-1 rounded-full bg-brand-500 text-[10px] font-bold uppercase tracking-wider mb-1">
                      Featured Flagship
                    </div>
                    <div className="text-lg font-bold">Aether Pro Spatial ANC</div>
                    <div className="text-xs text-slate-300">Beryllium 40mm Transducers · 60h Battery</div>
                  </div>
                </div>

                {/* Floating Rating Badge */}
                <div className="absolute -bottom-3 -left-3 glass px-3.5 py-2 rounded-2xl border border-white/20 shadow-xl flex items-center gap-2">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">4.9 / 5.0 Rating</div>
                    <div className="text-[10px] text-slate-500">Over 300+ Verified Buyers</div>
                  </div>
                </div>

                {/* Floating Stock Badge */}
                <div className="absolute -top-3 -right-3 glass px-3 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Ready to Ship</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
