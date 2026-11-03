import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    toggleWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    PRODUCTS,
    formatPrice,
    addToCart,
    showToast
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveAllToCart = () => {
    wishlistedProducts.forEach((p) => addToCart(p));
    showToast(`Added ${wishlistedProducts.length} items from wishlist to cart!`);
    setIsWishlistOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Your Wishlist
                </h2>
                <p className="text-xs text-slate-500">
                  {wishlistedProducts.length} saved products
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-24 space-y-3">
                <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto" />
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Your wishlist is empty
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the heart icon on any product in the catalog to save it for later.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3.5 p-3 rounded-2xl glass border border-slate-200/60 dark:border-slate-800/80 items-center justify-between"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl shrink-0 border border-slate-200 dark:border-slate-800"
                  />

                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                      {product.name}
                    </h4>
                    <div className="text-brand-600 dark:text-brand-400 font-extrabold text-xs mt-1">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white shadow-sm"
                      title="Move to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-500"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 glass space-y-2">
              <button
                onClick={handleMoveAllToCart}
                className="w-full py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg"
              >
                <span>Move All ({wishlistedProducts.length}) to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
