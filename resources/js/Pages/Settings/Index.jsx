import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { useAppContext } from '@/Contexts/AppContext';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Form/Button';
import Select from '@/Components/Form/Select';

export default function Settings() {
    const { isDark, toggleTheme } = useAppContext();

    return (
        <AppLayout>
            <Head title="Pengaturan" />

            <PageHeader
                title="Pengaturan"
                description="Konfigurasi preferensi aplikasi dan tampilan dashboard Anda."
            >
                <Button className="rounded-2xl shadow-lg shadow-indigo-500/20">Simpan Setelan</Button>
            </PageHeader>

            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Visual Preference */}
                <section className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm group hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Tampilan & Tema</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-700 dark:text-slate-300">Mode Tampilan</p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => !isDark && toggleTheme()}
                                    className={`flex-1 p-6 rounded-3xl border transition-all duration-500 text-center group/btn ${!isDark ? 'border-indigo-600 bg-indigo-50/50' : 'border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20'}`}
                                >
                                    <span className="text-2xl block mb-2 group-hover/btn:scale-125 transition-transform duration-500 text-indigo-600">☀️</span>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${!isDark ? 'text-indigo-600' : 'text-gray-400'}`}>Light Mode</span>
                                </button>
                                <button
                                    onClick={() => isDark && toggleTheme()}
                                    className={`flex-1 p-6 rounded-3xl border transition-all duration-500 text-center group/btn ${isDark ? 'border-indigo-600 bg-indigo-950/20' : 'border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-800/20'}`}
                                >
                                    <span className="text-2xl block mb-2 group-hover/btn:scale-125 transition-transform duration-500 text-indigo-400">🌙</span>
                                    <span className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-indigo-600' : 'text-gray-400'}`}>Dark Mode</span>
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Select
                                label="Bahasa Sistem"
                                value="id"
                                onChange={() => { }}
                                options={[
                                    { value: 'id', label: 'Bahasa Indonesia' },
                                    { value: 'en', label: 'English' },
                                ]}
                                className="rounded-2xl"
                            />
                            <p className="text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-widest">Waktu Terakhir Disinkronkan: 12:45 PM</p>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-6">Preferensi Notifikasi</h2>
                    <div className="space-y-4">
                        {[
                            { title: 'Notifikasi Email', desc: 'Dapatkan rekap harian melalui email.' },
                            { title: 'Push Notification', desc: 'Beritahu saya saat ada login baru.' },
                            { title: 'Laporan Mingguan', desc: 'Kirim PDF laporan performa sistem.' },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between p-6 rounded-3xl bg-gray-50/50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800/50 group">
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{item.title}</p>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-500 mt-1">{item.desc}</p>
                                </div>
                                <div className="relative inline-flex items-center cursor-pointer">
                                    <div className="w-12 h-6 bg-indigo-100 dark:bg-slate-800 rounded-full border border-gray-200 dark:border-slate-700" />
                                    <div className="absolute left-1 w-4 h-4 bg-indigo-600 rounded-full shadow-sm" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* System info */}
                <div className="p-8 rounded-4xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/20">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Versi Dashboard</p>
                            <p className="text-2xl font-black mt-1">v2.4.0 <span className="text-xs font-normal opacity-70">Premium Edition</span></p>
                        </div>
                        <Button variant="secondary" className="bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-2xl">Cek Update</Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
