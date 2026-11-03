import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl glass border border-brand-500/30 text-slate-900 dark:text-white text-sm font-medium">
        {toast.type === 'error' ? (
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
        ) : toast.type === 'info' ? (
          <Info className="w-5 h-5 text-sky-500 shrink-0" />
        ) : (
          <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
}
