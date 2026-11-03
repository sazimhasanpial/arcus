import React from 'react';
import { ShieldCheck, Lock, Award, CheckCircle2 } from 'lucide-react';
import { BD_BUSINESS_CREDENTIALS } from '../data/bdLocations';

export default function SecurityBadgeBar() {
  return (
    <div className="border-y border-slate-200/80 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/60 py-2.5 sm:py-3 px-3 sm:px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs overflow-x-auto no-scrollbar">
        {/* Security and BD government compliance badges (Clean layout matching verified credentials) */}
        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 shrink-0">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Govt. DBID: <strong className="text-slate-900 dark:text-white font-mono">{BD_BUSINESS_CREDENTIALS.dbid}</strong></span>
        </div>

        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 shrink-0">
          <Award className="w-4 h-4 text-purple-500 shrink-0" />
          <span>{BD_BUSINESS_CREDENTIALS.eCabMember}</span>
        </div>

        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 shrink-0">
          <Lock className="w-4 h-4 text-amber-500 shrink-0" />
          <span>256-Bit SSL · 3DS 2.0</span>
        </div>

        <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300 shrink-0">
          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>VAT BIN: <strong className="font-mono text-slate-900 dark:text-white">{BD_BUSINESS_CREDENTIALS.tinBin}</strong></span>
        </div>
      </div>
    </div>
  );
}
