import { Link, usePage, router } from '@inertiajs/react';
import { useAppContext } from '@/Contexts/AppContext';
import {
    LayoutDashboard,
    Users,
    UserCircle,
    Settings,
    ShieldCheck,
    ChevronLeft,
    LogOut
} from 'lucide-react';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Pengguna', href: '/users', icon: Users },
    { name: 'Profil', href: '/profile', icon: UserCircle },
    { name: 'Pengaturan', href: '/settings', icon: Settings },
    { name: 'Superadmin', href: '/superadmin', icon: ShieldCheck },
];

function NavItem({ item, isCollapsed, isActive }) {
    const Icon = item.icon;

    return (
        <Link
            href={item.href}
            className={`
                flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-sm font-medium
                transition-all duration-300 group relative
                ${isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200/50 dark:shadow-indigo-900/50'
                    : 'text-gray-500 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 dark:hover:text-indigo-400'
                }
            `}
        >
            <span className={`flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            </span>

            <span className={`
                transition-all duration-300 whitespace-nowrap overflow-hidden
                ${isCollapsed ? 'w-0 opacity-0 transform -translate-x-2' : 'w-auto opacity-100 transform translate-x-0'}
            `}>
                {item.name}
            </span>

            {/* Active Indicator (Dot) */}
            {isActive && !isCollapsed && (
                <span className="absolute right-3 w-1.5 h-1.5 bg-white rounded-full transition-all duration-500 animate-pulse" />
            )}

            {/* Tooltip when collapsed */}
            {isCollapsed && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900/90 dark:bg-slate-800/90 backdrop-blur-md text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 shadow-xl border border-white/10 translate-x-1 group-hover:translate-x-0">
                    {item.name}
                </div>
            )}
        </Link>
    );
}

export default function Sidebar() {
    const { url } = usePage();
    const {
        isCollapsed, isMobileOpen, isSidebarWide,
        toggleSidebar, setHovered, closeMobile
    } = useAppContext();

    const sidebarClasses = `
        fixed top-0 left-0 h-full z-30
        flex flex-col
        bg-white/80 dark:bg-[#020617]/80 backdrop-blur-xl
        border-r border-gray-200/50 dark:border-slate-800/50
        transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1)
        transition-theme will-change-layout
        ${isSidebarWide ? 'w-[280px]' : 'w-[80px] shadow-none'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed && isSidebarWide ? 'shadow-2xl shadow-indigo-500/10 dark:shadow-slate-900/50' : ''}
    `;

    return (
        <aside
            className={sidebarClasses}
            onMouseEnter={() => isCollapsed && setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Logo Section */}
            <div className={`flex items-center h-16 px-5 shrink-0 transition-all duration-300 ${isSidebarWide ? 'justify-between' : 'justify-center'}`}>
                <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className={`transition-all duration-500 ${isSidebarWide ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4 overflow-hidden'}`}>
                        <span className="font-extrabold text-gray-900 dark:text-white text-xl tracking-tight">
                            Daily<span className="text-indigo-600">.</span>
                        </span>
                    </div>
                </div>

                {/* Desktop Sidebar Toggle (Hamburger inside Logo Area) */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleSidebar();
                    }}
                    className={`
                        hidden lg:flex flex-col items-center justify-center gap-1 w-8 h-8 rounded-xl
                        bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 
                        hover:border-indigo-500/50 transition-all duration-500
                        ${!isSidebarWide ? 'scale-0 opacity-0 absolute pointer-events-none' : 'scale-100 opacity-100'}
                    `}
                >
                    <div className="w-4 h-0.5 bg-indigo-600 rounded-full" />
                    <div className="w-3 h-0.5 bg-indigo-600 rounded-full -translate-x-0.5" />
                    <div className="w-4 h-0.5 bg-indigo-600 rounded-full" />
                </button>

                {/* Mobile close */}
                {isMobileOpen && (
                    <button onClick={closeMobile} className="lg:hidden p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-500 hover:text-gray-900">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto no-scrollbar">
                <p className={`
                    text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-[0.2em] mb-4 px-2 
                    transition-all duration-300 ${isSidebarWide ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden mb-0'}
                `}>
                    Main Navigation
                </p>
                {navItems.map((item) => (
                    <NavItem
                        key={item.href}
                        item={item}
                        isCollapsed={!isSidebarWide}
                        isActive={url.startsWith(item.href)}
                    />
                ))}
            </nav>

            {/* User Profile Section */}
            <div className={`
                p-4 border-t border-gray-100/50 dark:border-slate-800/50 flex-shrink-0 transition-all duration-500 
                ${!isSidebarWide ? 'bg-transparent' : 'bg-gray-50/50 dark:bg-slate-900/10'}
            `}>
                <div className={`flex items-center gap-3 ${!isSidebarWide ? 'justify-center transition-all duration-500' : ''}`}>
                    <div className="relative flex-shrink-0 group/profile cursor-pointer" onClick={() => router.get('/profile')}>
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-indigo-500/20 transition-all duration-500 group-hover/profile:scale-105">
                            AD
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white dark:border-[#020617] rounded-full" />
                    </div>

                    <div className={`flex-1 transition-all duration-500 ${!isSidebarWide ? 'opacity-0 w-0 overflow-hidden -translate-x-4' : 'opacity-100 w-auto translate-x-0'}`}>
                        <p className="text-sm font-bold text-gray-900 dark:text-white whitespace-nowrap leading-tight">Admin Dashboard</p>
                        <p className="text-[11px] font-medium text-gray-400 dark:text-slate-500 whitespace-nowrap">Administrator</p>
                    </div>

                    {/* Logout Action */}
                    <button
                        onClick={() => router.post('/logout')}
                        className={`
                            p-2 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-300
                            ${!isSidebarWide ? 'hidden' : 'block'}
                        `}
                        title="Logout"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {/* Desktop Floating Toggle Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    toggleSidebar();
                }}
                className="hidden lg:flex absolute -right-4 top-24 w-8 h-8 bg-indigo-600 text-white rounded-full items-center justify-center shadow-lg shadow-indigo-500/40 hover:scale-110 transition-all z-50 border-4 border-white dark:border-slate-950 group/toggle"
            >
                <ChevronLeft size={16} strokeWidth={3} className={`transition-transform duration-500 ${isCollapsed ? 'rotate-180' : ''}`} />
            </button>
        </aside>
    );
}
