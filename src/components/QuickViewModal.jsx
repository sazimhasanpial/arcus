import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, ShoppingCart, Heart, Scale, Check, ShieldCheck, Truck, RotateCcw } from 'lucide-react';

export default function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    setIsCheckoutOpen,
    setIsCartOpen
  } = useStore();

  if (!quickViewProduct) return null;

  const [activeImage, setActiveImage] = useState(quickViewProduct.image);
  const [selectedColor, setSelectedColor] = useState(quickViewProduct.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(quickViewProduct.sizes?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'specs'

  const isWishlisted = wishlist.includes(quickViewProduct.id);
  const isCompared = compareList.some((p) => p.id === quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    addToCart(quickViewProduct, selectedColor, selectedSize, quantity);
    setQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-4xl rounded-2xl sm:rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-2 sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full glass border border-white/20 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all shadow-md"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-8">
          {/* Left: Gallery Column */}
          <div className="md:col-span-6 space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
              <img
                src={activeImage}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
              {quickViewProduct.badge && (
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-600 text-white shadow-md">
                    {quickViewProduct.badge}
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {quickViewProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === img
                        ? 'border-brand-500 ring-2 ring-brand-500/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details Column */}
          <div className="md:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  {quickViewProduct.category}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {quickViewProduct.rating}
                  </span>
                  <span>({quickViewProduct.reviewsCount} customer reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 my-3">
                <span className="text-3xl font-black text-brand-600 dark:text-brand-400">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-base text-slate-400 line-through font-medium">
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  In Stock & Ready to Dispatch
                </span>
              </div>

              {/* Tabs: Overview vs Specs */}
              <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-semibold mb-3">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-2 mr-4 border-b-2 transition-colors ${
                    activeTab === 'overview'
                      ? 'border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Overview & Features
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === 'specs'
                      ? 'border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-900'
                  }`}
                >
                  Technical Specs
                </button>
              </div>

              {activeTab === 'overview' ? (
                <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                  <p className="leading-relaxed">{quickViewProduct.description}</p>
                  <ul className="space-y-1.5 pt-1">
                    {quickViewProduct.features?.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="space-y-2 text-xs">
                  {Object.entries(quickViewProduct.specs || {}).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800/60"
                    >
                      <span className="text-slate-500">{key}</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{val}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Color Selection */}
              {quickViewProduct.colors && (
                <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Select Color: <span className="font-normal text-slate-500">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {quickViewProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all ${
                          selectedColor === c.name
                            ? 'border-brand-500 scale-110 shadow-md ring-2 ring-brand-500/20'
                            : 'border-transparent hover:scale-105 opacity-80'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {quickViewProduct.sizes && (
                <div className="mt-3">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Select Size / Variant:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                          selectedSize === s
                            ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                            : 'glass border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quantity & CTA Buttons */}
            <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800 space-y-3">
              <div className="flex items-center gap-3">
                <div className="flex items-center glass border border-slate-200 dark:border-slate-800 rounded-2xl px-3 py-1.5">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-lg font-bold text-slate-500 hover:text-slate-900 px-2"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-slate-800 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-lg font-bold text-slate-500 hover:text-slate-900 px-2"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>কার্টে যোগ করুন • Add to Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3 px-5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-amber-500/25 transition-all"
                >
                  কিনুন • Buy Now
                </button>
              </div>

              {/* Aux buttons */}
              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-rose-500 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                  />
                  <span>{isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(quickViewProduct)}
                  className="flex items-center gap-1.5 text-slate-500 hover:text-brand-500 transition-colors"
                >
                  <Scale className="w-4 h-4" />
                  <span>{isCompared ? 'Remove from Comparison' : 'Compare Specs'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
