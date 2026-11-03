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
  Download
} from 'lucide-react';

export default function UserDashboardModal() {
  const {
    userProfile,
    isAccountOpen,
    setIsAccountOpen,
    simulateNextOrderStep,
    formatPrice
  } = useStore();

  const [activeTab, setActiveTab] = useState('tracking'); // 'tracking' | 'transactions' | 'security'
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  if (!isAccountOpen) return null;

  const order = userProfile.currentOrder;
  const currentStep = order.statusStep;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <img
              src={userProfile.avatar}
              alt={userProfile.name}
              className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white">
                  {userProfile.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-[11px] border border-amber-500/20">
                  {userProfile.tier}
                </span>
                <span className="text-xs">🇧🇩</span>
              </div>
              <p className="text-xs text-slate-500">
                {userProfile.email} · {userProfile.phone} · {userProfile.address.area}, Dhaka
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 text-xs font-bold gap-6 bg-slate-100/50 dark:bg-slate-900/50">
          <button
            onClick={() => setActiveTab('tracking')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'tracking'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Pathao Live Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
              activeTab === 'transactions'
                ? 'border-brand-500 text-brand-600 dark:text-brand-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Transaction History ({userProfile.pastTransactions?.length || 2})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`py-3.5 border-b-2 flex items-center gap-1.5 transition-colors ${
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
        <div className="p-6 overflow-y-auto space-y-6 max-h-[70vh]">
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
              <div className="p-6 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-5">
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

                          <div className="font-bold text-[11px] text-slate-900 dark:text-white mt-2 leading-tight">
                            {s.title}
                          </div>

                          <div className="text-[10px] text-slate-400 mt-0.5 hidden sm:block">
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

          {/* TAB 2: TRANSACTION HISTORY */}
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

          {/* TAB 3: SECURITY & 2FA */}
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
