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
  Menu,
  ShieldCheck,
  Sparkles,
  MapPin
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
    userProfile
  } = useStore();

  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    <header className="sticky top-0 z-40 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-6 h-6 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-slate-900 via-brand-600 to-slate-900 dark:from-white dark:via-brand-400 dark:to-white bg-clip-text text-transparent">
                ARCUS
              </span>
              <div className="flex items-center gap-1 -mt-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-600 dark:text-brand-400">
                  Bangladesh
                </span>
                <span className="text-[10px]">🇧🇩</span>
              </div>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-1 px-2.5 py-1 rounded-xl glass border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-500">
            <MapPin className="w-3 h-3 text-emerald-500" />
            <span>Banani, Dhaka</span>
          </div>
        </div>

        {/* Live Search Bar */}
        <div className="flex-1 max-w-xl mx-2 hidden md:block">
          <div
            className={`relative flex items-center w-full transition-all duration-300 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border ${
              isSearchFocused
                ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-lg'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <Search className="w-4 h-4 ml-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search audio, titanium smartwatch, mechanical keyboard..."
              className="w-full py-2.5 pl-3 pr-10 bg-transparent text-sm text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Controls, Tools & Navigation Actions */}
        <div className="flex items-center gap-2 lg:gap-3">
          {/* Theme Selector Dropdown */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 border border-slate-200/60 dark:border-slate-800"
              title="Change Accent Theme"
              aria-label="Theme selector"
            >
              <Palette className="w-4 h-4 text-brand-500" />
              <span className="hidden xl:inline text-xs font-semibold capitalize">
                {theme}
              </span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isThemeOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl glass border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Brand Accent
                </div>
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsThemeOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${
                      theme === t.id ? 'font-bold text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-3.5 h-3.5 rounded-full shadow-sm ring-2 ring-white dark:ring-slate-900"
                        style={{ backgroundColor: t.color }}
                      />
                      <span>{t.name}</span>
                    </div>
                    {theme === t.id && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 font-medium">
                        Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Switcher */}
          <div className="relative" ref={currencyDropdownRef}>
            <button
              onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
              className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 border border-slate-200/60 dark:border-slate-800 font-medium text-xs"
              title="Switch Currency"
              aria-label="Currency selector"
            >
              <span className="font-bold text-brand-600 dark:text-brand-400">
                {CURRENCIES[currency]?.symbol}
              </span>
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl glass border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50">
                <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Currency
                </div>
                {Object.entries(CURRENCIES).map(([code, curr]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setCurrency(code);
                      setIsCurrencyOpen(false);
                    }}
                    className={`w-full px-3 py-2 flex items-center justify-between text-xs hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors ${
                      currency === code ? 'font-bold text-brand-600 dark:text-brand-400' : 'text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <strong className="text-brand-500">{curr.symbol}</strong>
                      {curr.label}
                    </span>
                    {currency === code && (
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800"
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Comparison Drawer Button */}
          <button
            onClick={() => setIsCompareOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800 hidden sm:flex"
            title="Side-by-side Spec Comparison"
            aria-label="Compare products"
          >
            <Scale className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            {compareList.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-brand-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                {compareList.length}
              </span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="relative p-2.5 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200/60 dark:border-slate-800"
            title="Wishlist"
            aria-label="View wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart Drawer Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-500/25 transition-all duration-300 active:scale-95"
            title="View Cart"
            aria-label="Shopping Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold">
              {formatPrice(cartTotal)}
            </span>
          </button>

          {/* User VIP Profile Button */}
          <button
            onClick={() => setIsAccountOpen(true)}
            className="flex items-center gap-2 p-1.5 pl-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="VIP Account & Live Package Tracker"
            aria-label="User Account"
          >
            <div className="text-left hidden lg:block leading-tight">
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1">
                {userProfile.name.split(' ')[0]}
                <ShieldCheck className="w-3 h-3 text-brand-500" />
              </div>
              <div className="text-[10px] text-brand-600 dark:text-brand-400 font-semibold">
                {userProfile.tier}
              </div>
            </div>
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-8 h-8 rounded-xl object-cover ring-2 ring-brand-500/50 shadow-sm"
            />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 md:hidden rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            aria-label="Mobile Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-4 glass space-y-3 animate-fadeIn">
          <div className="relative flex items-center w-full rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <Search className="w-4 h-4 ml-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full py-2.5 pl-3 pr-8 bg-transparent text-sm text-slate-800 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <button
              onClick={() => {
                setIsCompareOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 py-2"
            >
              <Scale className="w-4 h-4 text-brand-500" />
              <span>Compare ({compareList.length})</span>
            </button>
            <button
              onClick={() => {
                setIsAccountOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 py-2"
            >
              <User className="w-4 h-4 text-brand-500" />
              <span>VIP Tracker</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
