import React from 'react';
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
  RefreshCw
} from 'lucide-react';

export default function UserDashboardModal() {
  const {
    userProfile,
    isAccountOpen,
    setIsAccountOpen,
    simulateNextOrderStep,
    formatPrice
  } = useStore();

  if (!isAccountOpen) return null;

  const order = userProfile.currentOrder;
  const currentStep = order.statusStep;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
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
              </div>
              <p className="text-xs text-slate-500">{userProfile.email} · {userProfile.phone}</p>
            </div>
          </div>

          <button
            onClick={() => setIsAccountOpen(false)}
            className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[75vh]">
          {/* VIP Rewards Banner */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-brand-500/15 to-purple-500/15 border border-amber-500/30 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs uppercase font-extrabold tracking-wider text-amber-500 flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Platinum Membership Rewards</span>
              </div>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {userProfile.points.toLocaleString()} Points Available
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Worth $122.50 in instant checkout store credit + Free Priority Global Shipping.
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
                  <span>Live Package Dispatch: {order.id}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Carrier: {order.carrier} · Tracking #{order.trackingNumber}
                </div>
              </div>

              {/* Simulation button */}
              <button
                onClick={simulateNextOrderStep}
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                title="Click to advance delivery simulation"
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

              {/* Connector line behind */}
              <div className="absolute top-6 left-8 right-8 h-1 bg-slate-200 dark:bg-slate-800 -z-0">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Step Description Card */}
            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs">
              <Truck className="w-5 h-5 text-emerald-500 shrink-0" />
              <div>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  Current Status: {order.steps[currentStep]?.title}
                </span>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                  {order.steps[currentStep]?.desc}
                </p>
              </div>
            </div>
          </div>

          {/* Saved Addresses & Payment info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Address */}
            <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <MapPin className="w-4 h-4 text-brand-500" />
                <span>Default Delivery Address</span>
              </div>
              <div className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                <div>{userProfile.address.street}</div>
                <div>{userProfile.address.city} {userProfile.address.zip}</div>
                <div>{userProfile.address.country}</div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-4 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <CreditCard className="w-4 h-4 text-brand-500" />
                <span>Primary Payment Card</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 font-mono text-[11px]">
                <span className="font-bold">Visa Platinum •••• 8824</span>
                <span className="text-slate-400">Exp 08/28</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
