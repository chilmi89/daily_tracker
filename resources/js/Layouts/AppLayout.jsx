import React from 'react';
import { AppProvider, useAppContext } from '@/Contexts/AppContext';
import Sidebar from '@/Components/Sidebar';
import Topbar from '@/Components/Topbar';

function LayoutContent({ children }) {
    const { isSidebarWide, isCollapsed, isMobileOpen, closeMobile, toggleSidebar } = useAppContext();

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-[#020617] transition-colors duration-500">
            <div className="flex h-full">
                {/* Mobile Overlay */}
                {isMobileOpen && (
                    <div
                        className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-500"
                        onClick={closeMobile}
                    />
                )}

                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div
                    className={`
                        flex flex-col flex-1 min-w-0 transition-all duration-300 ease-in-out 
                        ${isSidebarWide ? 'lg:ml-[280px]' : 'lg:ml-20'}
                    `}
                >
                    {/* Topbar */}
                    <Topbar />

                    {/* Content */}
                    <main className="flex-1 p-4 md:p-6 mt-16">
                        {children}
                    </main>

                    {/* Footer or extra space */}
                    <footer className="p-6 text-center text-xs text-gray-400 dark:text-slate-600">
                        &copy; {new Date().getFullYear()} Daily Tracker . Made with ❤️
                    </footer>
                </div>
            </div>
        </div>
    );
}

export default function AppLayout({ children }) {
    return (
        <AppProvider>
            <LayoutContent>{children}</LayoutContent>
        </AppProvider>
    );
}
