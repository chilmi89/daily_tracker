import React from 'react';
import AppLayout from '@/Layouts/AppLayout';

export default function Superadmin() {
    return (
        <AppLayout>
            <div className="p-6">
                <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl shadow-xl shadow-indigo-500/20">
                            🛡️
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">
                                Panel Superadmin
                            </h1>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-500">
                                Area manajemen tingkat tinggi sistem Daily Tracker.
                            </p>
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl bg-indigo-50/50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30">
                        <p className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-2">
                            <span className="text-xl">✨</span> Halaman ini sekarang sudah aktif dan terintegrasi!
                        </p>
                        <p className="text-gray-500 dark:text-slate-400 text-sm mt-2 leading-relaxed">
                            Penyebab "blank putih" sebelumnya adalah penggunaan nama fungsi huruf kecil yang tidak dikenali React sebagai komponen. Saya sudah memperbaikinya dan menyelaraskan desainnya dengan dashboard baru.
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}