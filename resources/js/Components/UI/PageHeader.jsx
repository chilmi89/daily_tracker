import React from 'react';

export default function PageHeader({ title, description, children }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="space-y-2">
                <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight font-display">
                    {title}<span className="text-indigo-600">.</span>
                </h2>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 opacity-90">
                    {description}
                </p>
            </div>
            
            {children && (
                <div className="flex items-center gap-3 shrink-0">
                    {children}
                </div>
            )}
        </div>
    );
}
