import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Form/Button';
import Input from '@/Components/Form/Input';

export default function Profile() {
    return (
        <AppLayout>
            <Head title="Profil" />

            <PageHeader
                title="Profil Saya"
                description="Kelola informasi akun dan pengaturan keamanan Anda."
            >
                <Button variant="secondary" className="rounded-2xl">Batal</Button>
                <Button className="rounded-2xl shadow-lg shadow-indigo-500/20">Simpan Perubahan</Button>
            </PageHeader>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Left: Profile Info */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm">
                        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
                            <span className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600">👤</span>
                            Informasi Publik
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8 p-6 rounded-3xl bg-gray-50/50 dark:bg-slate-800/30 border border-gray-100 dark:border-slate-800/40">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-4xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-500">
                                    AD
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-white dark:bg-slate-900 shadow-lg border border-gray-100 dark:border-slate-800 text-indigo-600 hover:scale-110 transition-transform">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <p className="text-lg font-black text-gray-900 dark:text-white">Admin Dashboard</p>
                                <p className="text-sm font-medium text-gray-500 dark:text-slate-500">administrator@dailytracker.com</p>
                                <p className="mt-2 text-[11px] font-bold uppercase tracking-widest text-indigo-600 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 inline-block">Role: Super Admin</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Nama Lengkap" defaultValue="Admin Dashboard" placeholder="Nama Anda" />
                            <Input label="Email" type="email" defaultValue="administrator@dailytracker.com" placeholder="email@domain.com" />
                            <div className="md:col-span-2">
                                <Input label="Bio Ringkas" defaultValue="Mengelola sistem inventaris harian." placeholder="Ceritakan sedikit tentang Anda" />
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm">
                        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-6 flex items-center gap-3">
                            <span className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600">🔐</span>
                            Keamanan
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Input label="Password Saat Ini" type="password" placeholder="••••••••" />
                            <div className="hidden md:block" />
                            <Input label="Password Baru" type="password" placeholder="••••••••" />
                            <Input label="Konfirmasi Password" type="password" placeholder="••••••••" />
                        </div>
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-800/50 flex items-center justify-between text-sm text-gray-500">
                            <p>Otentikasi Dua Faktor</p>
                            <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 px-3 py-1 rounded-full text-xs">Aktif</span>
                        </div>
                    </section>
                </div>

                {/* Right: Preferences Summary */}
                <div className="space-y-8">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-4xl p-8 text-white shadow-xl shadow-indigo-500/20">
                        <h3 className="text-lg font-black tracking-tight mb-4 text-white/90">Statistik Akun</h3>
                        <div className="space-y-6">
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                                <span className="text-sm font-bold text-white/70">Waktu Online</span>
                                <span className="text-lg font-black">128 Jam</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/10 p-4 rounded-2xl backdrop-blur-sm border border-white/5">
                                <span className="text-sm font-bold text-white/70">Total Aksi</span>
                                <span className="text-lg font-black">2.4k</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm">
                        <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-6">Status Profil</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Akun Terverifikasi
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Email Terkonfirmasi
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-400">
                                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-slate-700" />
                                Foto Profil (Opsional)
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
