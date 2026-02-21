import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

    // Sync theme with class on body
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const toggleTheme = () => setIsDark(!isDark);
    const toggleSidebar = () => setIsCollapsed(!isCollapsed);
    const setHovered = (hovered) => setIsHovered(hovered);
    const openMobile = () => setIsMobileOpen(true);
    const closeMobile = () => setIsMobileOpen(false);

    // Sidebar is "Wide" if it's either Toggled Open OR currently Hovered
    const isSidebarWide = !isCollapsed || isHovered;

    return (
        <AppContext.Provider value={{
            isCollapsed,
            isHovered,
            isMobileOpen,
            isDark,
            isSidebarWide,
            toggleTheme,
            toggleSidebar,
            setHovered,
            openMobile,
            closeMobile
        }}>
            {children}
        </AppContext.Provider>
    );
}

export const useAppContext = () => useContext(AppContext);
