import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Star, Heart, Eye, Scale, ShoppingCart, Check } from 'lucide-react';

export default function ProductCard({ product }) {
  const {
    formatPrice,
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    setQuickViewProduct
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [isAdded, setIsAdded] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const isCompared = compareList.some((p) => p.id === product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(product, selectedColor, selectedSize, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'Hot':
        return 'bg-rose-500 text-white';
      case 'Bestseller':
        return 'bg-amber-500 text-slate-950 font-extrabold';
      case 'Staff Pick':
        return 'bg-purple-600 text-white';
      case 'New':
        return 'bg-emerald-500 text-white';
      case 'Limited':
        return 'bg-indigo-600 text-white';
      default:
        return 'bg-brand-600 text-white';
    }
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative rounded-3xl glass border border-slate-200/80 dark:border-slate-800/80 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-brand-500/40 hover:-translate-y-1 cursor-pointer"
    >
      {/* Top Image & Overlays */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-md ${getBadgeClass(
                product.badge
              )}`}
            >
              {product.badge}
            </span>
          </div>
        )}

        {/* Floating Quick Action Buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className="w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 shadow-md hover:scale-110 active:scale-90 transition-all"
            title={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-label="Wishlist"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isWishlisted ? 'fill-rose-500 text-rose-500' : 'hover:text-rose-500'
              }`}
            />
          </button>

          {/* Compare Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product);
            }}
            className={`w-9 h-9 rounded-full glass border border-white/20 flex items-center justify-center shadow-md hover:scale-110 active:scale-90 transition-all ${
              isCompared
                ? 'bg-brand-600 text-white font-bold ring-2 ring-brand-400'
                : 'text-slate-700 dark:text-slate-200 hover:text-brand-500'
            }`}
            title={isCompared ? 'In Comparison' : 'Add to Spec Comparison'}
            aria-label="Compare"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-4 bottom-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2.5 rounded-2xl glass border border-white/30 text-xs font-bold text-slate-900 dark:text-white shadow-xl flex items-center justify-center gap-1.5 hover:bg-white/90 dark:hover:bg-slate-900/90 transition-all"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="font-semibold uppercase tracking-wider text-[10px] text-brand-600 dark:text-brand-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800 dark:text-slate-200">{product.rating}</span>
              <span className="text-[10px]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Interactive Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setSelectedColor(c.name)}
                className={`w-5 h-5 rounded-full border-2 transition-all ${
                  selectedColor === c.name
                    ? 'border-brand-500 scale-110 shadow-sm'
                    : 'border-transparent hover:scale-105 opacity-80'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
                aria-label={`Color ${c.name}`}
              />
            ))}
            <span className="text-[10px] text-slate-400 ml-1 truncate max-w-[120px]">
              {selectedColor}
            </span>
          </div>
        )}

        {/* Price & Add to Cart Action */}
        <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="text-lg font-extrabold text-slate-900 dark:text-white">
              {formatPrice(product.price)}
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {formatPrice(product.originalPrice)}
              </div>
            )}
          </div>

          <button
            onClick={handleAdd}
            disabled={isAdded}
            className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-500/20'
            }`}
            title="Add to Cart"
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
