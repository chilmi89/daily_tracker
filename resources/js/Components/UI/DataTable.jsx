import React from 'react';
import { cn } from '@/Utils/cn';

/**
 * DataTable — Reusable table component
 *
 * headers: Array of strings OR objects:
 *   { label: 'Kolom', align: 'left'|'center'|'right', width: '10%' }
 *
 * Special auto-rules (when passed as plain string):
 *   - '#' column      → align center, w-12
 *   - 'aksi'/'opsi'   → align right
 *   - everything else → align left
 */
export default function DataTable({
    headers = [],
    children,
    empty = false,
    emptyMessage = 'Belum ada data',
}) {
    const resolveHeader = (header, i) => {
        const isObj = typeof header === 'object' && header !== null;
        const label  = isObj ? header.label  : header;
        const lowerL = label.toLowerCase();

        let align = isObj ? (header.align ?? 'left') : 'left';
        let width = isObj ? (header.width ?? 'auto') : 'auto';

        if (!isObj) {
            if (lowerL === '#') { align = 'center'; width = '48px'; }
            else if (lowerL.includes('aksi') || lowerL.includes('opsi') || lowerL.includes('action')) {
                align = 'right';
            }
        }

        return { label, align, width };
    };

    const alignClass = (align) =>
        align === 'right' ? 'text-right' :
        align === 'center' ? 'text-center' : 'text-left';

    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-3xl rounded-4xl border border-gray-100 dark:border-slate-800/40 overflow-hidden shadow-xl shadow-indigo-500/5">
            <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full border-collapse" style={{ tableLayout: 'auto' }}>

                    {/* ── Header ── */}
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50/80 dark:bg-slate-900/30">
                            {headers.map((header, i) => {
                                const { label, align, width } = resolveHeader(header, i);
                                return (
                                    <th
                                        key={i}
                                        style={{ width }}
                                        className={cn(
                                            'px-6 py-4 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap',
                                            alignClass(align)
                                        )}
                                    >
                                        {label}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    {/* ── Body ── */}
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800/30">
                        {empty ? (
                            <tr>
                                <td colSpan={headers.length} className="px-6 py-24 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 dark:text-slate-700 animate-pulse">
                                                <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"/>
                                                <polyline points="14 2 14 8 20 8"/>
                                                <path d="M2 15h10"/><path d="m9 18 3-3-3-3"/>
                                            </svg>
                                        </div>
                                        <p className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">{emptyMessage}</p>
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

