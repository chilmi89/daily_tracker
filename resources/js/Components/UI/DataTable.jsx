import React from 'react';
import { cn } from '@/Utils/cn';

export default function DataTable({ headers = [], children, empty = false, emptyMessage = 'Data not found' }) {
    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-3xl rounded-[2.5rem] border border-gray-100 dark:border-slate-800/40 overflow-hidden shadow-2xl shadow-indigo-500/5">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse table-auto">
                    <thead>
                        <tr className="border-b border-gray-50 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-900/20">
                            {headers.map((header, i) => {
                                const isObj = typeof header === 'object' && header !== null;
                                const label = isObj ? header.label : header;
                                let align = isObj ? header.align : 'center';
                                const width = isObj ? header.width : 'auto';

                                // Auto-align known action columns if passed as string
                                if (!isObj && (label.toLowerCase().includes('aksi') || label.toLowerCase().includes('opsi'))) {
                                    align = 'center';
                                }
                                
                                return (
                                    <th 
                                        key={i} 
                                        style={{ width }}
                                        className={cn(
                                            "px-8 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]",
                                            align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'
                                        )}
                                    >
                                        {label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50/50 dark:divide-slate-800/20">
                        {empty ? (
                            <tr>
                                <td colSpan={headers.length} className="px-8 py-24 text-center">
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-4xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-700 animate-pulse"><path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/><polyline points="14 2 14 8 20 8"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
                                        </div>
                                        <p className="text-xs font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">{emptyMessage}</p>
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
