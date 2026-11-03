import React from 'react';
import { ShieldCheck, Lock, Award, CheckCircle2, Phone, MessageSquare } from 'lucide-react';
import { BD_BUSINESS_CREDENTIALS } from '../data/bdLocations';

export default function SecurityBadgeBar() {
  return (
    <div className="border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/60 py-2 sm:py-3 px-3 sm:px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[11px] sm:text-xs overflow-x-auto no-scrollbar">
        {/* Left: Security and BD government compliance badges */}
        <div className="flex items-center gap-3 sm:gap-6 text-slate-600 dark:text-slate-300 shrink-0">
          <div className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>Govt. DBID: <strong className="text-slate-900 dark:text-white font-mono">{BD_BUSINESS_CREDENTIALS.dbid}</strong></span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold">
            <Award className="w-3.5 h-3.5 text-brand-500 shrink-0" />
            <span>{BD_BUSINESS_CREDENTIALS.eCabMember}</span>
          </div>

          <div className="flex items-center gap-1.5 font-semibold">
            <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>256-Bit SSL · 3DS 2.0</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>VAT BIN: <strong className="font-mono text-slate-800 dark:text-slate-200">{BD_BUSINESS_CREDENTIALS.tinBin}</strong></span>
          </div>
        </div>

        {/* Right: Bangladesh Customer Support Hotline & WhatsApp */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold shrink-0">
          <a
            href="tel:0961227287"
            className="flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:text-brand-600 transition-colors"
          >
            <Phone className="w-3 h-3 text-brand-500" />
            <span>Hotline: <strong className="font-mono text-brand-600 dark:text-brand-400">09612-ARCUS</strong></span>
          </a>

          <a
            href="https://wa.me/8801712345678"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
