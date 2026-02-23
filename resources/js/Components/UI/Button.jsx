import React from 'react';
import { cn } from '@/Utils/cn';

export default function Button({ 
    children, 
    type = 'button', 
    variant = 'indigo', 
    className = '', 
    disabled = false, 
    onClick,
    ...props 
}) {
    const variants = {
        indigo: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 border-indigo-500/20',
        purple: 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/20 border-purple-500/20',
        slate: 'bg-slate-800 hover:bg-slate-700 text-white shadow-lg shadow-slate-900/20 border-slate-700/20',
        outline: 'bg-transparent border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900',
        flat: 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900'
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={cn(
                "inline-flex items-center justify-center px-6 py-3.5 rounded-2xl text-sm font-semibold tracking-tight transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:active:scale-100 border font-display",
                variants[variant],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
