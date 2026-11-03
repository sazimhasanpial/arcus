import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle,
  Sparkles,
  Printer,
  ArrowRight,
  ArrowLeft,
  Smartphone,
  Wallet,
  Coins,
  QrCode,
  FileText
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    promoDiscount,
    pointsDiscount,
    shippingCost,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    userProfile,
    showToast
  } = useStore();

  if (!isCheckoutOpen) return null;

  // Checkout Steps: 1 = Shipping, 2 = Payment, 3 = Confirmation / Invoice
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Bangladesh',
    deliveryMethod: 'express'
  });

  // Payment method: 'card' | 'bkash' | 'nagad' | 'bnpl' | 'applepay' | 'cod'
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Credit Card Live State
  const [cardData, setCardData] = useState({
    number: '4829 5500 1284 9912',
    name: 'SAZIM HASAN PIAL',
    expiry: '09/29',
    cvv: '884'
  });
  const [isFlipped, setIsFlipped] = useState(false);

  // Mobile Banking State (bKash / Nagad)
  const [mobileNumber, setMobileNumber] = useState('01712-345678');
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobilePin, setMobilePin] = useState('');

  // Placed Order Info
  const [completedOrder, setCompletedOrder] = useState(null);

  // Auto-Fill Demo Info
  const handleAutoFill = () => {
    setFormData({
      fullName: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address.street,
      city: userProfile.address.city,
      postalCode: userProfile.address.zip,
      country: userProfile.address.country,
      deliveryMethod: 'express'
    });
    showToast('Auto-filled with Sazim Hasan Pial VIP profile details! ✨');
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.address) {
      showToast('Please fill in required shipping fields', 'error');
      return;
    }
    setStep(2);
  };

  const handlePlaceOrder = () => {
    const orderId = `ARC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customer: formData,
      items: [...cart],
      subtotal: cartSubtotal,
      promoDiscount,
      pointsDiscount,
      shipping: shippingCost,
      total: cartTotal,
      paymentMethod,
      carrier: 'DHL Express International / RedX Logistics Banani Hub'
    };

    setCompletedOrder(newOrder);
    setStep(3);
    clearCart();

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // Confetti fallback
    }

    showToast('Order placed successfully! Check your official tax invoice.', 'success');
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCardNumber = (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return val;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Arcus Express Checkout</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold">
                  256-Bit Encrypted
                </span>
              </h2>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span className={step >= 1 ? 'font-bold text-brand-600 dark:text-brand-400' : ''}>
                  1. Shipping
                </span>
                <span>→</span>
                <span className={step >= 2 ? 'font-bold text-brand-600 dark:text-brand-400' : ''}>
                  2. Payment
                </span>
                <span>→</span>
                <span className={step === 3 ? 'font-bold text-emerald-600' : ''}>
                  3. Invoice
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: SHIPPING DETAILS */}
        {step === 1 && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-5">
            {/* 1-Click Demo Auto-Fill Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/25">
              <div className="flex items-center gap-2 text-xs text-brand-700 dark:text-brand-300">
                <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
                <span>
                  Testing checkout? Click to populate verified VIP customer profile automatically.
                </span>
              </div>
              <button
                type="button"
                onClick={handleAutoFill}
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shrink-0 transition-transform active:scale-95 shadow-sm"
              >
                Auto-Fill Demo Info
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Recipient Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sazim Hasan Pial"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sajimhasan12@gmail.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone / Mobile *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+880 1712-345678"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Country
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  <option value="Bangladesh">Bangladesh (DHL / RedX Express)</option>
                  <option value="United States">United States (FedEx Air Cargo)</option>
                  <option value="United Kingdom">United Kingdom (Royal Mail Tracked)</option>
                  <option value="Germany">Germany (DHL Express EU)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Street Address & Apartment *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House 42, Road 11, Banani"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/30"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City / District
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Dhaka"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Postal / ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="1213"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            {/* Delivery Method Selection */}
            <div className="pt-2">
              <label className="block font-semibold text-xs text-slate-700 dark:text-slate-300 mb-2">
                Select Shipping Tier
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'express' })}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.deliveryMethod === 'express'
                      ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/20'
                      : 'border-slate-200 dark:border-slate-800 glass'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-brand-500" />
                      Priority Global Air Cargo
                    </span>
                    <span className="text-brand-600 dark:text-brand-400">
                      {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Delivered in 2-3 Business Days with live tracking
                  </div>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, deliveryMethod: 'standard' })}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    formData.deliveryMethod === 'standard'
                      ? 'border-brand-500 bg-brand-500/10'
                      : 'border-slate-200 dark:border-slate-800 glass'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
                    <span>Standard Surface Ground</span>
                    <span>{formatPrice(0)}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
                    Delivered in 5-7 Business Days
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Cart Total: <strong className="text-slate-900 dark:text-white text-sm">{formatPrice(cartTotal)}</strong>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT & 3D CARD / BKASH / NAGAD */}
        {step === 2 && (
          <div className="p-6 space-y-6">
            {/* Gateway Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-500 bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card</span>
              </button>

              <button
                onClick={() => setPaymentMethod('bkash')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-500 bg-pink-500/10 text-pink-600 dark:text-pink-400 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Smartphone className="w-4 h-4 text-pink-500" />
                <span>bKash</span>
              </button>

              <button
                onClick={() => setPaymentMethod('nagad')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-amber-600 bg-amber-600/10 text-amber-600 dark:text-amber-400 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Wallet className="w-4 h-4 text-amber-600" />
                <span>Nagad</span>
              </button>

              <button
                onClick={() => setPaymentMethod('bnpl')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'bnpl'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Coins className="w-4 h-4 text-purple-500" />
                <span>4x BNPL</span>
              </button>

              <button
                onClick={() => setPaymentMethod('applepay')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'applepay'
                    ? 'border-slate-900 dark:border-white bg-slate-900/10 dark:bg-white/10 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Apple Pay</span>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Truck className="w-4 h-4 text-emerald-500" />
                <span>COD</span>
              </button>
            </div>

            {/* PAYMENT CONTENT SWITCHER */}
            {paymentMethod === 'card' && (
              <div className="space-y-6">
                {/* 3D LIVE CREDIT CARD PREVIEW */}
                <div className="flex justify-center perspective-1000">
                  <div
                    className={`relative w-80 sm:w-96 h-52 rounded-2xl shadow-2xl transition-transform duration-700 transform-style-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-slate-900 via-indigo-950 to-brand-900 text-white backface-hidden border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
                      <div className="absolute -top-12 -right-12 w-44 h-44 bg-brand-500/30 rounded-full blur-2xl" />
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 border border-amber-200 shadow-sm" />
                          <span className="text-[11px] font-mono tracking-widest text-slate-300">
                            ARCUS PLATINUM
                          </span>
                        </div>
                        <span className="font-mono text-sm font-bold tracking-widest">
                          VISA
                        </span>
                      </div>

                      <div className="font-mono text-lg sm:text-xl tracking-widest font-bold text-center text-slate-100 relative z-10 py-2">
                        {cardData.number || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono relative z-10">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">
                            Cardholder
                          </div>
                          <div className="font-semibold tracking-wider uppercase text-white truncate max-w-[170px]">
                            {cardData.name || 'YOUR NAME'}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">
                            Expires
                          </div>
                          <div className="font-semibold tracking-wider text-white">
                            {cardData.expiry || 'MM/YY'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Back of Card (Flipped when CVV focused) */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-slate-950 to-slate-900 text-white rotate-y-180 backface-hidden border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
                      <div className="w-full h-10 bg-black mt-2 -mx-6 px-6" />
                      <div className="space-y-1">
                        <div className="text-[9px] uppercase tracking-wider text-right text-slate-400 mr-2">
                          CVV Security Code
                        </div>
                        <div className="w-full bg-white h-8 rounded text-slate-950 font-mono font-bold flex items-center justify-end px-3">
                          {cardData.cvv || '•••'}
                        </div>
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono text-center">
                        This virtual demo card is encrypted for instant checkout testing.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      maxLength={19}
                      value={cardData.number}
                      onChange={(e) =>
                        setCardData({ ...cardData, number: formatCardNumber(e.target.value) })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white uppercase focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        maxLength={5}
                        value={cardData.expiry}
                        onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none text-center"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        CVV Code
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        value={cardData.cvv}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                        className="w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* bKash Flow */}
            {paymentMethod === 'bkash' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-600/10 via-pink-500/5 to-transparent border border-pink-500/30 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-pink-600 text-white font-bold flex items-center justify-center text-xs">
                      bK
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        bKash Direct Gateway
                      </div>
                      <div className="text-slate-500">Merchant Account: 01712-345678 (Verified)</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-[10px]">
                    Instant Pay
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Your bKash Account Number
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      bKash PIN (Simulated Demo)
                    </label>
                    <input
                      type="password"
                      maxLength={5}
                      value={mobilePin}
                      onChange={(e) => setMobilePin(e.target.value)}
                      placeholder="•••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-center text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  By confirming, a secure verification token is automatically validated against the bKash API.
                </p>
              </div>
            )}

            {/* Nagad Flow */}
            {paymentMethod === 'nagad' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-600/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-600 text-white font-bold flex items-center justify-center text-xs">
                    NG
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-sm">
                      Nagad Digital Wallet
                    </div>
                    <div className="text-slate-500">Government Postal Merchant Certified</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nagad Mobile Number
                    </label>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Nagad 4-Digit PIN
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={mobilePin}
                      onChange={(e) => setMobilePin(e.target.value)}
                      placeholder="••••"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-center text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* BNPL 4 Installment Calculator */}
            {paymentMethod === 'bnpl' && (
              <div className="p-5 rounded-2xl glass border border-purple-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white text-sm">
                  <span>Arcus SplitPay — 4 Bi-Weekly Installments</span>
                  <span className="text-purple-600 dark:text-purple-400 font-black">
                    0% APR Interest
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 pt-2 text-center">
                  <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="text-[10px] text-slate-400">Due Today</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(cartTotal / 4)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl glass border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400">In 2 Weeks</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(cartTotal / 4)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl glass border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400">In 4 Weeks</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(cartTotal / 4)}
                    </div>
                  </div>
                  <div className="p-2.5 rounded-xl glass border border-slate-200 dark:border-slate-800">
                    <div className="text-[10px] text-slate-400">In 6 Weeks</div>
                    <div className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(cartTotal / 4)}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Apple / Google Pay */}
            {paymentMethod === 'applepay' && (
              <div className="p-8 rounded-2xl glass border border-slate-200 dark:border-slate-800 text-center space-y-3">
                <Sparkles className="w-8 h-8 text-brand-500 mx-auto" />
                <div className="font-bold text-slate-900 dark:text-white text-sm">
                  Biometric 1-Tap Checkout Ready
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click below to confirm with Touch ID, Face ID, or your default Google Wallet.
                </p>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="p-5 rounded-2xl glass border border-emerald-500/30 space-y-2 text-xs">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Cash on Delivery Verified</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300">
                  You will pay {formatPrice(cartTotal)} in cash or mobile banking to the courier upon physical inspection and handover.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Shipping</span>
              </button>

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-brand-500/30 active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Complete Purchase ({formatPrice(cartTotal)})</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & OFFICIAL PRINTABLE TAX INVOICE */}
        {step === 3 && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center space-y-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-bounce">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Payment Authorized & Order Confirmed!
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Thank you, <strong>{completedOrder.customer.fullName}</strong>. Your items have been allocated for global priority air dispatch.
              </p>
            </div>

            {/* OFFICIAL TAX INVOICE CARD (Printable) */}
            <div
              id="printable-invoice"
              className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-lg space-y-4 font-sans text-xs"
            >
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-xl font-black tracking-tight text-slate-900">ARCUS GLOBAL</div>
                  <div className="text-[10px] text-slate-500">Official Commercial Tax Invoice</div>
                  <div className="text-[10px] text-slate-500 mt-1">VAT/BIN: BD-8492019-X</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-brand-600">
                    {completedOrder.id}
                  </div>
                  <div className="text-[11px] text-slate-500">{completedOrder.date}</div>
                  <div className="text-[10px] uppercase font-semibold text-emerald-600">
                    PAID · {completedOrder.paymentMethod.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Billed To / Shipped To */}
              <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-200 text-[11px]">
                <div>
                  <strong className="block text-slate-500 text-[10px] uppercase">Billed / Shipped To:</strong>
                  <div className="font-bold text-slate-800">{completedOrder.customer.fullName}</div>
                  <div>{completedOrder.customer.address}</div>
                  <div>
                    {completedOrder.customer.city}, {completedOrder.customer.postalCode}
                  </div>
                  <div>{completedOrder.customer.country}</div>
                  <div className="text-slate-500 mt-0.5">{completedOrder.customer.phone}</div>
                </div>

                <div className="text-right">
                  <strong className="block text-slate-500 text-[10px] uppercase">Carrier & Dispatch:</strong>
                  <div className="font-semibold">{completedOrder.carrier}</div>
                  <div className="text-slate-500">Tracking: ARC-TRK-982410-INTL</div>
                  <div className="text-slate-500">Dispatch Window: Within 4 Hours</div>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="w-full text-left border-collapse my-2 text-[11px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2">Item</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-medium">
                        {it.product.name}
                        <span className="text-[10px] text-slate-400 block">
                          {it.selectedColor} / {it.selectedSize}
                        </span>
                      </td>
                      <td className="py-2 text-center">{it.quantity}</td>
                      <td className="py-2 text-right">${it.product.price}</td>
                      <td className="py-2 text-right font-semibold">
                        ${it.product.price * it.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Calculations */}
              <div className="pt-2 border-t border-slate-200 space-y-1 text-right text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Subtotal:</span>
                  <span className="font-semibold">${completedOrder.subtotal}</span>
                </div>
                {completedOrder.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount:</span>
                    <span>-${completedOrder.promoDiscount}</span>
                  </div>
                )}
                {completedOrder.pointsDiscount > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>VIP Points Credit:</span>
                    <span>-${completedOrder.pointsDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Shipping:</span>
                  <span>{completedOrder.shipping === 0 ? 'FREE' : `$${completedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-slate-200 pt-1 text-slate-900">
                  <span>Grand Total:</span>
                  <span className="text-brand-600">${completedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl glass border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Tax Invoice</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Return to Storefront
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
