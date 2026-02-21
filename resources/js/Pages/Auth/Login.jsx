import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import {
    LayoutDashboard,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Github,
    Chrome
} from 'lucide-react';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-500/30">
            <Head title="Login" />

            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/15 blur-[120px] rounded-full animate-pulse group-hover:bg-indigo-600/20 transition-all duration-700" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/15 blur-[120px] rounded-full animate-pulse delay-700" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
            </div>

            <main className="w-full max-w-[400px] animate-in fade-in zoom-in slide-in-from-bottom-4 duration-1000">
                {/* Brand Header */}
                <div className="text-center mb-8 group">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-purple-600 shadow-2xl shadow-indigo-500/40 mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <LayoutDashboard size={28} className="text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-white tracking-tighter leading-tight">
                        Login Dashboard<span className="text-indigo-500">.</span>
                    </h1>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-[0.2em] mt-2">
                        System Access Required
                    </p>
                </div>

                {/* Glassmorphism Auth Card */}
                <div className="bg-slate-900/40 backdrop-blur-3xl rounded-4xl border border-slate-800/50 p-8 shadow-3xl relative overflow-hidden group/card">
                    {/* Subtle Internal Glow */}
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

                    <form onSubmit={handleSubmit} className="space-y-5 relative">
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Email Connection</label>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="text-slate-500 group-focus-within/input:text-indigo-500 transition-colors" size={18} />
                                </div>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-inner"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            {errors.email && <p className="text-[10px] text-rose-500 font-bold ml-1 animate-in fade-in slide-in-from-left-2">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Secret Key</label>
                                <Link href="#" className="text-[10px] font-bold text-indigo-400/80 hover:text-indigo-400 transition-colors">Forgot Access?</Link>
                            </div>
                            <div className="relative group/input">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="text-slate-500 group-focus-within/input:text-indigo-500 transition-colors" size={18} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl py-3.5 pl-11 pr-11 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50 transition-all text-sm font-medium shadow-inner"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-indigo-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-[10px] text-rose-500 font-bold ml-1 animate-in fade-in slide-in-from-left-2">{errors.password}</p>}
                        </div>

                        {/* Remember Me Toggle */}
                        <div className="flex items-center gap-2.5 px-1 pt-1">
                            <div className="relative inline-flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded-md bg-slate-950 border-slate-800 text-indigo-600 focus:ring-offset-slate-900 focus:ring-indigo-500/50 cursor-pointer transition-all"
                                />
                            </div>
                            <label htmlFor="remember" className="text-xs font-bold text-slate-400 cursor-pointer hover:text-slate-300 transition-colors">Keep me signed in</label>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-4 rounded-xl shadow-xl shadow-indigo-600/20 active:scale-[0.97] transition-all flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                        >
                            <span className="text-sm z-10">Authenticate</span>
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform z-10" />
                            {/* Shiny Effect */}
                            <div className="absolute top-0 -left-full w-full h-full bg-linear-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover/btn:left-full transition-all duration-1000" />
                        </button>
                    </form>

                    {/* Decorative Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800/80"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-[#0f172a] px-3 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Network Identity</span>
                        </div>
                    </div>

                    {/* Social Connect */}
                    <div className="grid grid-cols-2 gap-3">
                        <button className="flex items-center justify-center gap-2 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/80 rounded-xl py-3 text-slate-300 hover:text-white text-xs font-bold transition-all group/social active:scale-95">
                            <Chrome size={16} className="group-hover/social:rotate-20 transition-transform" />
                            <span>Google</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-slate-950/50 hover:bg-slate-800 border border-slate-800/80 rounded-xl py-3 text-slate-300 hover:text-white text-xs font-bold transition-all group/social active:scale-95">
                            <Github size={16} className="group-hover/social:-rotate-20 transition-transform" />
                            <span>GitHub</span>
                        </button>
                    </div>
                </div>

                {/* Final Link */}
                <div className="text-center mt-8">
                    <p className="text-slate-500 text-xs font-medium">
                        Need a new account? <Link href="#" className="text-indigo-400 font-black hover:text-indigo-300 transition-colors decoration-indigo-400/30 underline-offset-4 hover:underline">Register Access</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
