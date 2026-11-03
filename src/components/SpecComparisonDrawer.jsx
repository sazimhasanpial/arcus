import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Scale, Trash2, ShoppingCart, Star, CheckCircle } from 'lucide-react';

export default function SpecComparisonDrawer() {
  const {
    compareList,
    removeCompare,
    isCompareOpen,
    setIsCompareOpen,
    formatPrice,
    addToCart
  } = useStore();

  if (!isCompareOpen) return null;

  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs || {})))
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-end sm:items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-5xl rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-4 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Side-by-Side Spec Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Comparing {compareList.length} of 3 maximum products
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCompareOpen(false)}
            className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {compareList.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="text-base font-bold text-slate-700 dark:text-slate-200">
                No products selected for comparison
              </div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Click the scale icon on any product card in the catalog to add it here and compare specs side-by-side.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 w-40 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                      Product
                    </th>
                    {compareList.map((product) => (
                      <th key={product.id} className="p-3 w-64 align-top">
                        <div className="space-y-2 relative">
                          <button
                            onClick={() => removeCompare(product.id)}
                            className="absolute -top-1 right-0 text-slate-400 hover:text-rose-500"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded-xl shadow-md border border-slate-200 dark:border-slate-800"
                          />
                          <div className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                            {product.name}
                          </div>
                          <div className="text-brand-600 dark:text-brand-400 font-extrabold text-base">
                            {formatPrice(product.price)}
                          </div>
                          <button
                            onClick={() => addToCart(product)}
                            className="w-full py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm"
                          >
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                  {/* Category */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Category</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 text-slate-800 dark:text-slate-200 font-medium">
                        {p.category}
                      </td>
                    ))}
                  </tr>

                  {/* Rating */}
                  <tr>
                    <td className="p-3 font-semibold text-slate-500">Rating & Reviews</td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 text-slate-800 dark:text-slate-200">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{p.rating}</span>
                          <span className="text-slate-400">({p.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Dynamic specs rows */}
                  {allSpecKeys.map((key) => (
                    <tr key={key}>
                      <td className="p-3 font-semibold text-slate-500">{key}</td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3 text-slate-800 dark:text-slate-200">
                          {p.specs?.[key] || <span className="text-slate-400">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
