import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  User,
  ShieldCheck,
  Award,
  Package,
  Clock,
  Truck,
  CheckCircle,
  CreditCard,
  MapPin,
  Sparkles,
  ArrowRight,
  RefreshCw,
  Lock,
  Phone,
  FileText,
  KeyRound,
  Download,
  Mail,
  Send,
  Check
} from 'lucide-react';

export default function UserDashboardModal() {
  const {
    userProfile,
    isAccountOpen,
    setIsAccountOpen,
    simulateNextOrderStep,
    verifyUserEmail,
    sendVerificationEmail,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('tracking'); // 'tracking' | 'verification' | 'transactions' | 'security'
  const [verificationCode, setVerificationCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  if (!isAccountOpen) return null;

  const order = userProfile.currentOrder;
  const currentStep = order.statusStep;

  const handleSendCode = () => {
    setCodeSent(true);
    sendVerificationEmail();
    setResendTimer(45);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerify = (e) => {
    e?.preventDefault();
    verifyUserEmail(verificationCode || '849201');
  };

  const handleAutoFill = () => {
    setVerificationCode('849201');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500 shadow-md bg-slate-800"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                }}
              />
              {userProfile.emailVerified && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow" title="Email Verified Account">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {userProfile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-[11px] border border-amber-500/20">
                  {userProfile.tier}
                </span>

                {/* Email Verification Status Badge */}
                {userProfile.emailVerified ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-[10px] border border-emerald-500/30">
                    <CheckCircle className="w-3 h-3 text-emerald-500" />
                    <span>Verified with Email</span>
                  </span>
                ) : (
                  <button
                    onClick={() => setActiveTab('verification')}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] border border-amber-500/30 transition-all active:scale-95 animate-pulse"
                    title="Click to Verify Email"
                  >
                    <Mail className="w-3 h-3" />
                    <span>Verify with Mail</span>
                  </button>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {userProfile.email} · {userProfile.phone} · {userProfile.address.area}, Dhaka
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
            aria-label="Close Account Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 text-xs font-bold gap-4 sm:gap-6 bg-slate-100/50 dark:bg-slate-900/50 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'tracking'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Pathao Live Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('verification')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'verification'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Email Verification</span>
            {userProfile.emailVerified ? (
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            ) : (
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'transactions'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Transaction History</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap ${
              activeTab === 'security'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Security & 2FA</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[70vh]">
          {/* TAB 1: TRACKING */}
          {activeTab === 'tracking' && (
            <div className="space-y-6">
              {/* VIP Rewards Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-brand-500/15 to-purple-500/15 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs uppercase font-extrabold tracking-wider text-amber-500 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    <span>Platinum VIP Membership Rewards</span>
                  </div>
                  <div className="text-2xl font-black text-slate-900 dark:text-white">
                    {userProfile.points.toLocaleString()} Points Available
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Worth ৳14,880 in store credit + Free Priority Doorstep Delivery across Bangladesh.
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-white/80 dark:bg-slate-900/80 font-bold text-xs text-amber-600 dark:text-amber-400 shadow-sm border border-amber-500/20">
                    Top 1% VIP Elite
                  </span>
                </div>
              </div>

              {/* INTERACTIVE 5-STEP LIVE PACKAGE TRACKER */}
              <div className="p-4 sm:p-6 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                      <Package className="w-4 h-4 text-brand-500" />
                      <span>Live Parcel Dispatch: {order.id}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Carrier: {order.carrier} · Tracking #{order.trackingNumber}
                    </div>
                    {order.rider && (
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1.5">
                        <Phone className="w-3 h-3" />
                        <span>Assigned Rider: {order.rider}</span>
                      </div>
                    )}
                  </div>

                  {/* Simulation button */}
                  <button
                    onClick={simulateNextOrderStep}
                    className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Simulate Next Delivery Step</span>
                  </button>
                </div>

                {/* Step Progress Line */}
                <div className="relative pt-2 pb-4">
                  <div className="grid grid-cols-5 gap-2 relative z-10 text-center">
                    {order.steps.map((s, idx) => {
                      const isDone = idx <= currentStep;
                      const isCurrent = idx === currentStep;

                      return (
                        <div key={idx} className="flex flex-col items-center">
                          <div
                            className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs transition-all duration-500 ${
                              isDone
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                                : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                            } ${isCurrent ? 'ring-4 ring-emerald-500/30 scale-110' : ''}`}
                          >
                            {isDone ? <CheckCircle className="w-4 h-4" /> : idx + 1}
                          </div>

                          <div className="font-bold text-[10px] sm:text-[11px] text-slate-900 dark:text-white mt-2 leading-tight">
                            {s.title}
                          </div>

                          <div className="text-[9px] sm:text-[10px] text-slate-400 mt-0.5 hidden sm:block">
                            {s.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="absolute top-6 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-0">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${(currentStep / 4) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Status Callout */}
                <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs">
                  <Truck className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      Current Stage: {order.steps[currentStep]?.title}
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                      {order.steps[currentStep]?.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EMAIL VERIFICATION */}
          {activeTab === 'verification' && (
            <div className="space-y-5 text-xs">
              <div className="p-5 sm:p-6 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        User Profile Email Verification
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Official Google Mail Authenticator for Sazim Hasan Pial
                      </p>
                    </div>
                  </div>

                  {userProfile.emailVerified ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-extrabold text-xs flex items-center gap-1 border border-emerald-500/30">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Verified</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-extrabold text-xs flex items-center gap-1 border border-amber-500/30">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pending Verification</span>
                    </span>
                  )}
                </div>

                {/* Email Address details */}
                <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                      Registered Email Address
                    </div>
                    <div className="text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5">
                      {userProfile.email}
                    </div>
                  </div>

                  {userProfile.emailVerified && (
                    <div className="text-right">
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                        Authenticated via Google Workspace
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Verified: {userProfile.emailVerifiedAt || 'Today'}
                      </div>
                    </div>
                  )}
                </div>

                {/* If verified already */}
                {userProfile.emailVerified ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/25 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-500" />
                      <span>Account Fully Verified & Certified</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      Your email address <strong>{userProfile.email}</strong> has been authenticated with 256-bit cryptographically secured token credentials. You now enjoy priority VIP fulfillment, instant automated Mushak-6.3 invoices, and seamless 1-click checkout.
                    </p>
                    <button
                      onClick={() => handleSendCode()}
                      className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                    >
                      Need to test verification again? Click to re-send OTP code.
                    </button>
                  </div>
                ) : (
                  /* If not verified */
                  <div className="space-y-4 pt-1">
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      Protect your orders and verify your ownership of <strong>{userProfile.email}</strong> to activate 2FA security and Platinum VIP benefits.
                    </p>

                    {!codeSent ? (
                      <button
                        onClick={handleSendCode}
                        className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send 6-Digit Verification Code to {userProfile.email}</span>
                      </button>
                    ) : (
                      <form onSubmit={handleVerify} className="space-y-3 p-4 rounded-xl bg-slate-100/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            Enter 6-Digit Email Code:
                          </span>
                          <button
                            type="button"
                            onClick={handleAutoFill}
                            className="text-brand-600 dark:text-brand-400 font-bold text-[11px] hover:underline flex items-center gap-1"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>1-Click Auto Fill (849201)</span>
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="Enter 849201"
                            className="flex-1 py-2.5 px-3 rounded-xl text-center font-mono font-bold text-base tracking-widest bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 dark:text-white"
                          />

                          <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                          >
                            <CheckCircle className="w-4 h-4" />
                            <span>Confirm & Verify</span>
                          </button>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                          <span>Demo verification code: <strong className="font-mono text-slate-800 dark:text-slate-200">849201</strong></span>
                          {resendTimer > 0 ? (
                            <span>Resend code in {resendTimer}s</span>
                          ) : (
                            <button
                              type="button"
                              onClick={handleSendCode}
                              className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
                            >
                              Resend OTP
                            </button>
                          )}
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TRANSACTION HISTORY */}
          {activeTab === 'transactions' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Verified Payment Transactions (Bangladesh MFS & Cards)
                </span>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>256-Bit SSL Encrypted Ledger</span>
                </span>
              </div>

              <div className="space-y-3">
                {userProfile.pastTransactions?.map((trx, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-brand-600 dark:text-brand-400">
                          {trx.trxId}
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-semibold text-[10px]">
                          {trx.status}
                        </span>
                      </div>
                      <div className="text-slate-500 text-[11px]">
                        {trx.date} · {trx.method}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Security: {trx.securityCheck} · Ref: {trx.merchantTrx}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-extrabold text-base text-slate-900 dark:text-white">
                        {trx.amountBDT}
                      </div>
                      <button
                        onClick={() => window.print()}
                        className="mt-1 text-xs text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 justify-end font-semibold"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Print Digital Memo</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY & 2FA */}
          {activeTab === 'security' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <KeyRound className="w-4 h-4 text-emerald-500" />
                    <span>Two-Factor Authentication (2FA)</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-bold text-[10px]">
                    ACTIVE & ENFORCED
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Every bKash, Nagad, and Card checkout generates an automated 6-digit one-time password (OTP) sent to your registered Bangladeshi mobile number <strong className="text-slate-700 dark:text-slate-300">{userProfile.phone}</strong>.
                </p>
              </div>

              <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                    <ShieldCheck className="w-4 h-4 text-brand-500" />
                    <span>Government Compliance & Digital Business ID</span>
                  </div>
                  <span className="font-mono text-slate-800 dark:text-slate-200 font-bold">
                    DBID-28491024
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">
                  All transactions and user data comply with Bangladesh Ministry of Commerce e-Commerce Guidelines and the Data Protection Framework.
                </p>
              </div>
            </div>
          )}

          {/* Saved Addresses & Payment info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Primary Delivery Address (Bangladesh)</span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                <div>{userProfile.address.street}</div>
                <div>{userProfile.address.area}, {userProfile.address.city}-{userProfile.address.zip}</div>
                <div>{userProfile.address.country}</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CreditCard className="w-4 h-4 text-brand-500" />
                <span>Saved Payment Methods</span>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-100 dark:bg-slate-900 font-mono text-[11px]">
                  <span className="font-bold">City Bank AMEX •••• 8824</span>
                  <span className="text-slate-400">Exp 08/28</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-pink-500/10 text-pink-700 dark:text-pink-300 font-mono text-[11px]">
                  <span className="font-bold">bKash Account ••• 678</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
