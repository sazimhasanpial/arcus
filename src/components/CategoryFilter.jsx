import React from 'react';
import { CATEGORIES } from '../data/products';
import { useStore } from '../context/StoreContext';
import { SlidersHorizontal, ArrowUpDown, Sparkles, Laptop, Shirt, Watch, Home, RotateCcw } from 'lucide-react';

const CATEGORY_ICONS = {
  All: Sparkles,
  Electronics: Laptop,
  Apparel: Shirt,
  Accessories: Watch,
  Home: Home
};

export default function CategoryFilter({ totalResults }) {
  const {
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery
  } = useStore();

  const handleReset = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 pb-2 sm:pt-6 sm:pb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-slate-200 dark:border-slate-800 pb-3 sm:pb-5">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 md:pb-0 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat] || Sparkles;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0 ${
                  isSelected
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/25 scale-[1.02]'
                    : 'glass text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Sorting & Filter Actions */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs">
          <div className="text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
            Showing <strong className="text-slate-800 dark:text-slate-200">{totalResults}</strong> items
            {searchQuery && (
              <span> for "<span className="text-brand-500 font-bold">{searchQuery}</span>"</span>
            )}
          </div>

          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              title="Reset search and filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 glass px-3 py-1.5 rounded-2xl border border-slate-200/60 dark:border-slate-800">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-700 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="dark:bg-slate-900">Featured</option>
              <option value="price-low" className="dark:bg-slate-900">Price: Low to High</option>
              <option value="price-high" className="dark:bg-slate-900">Price: High to Low</option>
              <option value="rating" className="dark:bg-slate-900">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
