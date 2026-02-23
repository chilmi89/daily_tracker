import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cn } from '@/Utils/cn';
import { 
    LayoutDashboard, 
    Users, 
    ShieldCheck, 
    Settings, 
    User, 
    LogOut, 
    ChevronRight, 
    Menu, 
    X, 
    Pin, 
    PinOff,
    Home,
    Key,
    UserCircle,
    ShieldAlert
} from 'lucide-react';
import Toast from '@/Components/UI/Toast';

export default function AuthenticatedLayout({ children, title }) {
    const { auth = { user: null }, flash = {} } = usePage().props;
    const [isPinned, setIsPinned] = useState(() => {
        try {
            return localStorage.getItem('sidebar-pinned') === 'true';
        } catch (e) {
            return false;
        }
    });
    const [isExpanded, setIsExpanded] = useState(isPinned);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('theme') || 'light';
        } catch (e) {
            return 'light';
        }
    });

    // Theme Management
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {}
    }, [theme]);

    const toggleSidebar = () => {
        const newPinned = !isPinned;
        setIsPinned(newPinned);
        setIsExpanded(newPinned);
        try {
            localStorage.setItem('sidebar-pinned', newPinned);
        } catch (e) {}
    };

    // Safe route helper
    const hasRoute = (name) => {
        try {
            return !!route(name);
        } catch (e) {
            return false;
        }
    };

    const isCurrent = (name) => {
        try {
            return route().current(name);
        } catch (e) {
            return false;
        }
    };

    const getHref = (name) => {
        try {
            return route(name);
        } catch (e) {
            return '#';
        }
    };

    const isSuperAdmin = auth.user?.roles?.some(r => r.name === 'superadmin');

    const navItems = [
        ...(!isSuperAdmin ? [
            { label: 'Dashboard', icon: LayoutDashboard, href: getHref('dashboard'), active: isCurrent('dashboard') },
            { label: 'Users', icon: Users, href: getHref('users.index'), active: isCurrent('users.index') },
            { label: 'Profile', icon: User, href: getHref('profile'), active: isCurrent('profile') },
            { label: 'Settings', icon: Settings, href: getHref('settings'), active: isCurrent('settings') },
        ] : []),
    ];

    const adminItems = [
        { label: 'Admin Dashboard', icon: Home, href: getHref('superadmin.index'), active: isCurrent('superadmin.index') },
        { label: 'Manage Users', icon: Users, href: getHref('superadmin.users.index'), active: isCurrent('superadmin.users.index') },
        { label: 'Manage Roles', icon: ShieldCheck, href: getHref('superadmin.roles.index'), active: isCurrent('superadmin.roles.index') },
        { label: 'Manage Permissions', icon: Key, href: getHref('superadmin.permissions.index'), active: isCurrent('superadmin.permissions.index') },
        { label: 'Role Assignments', icon: UserCircle, href: getHref('superadmin.assignments.users.index'), active: isCurrent('superadmin.assignments.users.index') },
        { label: 'Permission Assignments', icon: ShieldAlert, href: getHref('superadmin.assignments.roles.index'), active: isCurrent('superadmin.assignments.roles.index') },
        ...(isSuperAdmin ? [
            { label: 'Profile', icon: User, href: getHref('profile'), active: isCurrent('profile') },
            { label: 'Settings', icon: Settings, href: getHref('settings'), active: isCurrent('settings') },
        ] : []),
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-300">
            {/* Sidebar Overlay (Mobile) */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside 
                className={cn(
                    "fixed inset-y-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out",
                    isExpanded ? "w-72" : "w-20",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
                onMouseEnter={() => !isPinned && setIsExpanded(true)}
                onMouseLeave={() => !isPinned && setIsExpanded(false)}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className={cn(
                        "h-16 flex items-center border-b border-slate-100 dark:border-slate-800/50 transition-all duration-300",
                        isExpanded ? "justify-between px-6" : "justify-center px-0"
                    )}>
                        {isExpanded ? (
                            <Link href="/" className="flex items-center gap-3 group">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight font-display">Daily<span className="text-indigo-600">Track</span></span>
                                    <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest leading-none mt-1">Premium Ecosystem</span>
                                </div>
                            </Link>
                        ) : (
                            <Link href="/" className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:rotate-6 transition-transform">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            </Link>
                        )}
                        
                        {isExpanded && (
                            <button 
                                onClick={toggleSidebar}
                                className="hidden lg:flex p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-indigo-600 transition-colors"
                            >
                                {isPinned ? <PinOff size={18} /> : <Pin size={18} />}
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
                        <div className="space-y-0.5">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center rounded-xl transition-all duration-300 group relative",
                                        isExpanded ? "px-3.5 py-2.5 gap-4 justify-start" : "px-0 py-2.5 justify-center gap-0",
                                        item.active 
                                            ? "bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                                            : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                    )}
                                >
                                    <item.icon size={20} className={cn("transition-transform duration-300", !isExpanded && "group-hover:scale-110")} strokeWidth={item.active ? 2.5 : 2} />
                                    {isExpanded && <span className="text-sm font-medium leading-none">{item.label}</span>}
                                    {!isExpanded && item.active && (
                                        <div className="absolute left-0 w-1.5 h-6 bg-indigo-600 rounded-r-full shadow-lg shadow-indigo-600/40" />
                                    )}
                                </Link>
                            ))}
                        </div>

                        {auth.user?.roles?.some(r => r.name === 'superadmin') && (
                            <div className="mt-6">
                                {isExpanded && (
                                    <div className="px-4 mb-2">
                                        <p className="text-[10px] font-black text-slate-400/80 uppercase tracking-widest">Administrator Area</p>
                                    </div>
                                )}
                                <div className="space-y-0.5">
                                    {adminItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            href={item.href}
                                            className={cn(
                                                "flex items-center rounded-xl transition-all duration-300 group relative",
                                                isExpanded ? "px-3.5 py-2.5 gap-4 justify-start" : "px-0 py-2.5 justify-center gap-0",
                                                item.active 
                                                    ? "bg-purple-50 dark:bg-purple-600/10 text-purple-600 dark:text-purple-400 shadow-sm" 
                                                    : "hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                                            )}
                                        >
                                            <item.icon size={20} className={cn("transition-transform duration-300", !isExpanded && "group-hover:scale-110")} strokeWidth={item.active ? 2.5 : 2} />
                                            {isExpanded && <span className="text-sm font-medium leading-none">{item.label}</span>}
                                            {!isExpanded && item.active && (
                                                <div className="absolute left-0 w-1.5 h-6 bg-purple-600 rounded-r-full shadow-lg shadow-purple-600/40" />
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className={cn(
                        "transition-all duration-300 border-t border-slate-100 dark:border-slate-800/50",
                        isExpanded ? "p-4" : "p-2"
                    )}>
                        <Link 
                            href={route('logout')} 
                            method="post" 
                            as="button"
                            className={cn(
                                "flex items-center rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group",
                                isExpanded ? "w-full gap-4 px-4 py-3.5" : "w-12 h-12 mx-auto justify-center"
                            )}
                        >
                            <LogOut size={20} strokeWidth={2.5} />
                            {isExpanded && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className={cn(
                "flex-1 flex flex-col transition-all duration-300 min-w-0 font-sans",
                isExpanded ? "lg:ml-72" : "lg:ml-20"
            )}>
                {/* Navbar */}
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsMobileOpen(true)}
                            className="p-2 lg:hidden text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                        >
                            <Menu size={24} />
                        </button>

                        {/* Breadcrumbs */}
                        <div className="hidden sm:flex items-center gap-2 overflow-hidden">
                            <Link href="/" className="text-slate-400 hover:text-indigo-600 transition-colors">
                                <Home size={16} />
                            </Link>
                            {(usePage().url || '').split('?')[0].split('/').filter(Boolean).map((segment, i, arr) => (
                                <React.Fragment key={i}>
                                    <ChevronRight size={14} className="text-slate-300 shrink-0" />
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-widest truncate",
                                        i === arr.length - 1 ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400"
                                    )}>
                                        {segment.replace(/-/g, ' ')}
                                    </span>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        {/* Theme Toggle */}
                        <button 
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700 hover:scale-110 active:scale-95 transition-all"
                        >
                            {theme === 'dark' ? <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>}
                        </button>

                        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 hidden sm:block" />

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                            <div className="hidden sm:flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-900 dark:text-white leading-none font-display">{auth.user?.name}</span>
                                <span className="text-[9px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5">{auth.user?.roles?.[0]?.name || 'Member'}</span>
                            </div>
                            <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs group-hover:scale-110 transition-transform shadow-sm shadow-indigo-500/5">
                                {auth.user?.name?.substring(0, 1).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 sm:p-8 overflow-x-hidden">
                    {children}
                </div>
                <Toast />
            </main>
        </div>
    );
}
