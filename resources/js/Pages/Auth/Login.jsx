import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title="Login">
            <form onSubmit={submit} className="space-y-6">
                <div>
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1 block mb-2">
                        Email Connection
                    </label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        </div>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-sm"
                            placeholder="your@email.com"
                            required
                        />
                    </div>
                    {errors.email && <p className="mt-2 text-[10px] text-rose-500 font-bold ml-1">{errors.email}</p>}
                </div>

                <div>
                    <div className="flex justify-between items-center px-1 mb-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                            Secret Key
                        </label>
                    </div>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                        </div>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950/40 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {errors.password && <p className="mt-2 text-[10px] text-rose-500 font-bold ml-1">{errors.password}</p>}
                </div>

                <div className="flex items-center justify-between px-1">
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                            className="w-4 h-4 rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500/30"
                        />
                        <span className="ml-2 text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 transition-colors">
                            Signed in
                        </span>
                    </label>
                    <a href="#" className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:text-indigo-600 transition-colors">
                        Lost Key?
                    </a>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-2xl shadow-xl shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:active:scale-100"
                >
                    <span className="text-sm">Authenticate</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
            </form>
        </GuestLayout>
    );
}
