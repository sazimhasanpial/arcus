import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { BD_DISTRICTS, BD_COURIERS, BD_BUSINESS_CREDENTIALS } from '../data/bdLocations';
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
  Lock,
  AlertTriangle,
  RotateCcw,
  Check,
  Building2,
  FileText
} from 'lucide-react';

export default function CheckoutModal() {
  const {
    cart,
    cartTotal,
    cartSubtotal,
    promoDiscount,
    pointsDiscount,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    formatPrice,
    userProfile,
    showToast,
    currency
  } = useStore();

  if (!isCheckoutOpen) return null;

  // Checkout Steps: 1 = Shipping, 2 = Payment Selection, 3 = 2FA OTP / Bank Security Check, 4 = Final Invoice
  const [step, setStep] = useState(1);

  // Bangladesh Location & Delivery Form State
  const [formData, setFormData] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    district: 'Dhaka',
    area: 'Banani',
    address: 'House 42, Road 11, Block D',
    postalCode: '1213',
    courier: 'pathao',
    notes: 'Please call before delivery. Open-box inspection requested.'
  });

  // Selected district object
  const currentDistrictObj = BD_DISTRICTS.find((d) => d.name === formData.district) || BD_DISTRICTS[0];
  const calculatedShippingCost = formData.district === 'Dhaka' ? 60 : 120;
  const isFreeDeliveryEligible = cartSubtotal >= 200;
  const finalShippingAmount = isFreeDeliveryEligible ? 0 : calculatedShippingCost;

  // Payment method: 'bkash' | 'nagad' | 'card' | 'rocket' | 'cod' | 'bnpl'
  const [paymentMethod, setPaymentMethod] = useState('bkash');

  // Credit Card Live State
  const [cardData, setCardData] = useState({
    number: '4829 5500 1284 9912',
    name: 'SAZIM HASAN PIAL',
    expiry: '09/29',
    cvv: '884',
    bank: 'City Bank AMEX'
  });
  const [isFlipped, setIsFlipped] = useState(false);

  // MFS Mobile Banking & Security Verification State
  const [mobileNumber, setMobileNumber] = useState('01712-345678');
  const [mfsOtp, setMfsOtp] = useState('482910');
  const [mfsPin, setMfsPin] = useState('');
  const [otpTimer, setOtpTimer] = useState(30);
  const [isOtpSent, setIsOtpSent] = useState(false);

  // Transaction ID and Completed Order
  const [completedOrder, setCompletedOrder] = useState(null);

  // OTP Countdown timer
  useEffect(() => {
    let interval;
    if (step === 3 && otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, otpTimer]);

  // Auto-Fill Demo Profile
  const handleAutoFill = () => {
    setFormData({
      fullName: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      district: 'Dhaka',
      area: 'Banani',
      address: 'House 42, Road 11, Block D, Banani',
      postalCode: '1213',
      courier: 'pathao',
      notes: 'Please call before delivery. Open-box parcel inspection.'
    });
    showToast('Auto-filled with verified Dhaka VIP profile info! 🇧🇩');
  };

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      showToast('Please fill in recipient name, mobile number, and address', 'error');
      return;
    }
    setStep(2);
  };

  // Trigger Security 2FA / Bank OTP verification screen
  const handleInitiateTransaction = () => {
    if (paymentMethod === 'cod') {
      // COD bypasses OTP and completes directly
      finalizeOrder('COD-PENDING-COLLECTION');
      return;
    }

    setOtpTimer(30);
    setIsOtpSent(true);
    setStep(3); // Go to 2FA / 3D Secure screen
    showToast(`SMS Security OTP sent to ${mobileNumber}! Check your verification code.`, 'info');
  };

  const handleResendOtp = () => {
    setOtpTimer(30);
    showToast('A new 6-digit security OTP code was dispatched!', 'success');
  };

  const finalizeOrder = (trxCode) => {
    const orderId = `ARC-BD-${Math.floor(100000 + Math.random() * 900000)}`;
    const generatedTrx =
      trxCode ||
      (paymentMethod === 'bkash'
        ? `BKS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        : paymentMethod === 'nagad'
        ? `NGD-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        : paymentMethod === 'rocket'
        ? `RKT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        : `3DS-${Math.random().toString(36).substring(2, 10).toUpperCase()}`);

    const selectedCourierObj = BD_COURIERS.find((c) => c.id === formData.courier) || BD_COURIERS[0];

    const newOrder = {
      id: orderId,
      trxId: generatedTrx,
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
      shipping: finalShippingAmount,
      total: cartTotal + (finalShippingAmount === 0 ? 0 : finalShippingAmount / 121.5),
      paymentMethod,
      courier: selectedCourierObj,
      vatRegistration: BD_BUSINESS_CREDENTIALS.tinBin,
      dbid: BD_BUSINESS_CREDENTIALS.dbid
    };

    setCompletedOrder(newOrder);
    setStep(4);
    clearCart();

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}

    showToast('Transaction confirmed! 256-Bit SSL token verified.', 'success');
  };

  const formatCardNumber = (val) => {
    const v = val.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : val;
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
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Arcus Secure Checkout — Bangladesh
                </h2>
                <span className="text-xs">🇧🇩</span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                  DBID: {BD_BUSINESS_CREDENTIALS.dbid}
                </span>
                <span>·</span>
                <span>256-Bit SSL Encryption</span>
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

        {/* STEP 1: BANGLADESH DELIVERY DETAILS */}
        {step === 1 && (
          <form onSubmit={handleNextToPayment} className="p-6 space-y-5">
            {/* 1-Click Demo Auto-Fill Banner */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/25">
              <div className="flex items-center gap-2 text-xs text-brand-700 dark:text-brand-300">
                <Sparkles className="w-4 h-4 text-brand-500 shrink-0" />
                <span>
                  Testing from Bangladesh? Auto-fill Sazim Hasan Pial's Banani, Dhaka VIP address.
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
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Sazim Hasan Pial"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Bangladeshi Mobile Number * (For SMS OTP & Courier Call)
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="01712-345678"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Division / District (জেলা) *
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => {
                    const newDistrict = e.target.value;
                    const dObj = BD_DISTRICTS.find((d) => d.name === newDistrict);
                    setFormData({
                      ...formData,
                      district: newDistrict,
                      area: dObj?.areas[0] || 'Center'
                    });
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  {BD_DISTRICTS.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} ({d.deliveryTime})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Area / Thana (থানা / এলাকা) *
                </label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                >
                  {currentDistrictObj.areas.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Street Address (House, Road, Block/Sector) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. House 42, Road 11, Block D"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Bangladeshi Courier Service
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BD_COURIERS.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setFormData({ ...formData, courier: c.id })}
                      className={`p-2.5 rounded-xl border cursor-pointer text-center transition-all ${
                        formData.courier === c.id
                          ? 'border-brand-500 bg-brand-500/10 ring-2 ring-brand-500/20 font-bold'
                          : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <div className="text-base">{c.icon}</div>
                      <div className="text-xs truncate mt-0.5">{c.name.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400">{c.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Delivery Charge Note */}
            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Delivery Charge ({formData.district === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka'}):
              </span>
              <span className="font-bold text-slate-900 dark:text-white">
                {isFreeDeliveryEligible ? (
                  <span className="text-emerald-500">FREE (VIP Threshold)</span>
                ) : (
                  `৳ ${calculatedShippingCost}`
                )}
              </span>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Order Total: <strong className="text-slate-900 dark:text-white text-sm">{formatPrice(cartTotal)}</strong>
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-brand-500/25 transition-all"
              >
                <span>Continue to Payment & Security</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD & GATEWAY SELECTION */}
        {step === 2 && (
          <div className="p-6 space-y-5">
            {/* Bangladesh Payment Gateway Tabs */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-xs">
              <button
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-pink-500 bg-pink-500/15 text-pink-600 dark:text-pink-400 font-bold ring-2 ring-pink-500/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="w-5 h-5 rounded-md bg-pink-600 text-white font-bold text-[10px] flex items-center justify-center">
                  bK
                </div>
                <span>bKash</span>
              </button>

              <button
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-amber-600 bg-amber-600/15 text-amber-600 dark:text-amber-400 font-bold ring-2 ring-amber-600/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="w-5 h-5 rounded-md bg-amber-600 text-white font-bold text-[10px] flex items-center justify-center">
                  NG
                </div>
                <span>Nagad</span>
              </button>

              <button
                onClick={() => setPaymentMethod('rocket')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'rocket'
                    ? 'border-purple-600 bg-purple-600/15 text-purple-600 dark:text-purple-400 font-bold ring-2 ring-purple-600/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="w-5 h-5 rounded-md bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center">
                  DB
                </div>
                <span>Rocket</span>
              </button>

              <button
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'card'
                    ? 'border-brand-500 bg-brand-500/15 text-brand-600 dark:text-brand-400 font-bold ring-2 ring-brand-500/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Card (3DS)</span>
              </button>

              <button
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-emerald-500 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold ring-2 ring-emerald-500/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Truck className="w-5 h-5 text-emerald-500" />
                <span>Cash on Delivery</span>
              </button>

              <button
                onClick={() => setPaymentMethod('bnpl')}
                className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1 font-semibold transition-all ${
                  paymentMethod === 'bnpl'
                    ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-bold ring-2 ring-indigo-500/30'
                    : 'glass border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <Coins className="w-5 h-5 text-indigo-500" />
                <span>4x SplitPay</span>
              </button>
            </div>

            {/* bKash Payment Form */}
            {paymentMethod === 'bkash' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-pink-600/15 via-pink-500/5 to-transparent border border-pink-500/30 space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-pink-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                      bKash
                    </div>
                    <div>
                      <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                        bKash Official Merchant Payment
                      </div>
                      <div className="text-slate-500">Merchant No: 01712-345678 · ARCUS BD</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-600 dark:text-pink-400 font-bold text-[10px]">
                    Instant 2FA Token
                  </span>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Your bKash Account Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-900 dark:text-white"
                  />
                  <p className="text-[11px] text-slate-500">
                    An SMS verification OTP will be sent to this number to authenticate the transaction securely.
                  </p>
                </div>
              </div>
            )}

            {/* Nagad Payment Form */}
            {paymentMethod === 'nagad' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-600/15 via-amber-500/5 to-transparent border border-amber-500/30 space-y-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                    Nagad
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                      Nagad Digital Payment
                    </div>
                    <div className="text-slate-500">Post Office Merchant Certified · Arcus Bangladesh</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Your Nagad Account Mobile Number
                  </label>
                  <input
                    type="text"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Rocket Form */}
            {paymentMethod === 'rocket' && (
              <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-600/15 via-purple-500/5 to-transparent border border-purple-500/30 space-y-4 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                    DBBL
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                      Dutch-Bangla Bank Rocket Payment
                    </div>
                    <div className="text-slate-500">Direct DBBL Payment Engine</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    12-Digit Rocket Account Number (11-digit mobile + 1-digit check number)
                  </label>
                  <input
                    type="text"
                    value={`${mobileNumber}-2`}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            )}

            {/* Credit / Debit Card (with 3D Live Card) */}
            {paymentMethod === 'card' && (
              <div className="space-y-5 text-xs">
                {/* 3D LIVE CREDIT CARD PREVIEW */}
                <div className="flex justify-center perspective-1000">
                  <div
                    className={`relative w-80 sm:w-96 h-52 rounded-2xl shadow-2xl transition-transform duration-700 transform-style-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-slate-900 via-indigo-950 to-brand-900 text-white backface-hidden border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
                      <div className="flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-7 rounded-md bg-gradient-to-tr from-amber-300 to-amber-500 border border-amber-200 shadow-sm" />
                          <span className="text-[11px] font-mono tracking-widest text-slate-300 uppercase">
                            {cardData.bank}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold tracking-widest bg-white/20 px-2 py-0.5 rounded">
                          3D SECURE
                        </span>
                      </div>

                      <div className="font-mono text-lg sm:text-xl tracking-widest font-bold text-center text-slate-100 relative z-10 py-2">
                        {cardData.number || '•••• •••• •••• ••••'}
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono relative z-10">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">Cardholder</div>
                          <div className="font-semibold tracking-wider uppercase text-white truncate max-w-[170px]">
                            {cardData.name}
                          </div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-400">Expires</div>
                          <div className="font-semibold tracking-wider text-white">{cardData.expiry}</div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 bg-gradient-to-tr from-slate-950 to-slate-900 text-white rotate-y-180 backface-hidden border border-white/20 shadow-2xl flex flex-col justify-between overflow-hidden">
                      <div className="w-full h-10 bg-black mt-2 -mx-6 px-6" />
                      <div className="space-y-1">
                        <div className="text-[9px] uppercase tracking-wider text-right text-slate-400 mr-2">CVV</div>
                        <div className="w-full bg-white h-8 rounded text-slate-950 font-mono font-bold flex items-center justify-end px-3">
                          {cardData.cvv}
                        </div>
                      </div>
                      <div className="text-[9px] text-slate-400 font-mono text-center">
                        Verified by Visa / Mastercard Identity Check Bangladesh
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Bangladeshi Bank
                    </label>
                    <select
                      value={cardData.bank}
                      onChange={(e) => setCardData({ ...cardData, bank: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="City Bank AMEX">City Bank (AMEX / Visa)</option>
                      <option value="BRAC Bank Visa">BRAC Bank (Visa Signature / Platinum)</option>
                      <option value="Eastern Bank (EBL)">Eastern Bank (EBL Mastercard)</option>
                      <option value="DBBL NexusPay">Dutch-Bangla Bank (DBBL Nexus)</option>
                      <option value="Standard Chartered BD">Standard Chartered Bangladesh</option>
                    </select>
                  </div>

                  <div>
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-slate-900 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Cash on Delivery */}
            {paymentMethod === 'cod' && (
              <div className="p-5 rounded-2xl glass border border-emerald-500/30 space-y-3 text-xs">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Open-Box Cash on Delivery Guaranteed</span>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  The {formData.courier.toUpperCase()} delivery rider will hand you the parcel at {formData.area}, {formData.district}. You can inspect the physical warranty seal before paying in cash or via mobile QR scan.
                </p>
                <div className="flex items-center gap-2 text-slate-500 font-semibold text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Zero upfront payment required. 100% Risk-Free.</span>
                </div>
              </div>
            )}

            {/* BNPL SplitPay */}
            {paymentMethod === 'bnpl' && (
              <div className="p-5 rounded-2xl glass border border-indigo-500/30 space-y-3 text-xs">
                <div className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">
                  Arcus SplitPay — 4 Installments (0% Interest)
                </div>
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-indigo-500/10 font-bold">
                    <div className="text-[10px] text-slate-400">Today</div>
                    <div>{formatPrice(cartTotal / 4)}</div>
                  </div>
                  <div className="p-2 rounded-xl glass font-bold">
                    <div className="text-[10px] text-slate-400">Day 15</div>
                    <div>{formatPrice(cartTotal / 4)}</div>
                  </div>
                  <div className="p-2 rounded-xl glass font-bold">
                    <div className="text-[10px] text-slate-400">Day 30</div>
                    <div>{formatPrice(cartTotal / 4)}</div>
                  </div>
                  <div className="p-2 rounded-xl glass font-bold">
                    <div className="text-[10px] text-slate-400">Day 45</div>
                    <div>{formatPrice(cartTotal / 4)}</div>
                  </div>
                </div>
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
                <span>Back to Delivery</span>
              </button>

              <button
                type="button"
                onClick={handleInitiateTransaction}
                className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-brand-500/30 active:scale-95 transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>
                  {paymentMethod === 'cod' ? 'Confirm Cash on Delivery' : 'Proceed to Security Verification'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: 2FA SMS OTP & BANK PIN VERIFICATION MODAL */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-6 text-xs animate-fadeIn">
            <div className="text-center space-y-2 pb-2">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-pink-500/10 text-pink-600 flex items-center justify-center shadow-lg">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {paymentMethod === 'card'
                  ? '3D Secure 2.0 Bank Verification'
                  : `${paymentMethod.toUpperCase()} Two-Factor Authentication`}
              </h3>
              <p className="text-slate-500 max-w-sm mx-auto text-xs">
                A 6-digit security token was dispatched to your registered Bangladeshi mobile{' '}
                <strong className="text-slate-800 dark:text-slate-200">{mobileNumber}</strong>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-4">
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Enter 6-Digit SMS Verification OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={mfsOtp}
                  onChange={(e) => setMfsOtp(e.target.value)}
                  className="w-full text-center font-mono text-2xl font-bold tracking-widest py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-brand-500 text-slate-900 dark:text-white focus:outline-none ring-2 ring-brand-500/20"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                  Enter {paymentMethod.toUpperCase()} PIN
                </label>
                <input
                  type="password"
                  maxLength={5}
                  value={mfsPin}
                  onChange={(e) => setMfsPin(e.target.value)}
                  placeholder="•••••"
                  className="w-full text-center font-mono text-2xl font-bold tracking-widest py-3 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-slate-500">
                  Resend token in: <strong className="text-brand-600 font-mono">{otpTimer}s</strong>
                </span>
                <button
                  type="button"
                  disabled={otpTimer > 0}
                  onClick={handleResendOtp}
                  className={`font-bold ${otpTimer === 0 ? 'text-brand-600 hover:underline' : 'text-slate-400'}`}
                >
                  Resend OTP
                </button>
              </div>

              <button
                type="button"
                onClick={() => finalizeOrder()}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-xl shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Verify & Authorize Transaction</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: OFFICIAL BANGLADESH VAT TAX INVOICE & ORDER CONFIRMATION */}
        {step === 4 && completedOrder && (
          <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            <div className="text-center space-y-2 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 mx-auto rounded-3xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center animate-bounce shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Transaction Verified & Approved!
              </h3>
              <p className="text-xs text-slate-500">
                Payment authorized via <strong>{completedOrder.paymentMethod.toUpperCase()}</strong>. Transaction ID:{' '}
                <strong className="font-mono text-emerald-600 dark:text-emerald-400">{completedOrder.trxId}</strong>
              </p>
            </div>

            {/* OFFICIAL MUSHAK-6.3 COMPLIANT BANGLADESH TAX INVOICE */}
            <div
              id="printable-invoice"
              className="p-6 rounded-2xl bg-white text-slate-900 border border-slate-200 shadow-xl space-y-4 font-sans text-xs"
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                <div>
                  <div className="text-2xl font-black tracking-tight text-slate-900">ARCUS BANGLADESH</div>
                  <div className="text-[10px] text-slate-500">Ministry of Commerce Certified (DBID: {completedOrder.dbid})</div>
                  <div className="text-[10px] font-mono text-slate-600 mt-0.5">
                    VAT Registration / {completedOrder.vatRegistration}
                  </div>
                  <div className="text-[10px] text-slate-500">Trade License: {BD_BUSINESS_CREDENTIALS.tradeLicense}</div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-sm text-brand-600">{completedOrder.id}</div>
                  <div className="text-[10px] font-mono text-emerald-600 font-bold">TRX: {completedOrder.trxId}</div>
                  <div className="text-[11px] text-slate-500">{completedOrder.date}</div>
                  <div className="text-[10px] uppercase font-bold text-emerald-600 mt-1">
                    STATUS: PAID · 3D SECURE VERIFIED
                  </div>
                </div>
              </div>

              {/* Customer & Courier Logistics Info */}
              <div className="grid grid-cols-2 gap-4 py-2 border-b border-slate-200 text-[11px]">
                <div>
                  <strong className="block text-slate-500 text-[10px] uppercase">Delivery Recipient:</strong>
                  <div className="font-bold text-slate-800">{completedOrder.customer.fullName}</div>
                  <div>{completedOrder.customer.address}</div>
                  <div>
                    {completedOrder.customer.area}, {completedOrder.customer.district}
                  </div>
                  <div className="font-mono text-slate-600">{completedOrder.customer.phone}</div>
                </div>

                <div className="text-right">
                  <strong className="block text-slate-500 text-[10px] uppercase">Logistics & Courier:</strong>
                  <div className="font-bold text-slate-800">{completedOrder.courier.name}</div>
                  <div className="text-slate-500">Dispatch Hub: Banani Central Sorting Hub</div>
                  <div className="text-slate-500">Delivery Window: {completedOrder.courier.time}</div>
                </div>
              </div>

              {/* Itemized Table with 5% VAT Calculation */}
              <table className="w-full text-left border-collapse my-2 text-[11px]">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500">
                    <th className="py-2">Item Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Unit Price</th>
                    <th className="py-2 text-right">Total (USD/BDT)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-medium">
                        {it.product.name}
                        <span className="text-[10px] text-slate-400 block">
                          {it.selectedColor} · {it.selectedSize}
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

              {/* Price Breakdown */}
              <div className="pt-2 border-t border-slate-200 space-y-1 text-right text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">Item Subtotal:</span>
                  <span className="font-semibold">${completedOrder.subtotal}</span>
                </div>
                {completedOrder.promoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount Coupon Applied:</span>
                    <span>-${completedOrder.promoDiscount}</span>
                  </div>
                )}
                {completedOrder.pointsDiscount > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>VIP Loyalty Points Credit:</span>
                    <span>-${completedOrder.pointsDiscount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Courier Shipping ({completedOrder.customer.district}):</span>
                  <span>{completedOrder.shipping === 0 ? 'FREE (Eligible)' : `৳ ${completedOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-slate-200 pt-1 text-slate-900">
                  <span>Grand Total Paid:</span>
                  <span className="text-brand-600">${completedOrder.total}</span>
                </div>
              </div>

              {/* Trust Footer */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span>Certified by e-CAB & Ministry of Commerce BD</span>
                <span>256-Bit SSL Secured Transaction</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl glass border border-slate-200 dark:border-slate-800 text-xs font-bold flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Official Tax Invoice / Save PDF</span>
              </button>

              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Done & Return to Store
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
