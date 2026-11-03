import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  CheckCircle,
  Tag
} from 'lucide-react';

export default function CartSlideOver() {
  const {
    cart,
    cartCount,
    cartSubtotal,
    promoDiscount,
    pointsDiscount,
    shippingCost,
    cartTotal,
    freeShippingThreshold,
    isFreeShipping,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    formatPrice,
    appliedPromo,
    applyPromo,
    removePromo,
    usePoints,
    setUsePoints,
    userProfile
  } = useStore();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyPromo(promoInput)) {
      setPromoInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Shopping Cart
                </h2>
                <p className="text-xs text-slate-500">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-slate-400 hover:text-rose-500 transition-colors p-1"
                  title="Clear all items"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Shipping Meter */}
          <div className="px-5 py-3 bg-brand-500/5 dark:bg-brand-500/10 border-b border-slate-200/60 dark:border-slate-800/80">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                <Truck className="w-4 h-4 text-brand-500" />
                {isFreeShipping ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    You unlocked Free Global Express Shipping! 🎉
                  </span>
                ) : (
                  <span>
                    Add <strong>{formatPrice(remainingForFreeShipping)}</strong> more for Free Express Shipping
                  </span>
                )}
              </div>
              <span className="text-[10px] font-bold text-brand-600 dark:text-brand-400">
                {freeShippingProgress}%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <div className="w-16 h-16 mx-auto rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-base font-bold text-slate-800 dark:text-slate-200">
                  Your cart is empty
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse our high-performance gear and add items to your cart.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.key}
                  className="flex gap-3.5 p-3 rounded-2xl glass border border-slate-200/60 dark:border-slate-800/80 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 w-20 h-20 object-cover rounded-xl shrink-0 border border-slate-200 dark:border-slate-800"
                  />

                  <div className="flex-1 flex flex-col justify-between text-xs">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.key)}
                          className="text-slate-400 hover:text-rose-500 p-0.5"
                          title="Remove item"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-slate-400 text-[11px] mt-0.5">
                        {item.selectedColor && <span>{item.selectedColor}</span>}
                        {item.selectedSize && <span> · {item.selectedSize}</span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="font-extrabold text-sm text-brand-600 dark:text-brand-400">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>

                      <div className="flex items-center glass border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.key, -1)}
                          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.key, 1)}
                          className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Calculations & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 glass space-y-3.5">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="Promo code (ARCUS20, VIP50)"
                    className="w-full pl-9 pr-3 py-2 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none uppercase"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                >
                  Apply
                </button>
              </form>

              {appliedPromo && (
                <div className="flex items-center justify-between text-xs px-3 py-1.5 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 font-semibold">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Coupon <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPercent}% off)</span>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-slate-400 hover:text-rose-500"
                    title="Remove coupon"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* VIP Points Redemption Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs">
                <div>
                  <div className="font-bold text-slate-800 dark:text-amber-300">
                    Redeem Platinum Points
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Use 500 of {userProfile.points} pts for $25 discount
                  </div>
                </div>
                <button
                  onClick={() => setUsePoints(!usePoints)}
                  className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                    usePoints ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      usePoints ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {formatPrice(cartSubtotal)}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-{formatPrice(promoDiscount)}</span>
                  </div>
                )}

                {usePoints && (
                  <div className="flex justify-between text-amber-600 dark:text-amber-400">
                    <span>VIP Points Credit</span>
                    <span>-{formatPrice(pointsDiscount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-slate-800 dark:text-white">
                    {isFreeShipping ? (
                      <span className="text-emerald-500 font-bold">FREE</span>
                    ) : (
                      formatPrice(shippingCost)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-brand-600 dark:text-brand-400 text-base">
                    {formatPrice(cartTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-brand-500/25 active:scale-95 transition-all"
              >
                <span>অর্ডার সম্পন্ন করুন • Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit SSL Encrypted & Protected</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
