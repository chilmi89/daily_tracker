import React from 'react';
import { cn } from '@/Utils/cn';

export default function Toggle({ enabled, onChange, label, description, disabled = false }) {
    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-all hover:bg-slate-100 dark:hover:bg-slate-800/50 group">
            <div className="flex flex-col gap-1 min-w-0">
                {label && (
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-tight truncate italic group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {label}
                    </span>
                )}
                {description && (
                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest truncate">
                        {description}
                    </span>
                )}
            </div>
            <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(!enabled)}
                className={cn(
                    "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                    enabled ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
                )}
            >
                <span
                    aria-hidden="true"
                    className={cn(
                        "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                        enabled ? "translate-x-5" : "translate-x-0"
                    )}
                />
            </button>
        </div>
    );
}
