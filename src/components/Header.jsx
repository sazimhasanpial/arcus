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
  Sparkles,
  MapPin,
  Check,
  Bot
} from 'lucide-react';

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
    userProfile,
    isLoggedIn
  } = useStore();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const themeDropdownRef = useRef(null);
  const currencyDropdownRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target)) {
        setIsThemeOpen(false);
      }
      if (currencyDropdownRef.current && !currencyDropdownRef.current.contains(e.target)) {
        setIsCurrencyOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-white/85 dark:bg-slate-950/85 border-b border-black/[0.06] dark:border-white/[0.08] shadow-[0_4px_25px_rgba(0,0,0,0.03)] transition-all duration-300">
      {/* 🌟 Top Luxury Utility Bar */}
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

          {/* Right: Service Status Bar */}
          <div className="flex items-center gap-2 sm:gap-4 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pathao Express Nationwide Delivery</span>
            </div>
            <span className="hidden md:inline text-slate-600">|</span>
            <div className="hidden md:flex items-center gap-1 text-slate-400">
              <Bot className="w-3.5 h-3.5 text-brand-400" />
              <span>24/7 AI Concierge Active</span>
            </div>
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

            {/* Desktop Actions: Compare, Wishlist, Cart & VIP Account */}
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
                <div className="relative">
                  <img
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/60 bg-slate-800"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  {isLoggedIn && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-1 ring-white dark:ring-slate-900" title="Active Account" />
                  )}
                </div>
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
