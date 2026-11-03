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
  Eye,
  EyeOff,
  LogOut,
  UserPlus,
  LogIn,
  Check
} from 'lucide-react';

export default function UserDashboardModal() {
  const {
    userProfile,
    isLoggedIn,
    isAccountOpen,
    setIsAccountOpen,
    simulateNextOrderStep,
    registerAccount,
    loginAccount,
    logoutAccount,
    updatePassword,
    formatPrice
  } = useStore();

  // Auth Mode: 'signin' | 'register'
  const [authMode, setAuthMode] = useState('signin');
  // Profile Dashboard Active Tab: 'tracking' | 'transactions' | 'security'
  const [activeTab, setActiveTab] = useState('tracking');

  // Register Form State
  const [regName, setRegName] = useState('');
  const [regUserId, setRegUserId] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Sign In Form State
  const [loginId, setLoginId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Change Password State (in Security Tab)
  const [newPass, setNewPass] = useState('');
  const [confirmNewPass, setConfirmNewPass] = useState('');

  if (!isAccountOpen) return null;

  const order = userProfile?.currentOrder;
  const currentStep = order?.statusStep ?? 2;

  // Handle Register
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (regPassword !== regConfirmPassword) {
      alert('Passwords do not match! Please check and try again.');
      return;
    }
    const success = registerAccount({
      name: regName,
      userId: regUserId,
      password: regPassword,
      phone: regPhone
    });
    if (success) {
      setRegName('');
      setRegUserId('');
      setRegPassword('');
      setRegConfirmPassword('');
      setRegPhone('');
    }
  };

  // Demo auto-fill for registration
  const handleDemoRegisterFill = () => {
    setRegName('Sazim Hasan Pial');
    setRegUserId('sajimhasan12@gmail.com');
    setRegPassword('pass1234');
    setRegConfirmPassword('pass1234');
    setRegPhone('+880 1712-345678');
  };

  // Handle Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginAccount({
      userId: loginId,
      password: loginPassword
    });
  };

  // Demo auto-fill for login
  const handleDemoLoginFill = () => {
    setLoginId('sajimhasan12@gmail.com');
    setLoginPassword('password123');
  };

  // Handle Password Change
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPass !== confirmNewPass) {
      alert('Passwords do not match.');
      return;
    }
    const success = updatePassword(newPass);
    if (success) {
      setNewPass('');
      setConfirmNewPass('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="relative w-full max-w-3xl rounded-2xl sm:rounded-3xl glass border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-2 sm:my-6 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ======================================================== */}
        {/* VIEW 1: AUTHENTICATION (CREATE ACCOUNT OR SIGN IN WITH ID & PASSWORD) */}
        {/* ======================================================== */}
        {!isLoggedIn ? (
          <div className="p-5 sm:p-8 space-y-6">
            {/* Top Close Bar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    Arcus Account Portal
                  </h2>
                  <p className="text-xs text-slate-500">
                    Create or sign in with your User ID & Password
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

            {/* Auth Mode Toggle Pills */}
            <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setAuthMode('signin')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'signin'
                    ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In with ID & Pass</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('register')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  authMode === 'register'
                    ? 'bg-white dark:bg-slate-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Create Account (ID & Pass)</span>
              </button>
            </div>

            {/* SIGN IN FORM */}
            {authMode === 'signin' && (
              <form onSubmit={handleLoginSubmit} className="max-w-md mx-auto space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    User ID or Email
                  </label>
                  <input
                    type="text"
                    required
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="Enter your User ID or Email"
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1"
                    >
                      {showLoginPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      <span>{showLoginPassword ? 'Hide' : 'Show'}</span>
                    </button>
                  </div>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In with ID & Password</span>
                </button>

                {/* 1-Click Demo Fill */}
                <button
                  type="button"
                  onClick={handleDemoLoginFill}
                  className="w-full py-2 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Click Demo Sign In (Pial / sajimhasan12@gmail.com)</span>
                </button>
              </form>
            )}

            {/* CREATE ACCOUNT (REGISTER) FORM */}
            {authMode === 'register' && (
              <form onSubmit={handleRegisterSubmit} className="max-w-md mx-auto space-y-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sazim Hasan Pial"
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Create User ID or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={regUserId}
                    onChange={(e) => setRegUserId(e.target.value)}
                    placeholder="e.g. pial or sajimhasan12@gmail.com"
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Mobile Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+880 1712-345678"
                    className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        Password *
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="text-[10px] text-slate-400 hover:text-slate-600"
                      >
                        {showRegPassword ? 'Hide' : 'Show'}
                      </button>
                    </div>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Confirm Pass *
                    </label>
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Repeat password"
                      className="w-full py-2.5 px-3.5 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25 active:scale-95 transition-all mt-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account with ID & Password</span>
                </button>

                {/* 1-Click Auto Fill Demo */}
                <button
                  type="button"
                  onClick={handleDemoRegisterFill}
                  className="w-full py-2 rounded-xl glass border border-slate-200 dark:border-slate-800 text-[11px] font-bold text-brand-600 dark:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>1-Click Auto Fill (Sazim Hasan Pial)</span>
                </button>
              </form>
            )}
          </div>
        ) : (
          /* ======================================================== */
          /* VIEW 2: LOGGED IN USER PROFILE & VIP DASHBOARD */
          /* ======================================================== */
          <>
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
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-slate-900 shadow" title="Account Active">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white">
                      {userProfile.name}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 font-extrabold text-[11px] border border-amber-500/20">
                      {userProfile.tier}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-500/15 text-brand-600 dark:text-brand-400 font-extrabold text-[10px] border border-brand-500/30">
                      <Lock className="w-3 h-3" />
                      <span>ID & Password Secured</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ID: <strong className="font-mono text-slate-700 dark:text-slate-300">{userProfile.userId || userProfile.email}</strong> · {userProfile.phone} · {userProfile.address?.area || 'Banani'}, Dhaka
                  </p>
                </div>
              </div>

              {/* Action Buttons: Sign Out & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={logoutAccount}
                  className="px-3 py-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95"
                  title="Sign out or Switch Account"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>

                <button
                  onClick={() => setIsAccountOpen(false)}
                  className="w-9 h-9 rounded-full glass border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  aria-label="Close Account Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
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
                <span>Security & Password</span>
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
                          <span>Live Parcel Dispatch: {order?.id || 'ARC-98241'}</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Carrier: {order?.carrier || 'Pathao Express Priority'} · Tracking #{order?.trackingNumber || 'PTH-BD-90182740'}
                        </div>
                        {order?.rider && (
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
                        {order?.steps?.map((s, idx) => {
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
                          Current Stage: {order?.steps?.[currentStep]?.title || 'Dispatched with Pathao Courier'}
                        </span>
                        <p className="text-slate-600 dark:text-slate-400 text-[11px] mt-0.5">
                          {order?.steps?.[currentStep]?.desc || 'Handed over to Pathao Express Priority Van'}
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
                    {userProfile.pastTransactions?.length > 0 ? (
                      userProfile.pastTransactions.map((trx, idx) => (
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
                      ))
                    ) : (
                      <div className="p-8 text-center text-slate-400">
                        No previous transactions found for this account.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SECURITY & PASSWORD */}
              {activeTab === 'security' && (
                <div className="space-y-5 text-xs">
                  {/* Account Credential Overview */}
                  <div className="p-4 sm:p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white text-sm">
                        <KeyRound className="w-4 h-4 text-emerald-500" />
                        <span>Account Credentials & Password Protection</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 font-bold text-[10px]">
                        ID & PASS ACTIVE
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Registered User ID</div>
                        <div className="font-mono font-bold text-slate-900 dark:text-white text-sm mt-0.5">
                          {userProfile.userId || userProfile.email}
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                        <div className="text-[10px] text-slate-400 uppercase font-bold">Password Status</div>
                        <div className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm mt-0.5">
                          •••••••••••• (Encrypted)
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Change Password Form */}
                  <div className="p-4 sm:p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-brand-500" />
                      <span>Update Password</span>
                    </h3>
                    <p className="text-slate-500 text-[11px]">
                      Change your account password directly without requiring any email confirmation.
                    </p>

                    <form onSubmit={handleChangePassword} className="space-y-3 pt-1 max-w-md">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={newPass}
                          onChange={(e) => setNewPass(e.target.value)}
                          placeholder="At least 6 characters"
                          className="w-full py-2 px-3 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={confirmNewPass}
                          onChange={(e) => setConfirmNewPass(e.target.value)}
                          placeholder="Repeat new password"
                          className="w-full py-2 px-3 rounded-xl text-xs bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>

                      <button
                        type="submit"
                        className="py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs shadow-md active:scale-95 transition-all"
                      >
                        Update Password
                      </button>
                    </form>
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
                    <div>{userProfile.address?.street || 'House 42, Road 11'}</div>
                    <div>{userProfile.address?.area || 'Banani'}, {userProfile.address?.city || 'Dhaka'}-{userProfile.address?.zip || '1213'}</div>
                    <div>{userProfile.address?.country || 'Bangladesh'}</div>
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
                      <span className="text-[10px] text-emerald-600 font-semibold">Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
