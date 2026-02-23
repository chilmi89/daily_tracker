import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/Utils/cn';

export default function Toast() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (flash?.toast) {
            setToast(flash.toast);
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!toast) return null;

    const configs = {
        success: {
            icon: CheckCircle2,
            classes: 'border-emerald-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-emerald-500 bg-emerald-500/10',
            barClass: 'bg-emerald-500',
            label: 'Berhasil',
            labelClass: 'text-emerald-600 dark:text-emerald-400',
        },
        error: {
            icon: AlertCircle,
            classes: 'border-rose-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-rose-500 bg-rose-500/10',
            barClass: 'bg-rose-500',
            label: 'Gagal',
            labelClass: 'text-rose-600 dark:text-rose-400',
        },
        warning: {
            icon: AlertTriangle,
            classes: 'border-amber-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-amber-500 bg-amber-500/10',
            barClass: 'bg-amber-500',
            label: 'Peringatan',
            labelClass: 'text-amber-600 dark:text-amber-400',
        },
        info: {
            icon: Info,
            classes: 'border-blue-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-blue-500 bg-blue-500/10',
            barClass: 'bg-blue-500',
            label: 'Info',
            labelClass: 'text-blue-600 dark:text-blue-400',
        },
    };

    const cfg = configs[toast.type] || configs.info;
    const Icon = cfg.icon;

    return (
        <div className={cn(
            "fixed bottom-8 right-8 z-50 w-full max-w-sm transition-all duration-500 ease-out transform",
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
        )}>
            <div className={cn(
                "pointer-events-auto rounded-4xl border shadow-2xl overflow-hidden backdrop-blur-xl",
                cfg.classes
            )}>
                <div className="flex items-start gap-4 px-6 py-5">
                    <div className={cn("shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center", cfg.iconClasses)}>
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                        <p className={cn("text-[10px] font-black uppercase tracking-widest mb-1", cfg.labelClass)}>{cfg.label}</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 leading-snug">{toast.message}</p>
                    </div>
                    <button 
                        onClick={() => setVisible(false)}
                        className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-0.5 p-1"
                    >
                        <X size={16} strokeWidth={2.5} />
                    </button>
                </div>
                <div 
                    className={cn("h-1 w-full transition-all duration-500 linear", cfg.barClass)} 
                    style={{ width: visible ? '0%' : '100%', transformOrigin: 'left' }}
                />
            </div>
        </div>
    );
}
