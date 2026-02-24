import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, LayoutDashboard, Github, Shield, Zap, Sparkles } from 'lucide-react';

export default function Welcome({ auth }) {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white overflow-x-hidden">
            <Head title="Welcome to DailyTracker" />

            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center bg-transparent backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-3 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl shadow-indigo-500/20 group-hover:rotate-12 transition-all duration-300">
                        <Zap className="text-white" size={24} fill="currentColor" />
                    </div>
                    <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                        Daily<span className="text-indigo-600">Tracker</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-indigo-500/10 active:scale-95 flex items-center gap-2"
                        >
                            Terminal <LayoutDashboard size={14} />
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="px-8 py-3 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-indigo-500/30 active:scale-95 flex items-center gap-2"
                        >
                            Authenticate <ArrowRight size={14} strokeWidth={3} />
                        </Link>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <main className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
                {/* Decorative backgrounds */}
                <div className="absolute top-0 -z-10 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.15),transparent_70%)] opacity-50" />
                
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-bounce">
                    <Sparkles size={12} /> Version 2.0 Now Internal
                </div>

                <h1 className="text-6xl md:text-8xl font-black text-slate-900 dark:text-white tracking-[1.5rem] md:tracking-[3rem] uppercase italic leading-tight mb-8">
                    NEXT<br />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-purple-600">LEVEL</span><br />
                    TRACKING
                </h1>

                <p className="max-w-2xl text-lg md:text-xl font-bold text-slate-500 dark:text-slate-400 leading-relaxed mb-12 uppercase tracking-tighter italic">
                    Unleash the full potential of your system with our new React-Inertia powered management dashboard. 
                    <span className="text-indigo-600 dark:text-indigo-400"> Seamlessly synchronized, lightning fast, and secure by design.</span>
                </p>

                <div className="flex flex-wrap justify-center gap-6">
                    <Link
                        href={auth.user ? route('dashboard') : route('login')}
                        className="px-10 py-5 rounded-[2.5rem] bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-black uppercase tracking-[0.2em] hover:scale-110 transition-all duration-500 shadow-3xl shadow-slate-900/20 active:scale-95 group"
                    >
                        {auth.user ? 'Go to Dashboard' : 'Get Started Now'}
                        <ArrowRight size={18} className="inline ml-2 group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                    </Link>
                    <a 
                        href="#"
                        className="px-10 py-5 rounded-[2.5rem] border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm font-black uppercase tracking-[0.2em] hover:bg-slate-100 dark:hover:bg-slate-900 transition-all active:scale-95"
                    >
                        View Repository
                    </a>
                </div>

                {/* Features Highlight */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full">
                    <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-4 transition-all duration-500 text-left group">
                        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-8 group-hover:scale-125 transition-transform">
                            <Zap size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-wider mb-4">Ultra Response</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter leading-relaxed">
                            Zero-reload navigation powered by Inertia.js for an elite user experience.
                        </p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-4 transition-all duration-500 text-left group">
                        <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-8 group-hover:scale-125 transition-transform">
                            <Shield size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-wider mb-4">Steel Core</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter leading-relaxed">
                            Robust Role-Permission system ensuring your data architecture stays impenetrable.
                        </p>
                    </div>

                    <div className="p-10 rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl hover:-translate-y-4 transition-all duration-500 text-left group">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-8 group-hover:scale-125 transition-transform">
                            <Sparkles size={32} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase italic tracking-wider mb-4">Nexus UI</h3>
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter leading-relaxed">
                            Curated aesthetic with glassmorphism and motion design at its foundation.
                        </p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="pt-20 pb-12 px-6 text-center border-t border-slate-100 dark:border-slate-900 mt-20">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                    &copy; 2024 DAILYTRACKER ECOSYSTEM. ALL SYSTEMS NOMINAL.
                </p>
            </footer>
        </div>
    );
}
