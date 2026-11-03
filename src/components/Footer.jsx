import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Heart,
  Mail,
  Check,
  ChevronUp,
  MapPin,
  Clock,
  ExternalLink,
  Award,
  Lock,
  FileText,
  HelpCircle,
  Headphones,
  Zap
} from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, showToast, setIsAccountOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed! Welcome bonus code ARCUS20 unlocked 🎉');
    setEmail('');
    setTimeout(() => setSubscribed(false), 3500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-b from-white via-slate-50/60 to-slate-100/80 dark:from-slate-950 dark:via-slate-950/80 dark:to-black mt-20 transition-colors overflow-hidden">
      {/* Ambient background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* 🌟 1. Top Tier Value Proposition Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-slate-200/60 dark:border-slate-800/60 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Express Delivery */}
          <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/30 transition-all hover:shadow-lg hover:-translate-y-0.5 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Pathao Priority Express
            </h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              24-48h Dhaka doorstep delivery with tamper-proof packaging & live rider GPS.
            </p>
          </div>

          {/* Card 2: 2-Year Official Warranty */}
          <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80 hover:border-emerald-500/30 transition-all hover:shadow-lg hover:-translate-y-0.5 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              2-Year Official Warranty
            </h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Official replacement warranty on internal acoustic drivers, PCB, and chassis.
            </p>
          </div>

          {/* Card 3: 30-Day Hassle-Free Returns */}
          <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/30 transition-all hover:shadow-lg hover:-translate-y-0.5 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              30-Day Doorstep Returns
            </h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Zero-friction return pickups nationwide with full instant refund guarantee.
            </p>
          </div>

          {/* Card 4: VIP Concierge & Security */}
          <div className="p-5 rounded-2xl glass border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-500/30 transition-all hover:shadow-lg hover:-translate-y-0.5 group">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              24/7 AI & Admin Support
            </h4>
            <p className="text-slate-500 text-xs mt-1 leading-relaxed">
              Instant AI shopping concierge with direct Store Administrator notification.
            </p>
          </div>
        </div>
      </div>

      {/* 🌟 2. Main Footer Body: Brand, Navigation, Compliance & Payments */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
          {/* Col 1: Brand Identity & Newsletter (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-[0.14em] bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-400 dark:to-slate-100 bg-clip-text text-transparent leading-none font-sans">
                  ARCUS
                </span>
                <span className="text-[9px] font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 inline" />
                  <span>Shop with Pride</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Curated for creators, engineers, and modern aesthetes. Engineering tomorrow’s acoustic architecture, aerospace wearable hardware, and smart minimalist living in Bangladesh.
            </p>

            {/* Compliance Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                DBID-28491024
              </span>
              <span className="px-2.5 py-1 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                e-CAB #1489
              </span>
              <span className="px-2.5 py-1 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                VAT BIN: 004829104-0101
              </span>
            </div>

            {/* Newsletter Subscription */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2 max-w-sm">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                <span>VIP Hardware Drops & Early Briefings</span>
                <span className="text-[10px] text-brand-600 dark:text-brand-400 font-extrabold">Save 20%</span>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email for ARCUS20 voucher..."
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1 shadow-md shadow-brand-500/20 active:scale-95 transition-all"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <span>Join VIP</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Col 2: Curated Collections (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3.5 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Headphones className="w-3.5 h-3.5 text-brand-500" />
              <span>Collections</span>
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setSelectedCategory('Electronics')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Acoustics & Spatial Audio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Electronics')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Aerospace Titanium Watches
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Apparel')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  NASA Aerogel Thermal Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Accessories')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Carbon Fiber EDC & Wallets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Home')}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Kinetic Sand Sanctuary Art
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Services (2.5 Cols) */}
          <div className="lg:col-span-2 space-y-3.5 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Support & VIP</span>
            </h4>
            <ul className="space-y-2 text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Pathao Package Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  VIP Rewards (2,450 Pts)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAccountOpen(true)}
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  ID & Password Sign In
                </button>
              </li>
              <li>
                <span className="text-slate-400">
                  Mushak-6.3 Tax Invoices
                </span>
              </li>
              <li>
                <span className="text-slate-400">
                  30-Day Doorstep Pickup
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Bangladesh Payment Gateways & Flagship Showroom (2.5 Cols) */}
          <div className="lg:col-span-3 space-y-3.5 text-xs">
            <h4 className="font-extrabold uppercase tracking-wider text-slate-900 dark:text-white text-[11px] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Payment Gateways</span>
            </h4>
            {/* Visual Payment Badges */}
            <div className="flex flex-wrap gap-1.5 text-[10px] font-bold">
              <span className="px-2 py-0.5 rounded-lg bg-pink-500/10 text-pink-600 border border-pink-500/20">
                bKash Merchant Pay
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Nagad Wallet
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-500/20">
                DBBL Rocket
              </span>
              <span className="px-2 py-0.5 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                VISA Platinum
              </span>
              <span className="px-2 py-0.5 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Mastercard 3DS
              </span>
              <span className="px-2 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Cash on Delivery (COD)
              </span>
            </div>

            {/* Flagship Showroom */}
            <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5 text-[11px] text-slate-500">
              <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200">
                <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                <span>Banani Flagship Center</span>
              </div>
              <p className="text-[10px] leading-relaxed">
                Level 8, Arcus Tower, Road 11, Banani, Dhaka-1213
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pt-0.5">
                <Clock className="w-3 h-3 shrink-0" />
                <span>Open Everyday: 10:00 AM – 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 3. Ultra-Luxury Signature Bar: Attribution for Sazim Hasan Pial (SaaZ) & Back to Top */}
        <div className="pt-8 mt-10 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          {/* Copyright & Compliance */}
          <div className="flex items-center gap-2 text-center md:text-left text-[11px]">
            <span>© {new Date().getFullYear()} Arcus Bangladesh Ltd. e-CAB Member #1489. All rights reserved.</span>
          </div>

          {/* Centerpiece: Sazim Hasan Pial (SaaZ) Signature Badge */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 hidden sm:inline">Architected & Engineered by</span>
            <a
              href="https://github.com/sazimhasanpial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-brand-500/15 via-indigo-500/15 to-purple-500/15 hover:from-brand-500/25 hover:via-indigo-500/25 hover:to-purple-500/25 border border-brand-500/30 hover:border-brand-500 text-slate-900 dark:text-white font-black text-xs transition-all hover:scale-105 active:scale-95 group shadow-sm"
              title="View GitHub Profile: Sazim Hasan Pial (SaaZ)"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent font-extrabold tracking-wide">
                Sazim Hasan Pial
              </span>
              <span className="text-[9.5px] px-2 py-0.5 rounded-md bg-brand-500/20 text-brand-500 dark:text-brand-300 font-mono font-bold tracking-wider uppercase border border-brand-500/30">
                SaaZ™
              </span>
              <ExternalLink className="w-3 h-3 text-brand-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500/40 transition-all active:scale-95"
            title="Scroll to top of storefront"
          >
            <span>Back to top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
