import React from 'react';
import { useStore } from '../context/StoreContext';
import { Home, Layers, Scale, Heart, ShoppingBag, User } from 'lucide-react';

export default function MobileBottomNav() {
  const {
    cartCount,
    cartTotal,
    formatPrice,
    wishlist,
    compareList,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsCompareOpen,
    setIsAccountOpen,
    userProfile
  } = useStore();

  const scrollToCatalog = () => {
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-40 md:hidden glass border-t border-slate-200/80 dark:border-slate-800/80 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-xl"
      aria-label="Mobile Navigation Bar"
    >
      <div className="grid grid-cols-5 h-16 items-center px-1">
        {/* Home */}
        <button
          onClick={scrollToTop}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 active:scale-95 transition-transform"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-bold">Home</span>
        </button>

        {/* Categories */}
        <button
          onClick={scrollToCatalog}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 active:scale-95 transition-transform"
        >
          <Layers className="w-5 h-5" />
          <span className="text-[10px] font-bold">Catalog</span>
        </button>

        {/* Wishlist */}
        <button
          onClick={() => setIsWishlistOpen(true)}
          className="relative flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-rose-500 active:scale-95 transition-transform"
        >
          <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
          {wishlist.length > 0 && (
            <span className="absolute top-0 right-3.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-extrabold flex items-center justify-center shadow-md">
              {wishlist.length}
            </span>
          )}
          <span className="text-[10px] font-bold">Wishlist</span>
        </button>

        {/* Cart */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center justify-center gap-1 text-brand-600 dark:text-brand-400 active:scale-95 transition-transform"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-brand-600 text-white text-[9px] font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-extrabold">{cartCount > 0 ? formatPrice(cartTotal) : 'Cart'}</span>
        </button>

        {/* VIP Account */}
        <button
          onClick={() => setIsAccountOpen(true)}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-brand-600 active:scale-95 transition-transform"
        >
          <img
            src={userProfile.avatar}
            alt={userProfile.name}
            className="w-5 h-5 rounded-full object-cover ring-1 ring-brand-500"
          />
          <span className="text-[10px] font-bold">VIP</span>
        </button>
      </div>
    </nav>
  );
}
