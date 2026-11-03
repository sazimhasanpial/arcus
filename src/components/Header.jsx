import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Search,
  ShoppingCart,
  Heart,
  Scale,
  Sun,
  Moon,
  Palette,
  ChevronDown,
  User,
  X,
  ShieldCheck,
  Sparkles,
  MapPin,
  Check,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  Clock
} from 'lucide-react';

// Official Brand Icons for WhatsApp & Facebook
function WhatsAppIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function FacebookIcon({ className = 'w-3.5 h-3.5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function Header() {
  const {
    THEMES,
    CURRENCIES,
    theme,
    setTheme,
    darkMode,
    setDarkMode,
    currency,
    setCurrency,
    formatPrice,
    searchQuery,
    setSearchQuery,
    cartCount,
    cartTotal,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    setIsAccountOpen,
    userProfile
  } = useStore();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const themeDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);
  const contactDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(e.target)) {
        setIsCurrencyOpen(false);
      }
      if (contactDropdownRef.current && !contactDropdownRef.current.contains(e.target)) {
        setIsContactOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/85 dark:bg-slate-950/85 border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all duration-300">
      {/* 🌟 Top Luxury Utility & Direct Contact Bar (All Devices) */}
      <div className="w-full bg-slate-950 text-slate-300 dark:bg-black/95 dark:text-slate-300 text-[10px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8 border-b border-white/[0.08] transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Shop with Pride indicator */}
          <div className="flex items-center gap-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-brand-500/25 via-indigo-500/20 to-purple-500/25 text-brand-300 border border-brand-500/35 text-[9.5px] sm:text-[10px] font-extrabold tracking-wider uppercase shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Shop with Pride</span>
            </div>
            <span className="hidden sm:inline text-slate-400 text-[11px] font-medium">
              • Official Flagship Store
            </span>
            <span className="hidden md:inline text-slate-500 text-[10px]">
              • Banani, Dhaka
            </span>
          </div>

          {/* Right: Direct Contact Links (FB, WhatsApp, Email) - Responsive on ALL devices */}
          <div className="flex items-center gap-1.5 sm:gap-3 text-[11px]">
            <span className="hidden lg:inline text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              Direct Contact:
            </span>

            {/* WhatsApp (WP) Link */}
            <a
              href="https://wa.me/8801700000000?text=Hello%20Arcus%20Team!%20I%20have%20an%20inquiry%20regarding%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 border border-emerald-500/30 transition-all font-bold active:scale-95 group shadow-sm"
              title="Chat on WhatsApp (+880 1700-000000)"
              aria-label="WhatsApp Contact"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xs:inline">WhatsApp</span>
            </a>

            {/* Facebook (FB) Link */}
            <a
              href="https://facebook.com/sazimhasanpial"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-blue-500/15 hover:bg-blue-500/25 text-blue-400 border border-blue-500/30 transition-all font-bold active:scale-95 group shadow-sm"
              title="Official Facebook Page"
              aria-label="Facebook Contact"
            >
              <FacebookIcon className="w-3.5 h-3.5 fill-current" />
              <span className="hidden xs:inline">Facebook</span>
            </a>

            {/* Email Link */}
            <a
              href="mailto:sajimhasan12@gmail.com?subject=Arcus%20Store%20Inquiry%20-%20Customer%20Support"
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all font-bold active:scale-95 group shadow-sm"
              title="Official Email: sajimhasan12@gmail.com"
              aria-label="Email Contact"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">sajimhasan12@gmail.com</span>
              <span className="sm:hidden">Email</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Brand Logo & Shop with Pride (Gorgeous Typography) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <a href="#" className="flex items-center gap-2.5 group active:scale-95 transition-transform">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 ring-1 ring-white/20 group-hover:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                  <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                  <polyline points="2 17 12 22 22 17"></polyline>
                  <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-black tracking-[0.14em] bg-gradient-to-r from-slate-950 via-brand-600 to-slate-900 dark:from-white dark:via-brand-400 dark:to-slate-100 bg-clip-text text-transparent leading-none drop-shadow-sm font-sans">
                  ARCUS
                </span>
                <span className="text-[8.5px] sm:text-[9.5px] font-extrabold tracking-[0.2em] uppercase bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-600 dark:from-brand-400 dark:via-indigo-300 dark:to-purple-300 bg-clip-text text-transparent mt-0.5 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500 inline shrink-0 animate-pulse" />
                  <span>Shop with Pride</span>
                </span>
              </div>
            </a>

            {/* Banani, Dhaka pill (Desktop) */}
            <div className="hidden xl:flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800 text-[10px] text-slate-500">
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>Banani, Dhaka</span>
            </div>
          </div>

          {/* Desktop Live Search Bar */}
          <div className="flex-1 max-w-lg mx-3 hidden md:block">
            <div
              className={`relative flex items-center w-full transition-all duration-200 rounded-full bg-slate-100/90 dark:bg-slate-900/90 border ${
                isSearchFocused
                  ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-sm'
                  : 'border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Search className="w-4 h-4 ml-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search titanium watch, beryllium headphones, mechanical gear..."
                className="w-full py-2 pl-2.5 pr-8 bg-transparent text-xs sm:text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-0.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Quick Contact Interactive Card Trigger (All Devices) */}
            <div className="relative" ref={contactDropdownRef}>
              <button
                onClick={() => setIsContactOpen(!isContactOpen)}
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-[11px] sm:text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                title="Direct Support & Contacts"
                aria-label="Contact Channels"
              >
                <MessageCircle className="w-3.5 h-3.5 text-brand-500" />
                <span className="hidden sm:inline">Contact</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${isContactOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Contact Card Popover */}
              {isContactOpen && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-3xl backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 z-50 animate-fadeIn space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        <span>Arcus Official Support</span>
                      </div>
                      <div className="text-[10px] text-slate-500">Fast 24/7 Priority Assistance</div>
                    </div>
                    <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Online
                    </span>
                  </div>

                  {/* 3 Contact Channels */}
                  <div className="space-y-2">
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/8801700000000?text=Hello%20Arcus%20Team!%20I%20have%20an%20inquiry%20regarding%20an%20order."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 border border-emerald-500/25 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                          <WhatsAppIcon className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <div className="font-bold text-emerald-900 dark:text-emerald-300">WhatsApp Chat</div>
                          <div className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono">+880 1700-000000</div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Facebook */}
                    <a
                      href="https://facebook.com/sazimhasanpial"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-500/25 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                          <FacebookIcon className="w-4 h-4 fill-current" />
                        </div>
                        <div>
                          <div className="font-bold text-blue-900 dark:text-blue-300">Facebook Messenger</div>
                          <div className="text-[10px] text-blue-700 dark:text-blue-400">@sazimhasanpial</div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>

                    {/* Official Email */}
                    <a
                      href="mailto:sajimhasan12@gmail.com?subject=Arcus%20Store%20Inquiry%20-%20Customer%20Support"
                      className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-900/40 border border-amber-500/25 transition-all text-xs group"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md font-bold">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-bold text-amber-900 dark:text-amber-300">Official Support Email</div>
                          <div className="text-[10px] text-amber-700 dark:text-amber-400 font-mono">sajimhasan12@gmail.com</div>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                  {/* Flagship Address */}
                  <div className="pt-1 text-[10px] text-slate-500 border-t border-slate-100 dark:border-slate-800 space-y-1">
                    <div className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      <span>Road 11, Banani Model Town, Dhaka-1213</span>
                    </div>
                    <div className="flex items-center gap-1 text-[9.5px]">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>Everyday: 10:00 AM – 10:00 PM</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* iOS Unified Capsule Controls (Currency + Theme + Dark Mode) */}
            <div className="flex items-center rounded-full bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/70 dark:border-slate-800/80 p-0.5 shadow-sm">
              {/* Currency Picker */}
              <div className="relative" ref={currencyDropdownRef}>
                <button
                  onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
                  className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center gap-1 active:scale-95"
                  aria-label="Currency Selector"
                >
                  <span className="text-brand-600 dark:text-brand-400 font-extrabold">
                    {CURRENCIES[currency]?.symbol}
                  </span>
                  <span>{currency}</span>
                  <ChevronDown className="w-3 h-3 text-slate-400" />
                </button>

                {isCurrencyOpen && (
                  <div className="absolute right-0 mt-2 w-44 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-fadeIn">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Select Currency
                    </div>
                    {Object.entries(CURRENCIES).map(([code, curr]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setCurrency(code);
                          setIsCurrencyOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                          currency === code
                            ? 'font-bold text-brand-600 dark:text-brand-400'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <strong className="text-brand-500 font-mono text-sm">{curr.symbol}</strong>
                          {curr.label}
                        </span>
                        {currency === code && <Check className="w-3.5 h-3.5 text-brand-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Palette Picker */}
              <div className="relative" ref={themeDropdownRef}>
                <button
                  onClick={() => setIsThemeOpen(!isThemeOpen)}
                  className="p-1 sm:p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center active:scale-95 text-slate-600 dark:text-slate-300"
                  title="Switch Accent Theme"
                  aria-label="Theme selector"
                >
                  <Palette className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-500" />
                </button>

                {isThemeOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-fadeIn">
                    <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Brand Accent Theme
                    </div>
                    {THEMES.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => {
                          setTheme(t.id);
                          setIsThemeOpen(false);
                        }}
                        className={`w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                          theme === t.id
                            ? 'font-bold text-brand-600 dark:text-brand-400'
                            : 'text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className="w-3 h-3 rounded-full shadow-sm ring-1 ring-white"
                            style={{ backgroundColor: t.color }}
                          />
                          <span>{t.name}</span>
                        </div>
                        {theme === t.id && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold">
                            Active
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark / Light Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-1 sm:p-1.5 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-all active:scale-95"
                title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600" />
                )}
              </button>
            </div>

            {/* Desktop Only Actions: Compare, Wishlist, Cart & VIP Account */}
            <div className="hidden md:flex items-center gap-2 pl-1">
              {/* Compare */}
              <button
                onClick={() => setIsCompareOpen(true)}
                className="relative p-2 rounded-full glass border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
                title="Side-by-side Spec Comparison"
              >
                <Scale className="w-4 h-4" />
                {compareList.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-brand-600 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                    {compareList.length}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 rounded-full glass border border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
                title="Wishlist"
              >
                <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-md">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Drawer */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white shadow-md shadow-brand-500/25 transition-all active:scale-95 text-xs font-bold"
              >
                <div className="relative">
                  <ShoppingCart className="w-4 h-4" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[9px] font-black flex items-center justify-center animate-bounce">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span>{formatPrice(cartTotal)}</span>
              </button>

              {/* VIP Account */}
              <button
                onClick={() => setIsAccountOpen(true)}
                className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all active:scale-95"
              >
                <div className="text-right leading-none hidden lg:block">
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">
                    {userProfile.name.split(' ')[0]}
                  </div>
                  <div className="text-[9px] text-brand-600 dark:text-brand-400 font-semibold mt-0.5">
                    {userProfile.tier}
                  </div>
                </div>
                <img
                  src={userProfile.avatar}
                  alt={userProfile.name}
                  className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/60"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Spotlight Search Bar (iOS Style) */}
        <div className="md:hidden pb-2.5 pt-0.5">
          <div className="relative flex items-center w-full rounded-full bg-slate-200/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-300/40 dark:border-slate-700/40 transition-all duration-200 focus-within:ring-2 focus-within:ring-brand-500/30 focus-within:bg-white dark:focus-within:bg-slate-900">
            <Search className="w-3.5 h-3.5 ml-3 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titanium audio, watches, apparel..."
              className="w-full py-1.5 pl-2 pr-8 bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
