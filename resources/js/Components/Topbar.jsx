import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { useAppContext } from '@/Contexts/AppContext';
import {
    Home,
    Menu,
    Sun,
    Moon,
    Bell,
    Search
} from 'lucide-react';

export default function Topbar({ notifications = [] }) {
    const { url } = usePage();
    const { isSidebarWide, openMobile, isDark, toggleTheme } = useAppContext();
    const [breadcrumbs, setBreadcrumbs] = useState([]);

    useEffect(() => {
        const paths = url.split('/').filter(p => p);
        const crumbs = paths.map((path, index) => {
            const href = `/${paths.slice(0, index + 1).join('/')}`;
            return {
                label: path.charAt(0).toUpperCase() + path.slice(1),
                href,
                active: index === paths.length - 1
            };
        });
        setBreadcrumbs(crumbs);
    }, [url]);

    return (
        <header className={`
            h-16 fixed top-0 right-0 z-20 flex items-center justify-between px-6 transition-all duration-300 
            bg-white/70 dark:bg-[#020617]/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 
            ${isSidebarWide ? 'lg:left-sidebar' : 'lg:left-sidebar-collapsed'} left-0
        `}>
            {/* Left: Hamburger & Breadcrumbs */}
            <div className="flex items-center gap-4">
                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={openMobile}
                    className="lg:hidden flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 hover:border-indigo-500/50 transition-all duration-300"
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={20} className="text-indigo-600" />
                </button>

                {/* Breadcrumbs */}
                <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
                    <Link href="/dashboard" className="text-gray-400 hover:text-indigo-600 transition-colors">
                        <Home size={16} />
                    </Link>
                    {breadcrumbs.map((crumb, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <span className="text-gray-300">/</span>
                            <Link
                                href={crumb.href}
                                className={crumb.active ? 'text-gray-900 dark:text-white font-black' : 'text-gray-400 hover:text-indigo-600 transition-colors'}
                            >
                                {crumb.label}
                            </Link>
                        </div>
                    ))}
                </nav>
            </div>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-3">
                {/* Global Search Placeholder Icon */}
                <button className="hidden md:flex w-10 h-10 rounded-xl items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-indigo-600 transition-all">
                    <Search size={18} />
                </button>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-indigo-600 hover:border-indigo-500/50 transition-all duration-300"
                >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>

                {/* Notifications */}
                <div className="relative group">
                    <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-gray-500 dark:text-slate-400 hover:text-indigo-600 hover:border-indigo-500/50 transition-all duration-300 shadow-sm">
                        <Bell size={18} />
                        {notifications.length > 0 && (
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                        )}
                    </button>
                    {/* Simplified dropdown placeholder */}
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-slate-800 ml-2">
                    <div className="hidden md:block text-right">
                        <p className="text-xs font-black text-gray-900 dark:text-white tracking-tight leading-none uppercase">Admin</p>
                        <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Online</p>
                    </div>
                </div>
            </div>
        </header>
    );
}
