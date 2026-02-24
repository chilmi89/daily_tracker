import React from 'react';
import { cn } from '@/Utils/cn';

export default function Card({ 
    title, 
    description, 
    children, 
    footer, 
    header, 
    padding = 'p-6 sm:p-8', 
    className = '',
    variant = 'default' 
}) {
    const variants = {
        default: 'bg-white/80 dark:bg-slate-950/50 border-gray-100 dark:border-slate-800/40',
        gradient: 'bg-linear-to-br from-indigo-600 to-purple-700 border-white/20 text-white shadow-indigo-500/20'
    };

    return (
        <div className={cn(
            "rounded-[2.5rem] border backdrop-blur-xl shadow-2xl shadow-indigo-500/5 overflow-hidden transition-all duration-300 group/card",
            variants[variant],
            className
        )}>
            {(title || description || header) && (
                <div className="px-8 pt-8 pb-2 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        {title && <h4 className={cn("text-lg font-bold tracking-tight font-display", variant === 'gradient' ? 'text-white' : 'text-slate-900 dark:text-white')}>{title}</h4>}
                        {description && <p className={cn("text-xs font-medium opacity-70", variant === 'gradient' ? 'text-indigo-100' : 'text-slate-500')}>{description}</p>}
                    </div>
                    {header && <div className="flex shrink-0">{header}</div>}
                </div>
            )}
            
            <div className={padding}>
                {children}
            </div>

            {footer && (
                <div className="px-8 pb-8 pt-2">
                    {footer}
                </div>
            )}
        </div>
    );
}
