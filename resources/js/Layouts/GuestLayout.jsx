import React from 'react';
import { Head } from '@inertiajs/react';

export default function GuestLayout({ children, title }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-slate-50 dark:bg-slate-950 font-sans selection:bg-indigo-500 selection:text-white">
            <Head title={title} />
            
            <div className="w-full sm:max-w-md mt-6 px-4 py-4 overflow-hidden">
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 rounded-4xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-indigo-500/30 mb-6 rotate-12 hover:rotate-0 transition-all duration-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Daily<span className="text-indigo-600">Tracker</span>.</h1>
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-2">Premium Experience</p>
                </div>

                <div className="bg-white/80 dark:bg-slate-900/50 backdrop-blur-2xl border border-white/20 dark:border-slate-800/50 rounded-4xl p-8 sm:p-10 shadow-2xl shadow-indigo-500/5 relative overflow-hidden group">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-700"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
                    
                    <div className="relative">
                        {children}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} Daily Tracker &bull; Built with React & Inertia
                    </p>
                </div>
            </div>
        </div>
    );
}
