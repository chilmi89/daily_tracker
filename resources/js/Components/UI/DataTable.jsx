import React from 'react';
import { cn } from '@/Utils/cn';

export default function DataTable({ headers = [], children, empty = false, emptyMessage = 'Data not found' }) {
    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-900/10">
                            {headers.map((header, i) => (
                                <th key={i} className="px-6 py-3.5 text-xs font-semibold text-slate-500 dark:text-slate-400 tracking-tight">
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-800/30">
                        {empty ? (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-20 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
                                        </div>
                                        <p className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{emptyMessage}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : children}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
