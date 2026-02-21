import { useState } from 'react';

export default function DataTable({ columns, data, actions, emptyMessage = 'Data tidak ditemukan' }) {
    const [sort, setSort] = useState({ key: '', order: 'asc' });

    const sortedData = [...data].sort((a, b) => {
        if (!sort.key) return 0;
        const aVal = a[sort.key];
        const bVal = b[sort.key];

        if (aVal < bVal) return sort.order === 'asc' ? -1 : 1;
        if (aVal > bVal) return sort.order === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key) => {
        setSort(prev => ({
            key,
            order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc'
        }));
    };

    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-slate-800/40 shadow-sm overflow-hidden transition-all duration-500">
            <div className="overflow-x-auto no-scrollbar custom-scrollbar">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-gray-100 dark:border-slate-800/50">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    className={`px-6 py-5 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest ${col.sortable ? 'cursor-pointer hover:text-indigo-600 transition-colors' : ''}`}
                                    onClick={() => col.sortable && handleSort(col.key)}
                                >
                                    <div className="flex items-center gap-2">
                                        {col.label}
                                        {col.sortable && sort.key === col.key && (
                                            <span className="text-indigo-600">{sort.order === 'asc' ? '↑' : '↓'}</span>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {actions && <th className="px-6 py-5 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest text-right">Aksi</th>}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 dark:divide-slate-800/30">
                        {sortedData.length > 0 ? (
                            sortedData.map((row, idx) => (
                                <tr key={idx} className="group hover:bg-indigo-50/30 dark:hover:bg-indigo-950/10 transition-colors">
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-6 py-4 text-sm text-gray-700 dark:text-slate-300">
                                            {col.render ? col.render(row[col.key], row) : row[col.key]}
                                        </td>
                                    ))}
                                    {actions && (
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {actions(row)}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500 dark:text-slate-500">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-xl mb-2">
                                            🔍
                                        </div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{emptyMessage}</p>
                                        <p className="text-xs">Coba ubah kata kunci pencarian atau filter Anda</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
