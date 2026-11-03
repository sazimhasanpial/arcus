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
  Check
} from 'lucide-react';

export default function Footer() {
  const { setSelectedCategory, showToast } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    showToast('Subscribed to VIP drops and exclusive hardware briefings! 🎉');
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="border-t border-slate-200/80 dark:border-slate-800/80 glass mt-16 transition-colors">
      {/* Trust Seals Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b border-slate-200/60 dark:border-slate-800/60">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Free Global Shipping</div>
              <div className="text-slate-500 text-[11px]">On all qualifying orders over $200</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">2-Year Official Warranty</div>
              <div className="text-slate-500 text-[11px]">Instant parts & chassis replacement</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">30-Day Hassle-Free Returns</div>
              <div className="text-slate-500 text-[11px]">Zero-friction contactless return pickup</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white">Platinum VIP Concierge</div>
              <div className="text-slate-500 text-[11px]">24/7 Priority engineering support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md">
                <svg className="w-5 h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-wider bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-400 dark:to-white bg-clip-text text-transparent leading-none">
                  ARCUS
                </span>
                <span className="text-[9px] font-bold tracking-widest uppercase bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 inline" />
                  <span>Shop with Pride</span>
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Curated for creators, engineers, and modern aesthetes. Shop with Pride with official warranties, rapid Pathao delivery, and direct 24/7 support.
            </p>

            {/* Quick Contact Links in Footer */}
            <div className="flex items-center gap-2 pt-1 text-xs">
              <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>WhatsApp</span>
              </a>
              <a
                href="https://facebook.com/sazimhasanpial"
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Facebook</span>
              </a>
              <a
                href="mailto:sajimhasan12@gmail.com"
                className="px-2.5 py-1 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <span>Email Us</span>
              </a>
            </div>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="space-y-2 pt-2 max-w-sm">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Receive Early Hardware Drops
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-all"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <span>Join</span>}
                </button>
              </div>
            </form>
          </div>

          {/* Quick Categories */}
          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Categories
            </h4>
            <ul className="space-y-2 text-slate-500">
              <li>
                <button
                  onClick={() => setSelectedCategory('Electronics')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Acoustics & Wearables
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Apparel')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Aerogel Technical Apparel
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Accessories')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Carbon & Kevlar Gear
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedCategory('Home')}
                  className="hover:text-brand-500 transition-colors"
                >
                  Kinetic Sanctuary & Lighting
                </button>
              </li>
            </ul>
          </div>

          {/* Global Payment & Trust */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold uppercase tracking-wider text-slate-900 dark:text-white text-[11px]">
              Accepted Payment Gateways
            </h4>
            <div className="flex flex-wrap gap-2 text-[10px] font-bold">
              <span className="px-2.5 py-1 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                VISA Platinum
              </span>
              <span className="px-2.5 py-1 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Mastercard
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-pink-500/10 text-pink-600 border border-pink-500/20">
                bKash Direct
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-600 border border-amber-500/20">
                Nagad Wallet
              </span>
              <span className="px-2.5 py-1 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Apple Pay
              </span>
              <span className="px-2.5 py-1 rounded-lg glass border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Google Pay
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-600 border border-purple-500/20">
                DBBL Rocket
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                Cash on Delivery (COD)
              </span>
            </div>
            <p className="text-[11px] text-slate-500 pt-2 leading-relaxed">
              Govt. DBID: <strong>DBID-28491024</strong> · BIN: <strong>004829104-0101</strong><br />
              Head Office: Level 8, Arcus Tower, Road 11, Banani, Dhaka-1213
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Arcus Bangladesh Ltd. e-CAB Member #1489. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Engineered with modern React & Tailwind CSS for</span>
            <strong className="text-slate-800 dark:text-slate-200">Sazim Hasan Pial</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
