import './bootstrap';
import '../css/app.css';

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const desktopToggle = document.getElementById('desktop-toggle');
    const mainContent = document.getElementById('main-content');
    const overlay = document.getElementById('sidebar-overlay');

    // Sidebar Sub-menu (Dropdown) Logic
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const parent = trigger.closest('.sidebar-dropdown');
            const content = parent.querySelector('.dropdown-content');
            const arrow = trigger.querySelector('.arrow-icon');
            
            // Toggle current dropdown
            const isHidden = content.classList.contains('hidden');
            
            // Close other dropdowns in the same segment
            parent.parentElement.querySelectorAll('.dropdown-content').forEach(otherContent => {
                if (otherContent !== content) {
                    otherContent.classList.add('hidden');
                    otherContent.previousElementSibling.querySelector('.arrow-icon')?.classList.remove('rotate-180');
                }
            });

            if (isHidden) {
                content.classList.remove('hidden');
                arrow?.classList.add('rotate-180');
            } else {
                content.classList.add('hidden');
                arrow?.classList.remove('rotate-180');
            }
        });
    });

    // Unified Sidebar Toggle Logic (Hover + Pinning)
    let isPinned = localStorage.getItem('sidebar-pinned') === 'true';
    if (isPinned && window.innerWidth >= 1024) {
        sidebar.classList.add('w-72');
        sidebar.classList.remove('w-20');
        mainContent.classList.add('lg:ml-72');
        mainContent.classList.remove('lg:ml-20');
    } else if (window.innerWidth >= 1024) {
        sidebar.classList.add('w-20');
        sidebar.classList.remove('w-72');
        mainContent.classList.add('lg:ml-20');
        mainContent.classList.remove('lg:ml-72');
        document.querySelectorAll('.nav-label').forEach(el => el.classList.add('opacity-0', 'invisible', 'w-0', 'h-0'));
    }

    const setSidebarState = (expand) => {
        if (window.innerWidth < 1024) return;
        
        if (expand) {
            sidebar.classList.remove('w-20');
            sidebar.classList.add('w-72');
            mainContent.classList.remove('lg:ml-20');
            mainContent.classList.add('lg:ml-72');
            document.querySelectorAll('.nav-label').forEach(el => el.classList.remove('opacity-0', 'invisible', 'w-0', 'h-0'));
            document.getElementById('sidebar-header').classList.remove('justify-center');
            document.getElementById('sidebar-header').classList.add('justify-between');
        } else {
            sidebar.classList.remove('w-72');
            sidebar.classList.add('w-20');
            mainContent.classList.remove('lg:ml-72');
            mainContent.classList.add('lg:ml-20');
            document.querySelectorAll('.nav-label').forEach(el => el.classList.add('opacity-0', 'invisible', 'w-0', 'h-0'));
            document.getElementById('sidebar-header').classList.add('justify-center');
            document.getElementById('sidebar-header').classList.remove('justify-between');
        }
    };

    const togglePin = () => {
        if (window.innerWidth >= 1024) {
            isPinned = !isPinned;
            localStorage.setItem('sidebar-pinned', isPinned);
            setSidebarState(isPinned);
        } else {
            // Mobile: Standard Off-canvas Toggle
            sidebar.classList.toggle('-translate-x-full');
            sidebar.classList.toggle('translate-x-0');
            overlay.classList.toggle('hidden');
        }
    };

    sidebar.addEventListener('mouseenter', () => !isPinned && setSidebarState(true));
    sidebar.addEventListener('mouseleave', () => !isPinned && setSidebarState(false));
    sidebarToggle?.addEventListener('click', togglePin);
    overlay?.addEventListener('click', () => {
        sidebar.classList.add('-translate-x-full');
        sidebar.classList.remove('translate-x-0');
        overlay.classList.add('hidden');
    });

    // Modal Utility
    window.openModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('overflow-hidden');
        }
    };

    window.closeModal = (id) => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.body.classList.remove('overflow-hidden');
        }
    };

    // Modal: close on overlay click (click outside the panel) or close-btn
    document.addEventListener('click', (e) => {
        // Close button inside modal
        if (e.target.closest('.close-modal-btn')) {
            const modal = e.target.closest('.modal-container');
            if (modal) closeModal(modal.id);
            return;
        }

        // Click directly on the modal backdrop (the outermost .modal-container div)
        if (e.target.classList.contains('modal-container')) {
            closeModal(e.target.id);
        }
    });

    // ESC key to close any open modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-container:not(.hidden)').forEach(modal => {
                closeModal(modal.id);
            });
        }
    });

    // Theme Management Logic
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            sunIcon?.classList.remove('hidden');
            moonIcon?.classList.add('hidden');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            sunIcon?.classList.add('hidden');
            moonIcon?.classList.remove('hidden');
            localStorage.setItem('theme', 'light');
        }
    };

    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);

    themeToggle?.addEventListener('click', () => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'light' : 'dark');
    });

    // Dropdown Utility
    document.addEventListener('click', (e) => {
        const dropdownContainer = e.target.closest('.dropdown-container');
        
        // Close all other dropdowns
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
            if (!dropdownContainer || menu !== dropdownContainer.querySelector('.dropdown-menu')) {
                menu.classList.add('hidden');
                menu.closest('.dropdown-container')?.querySelector('.dropdown-arrow')?.classList.remove('rotate-180');
            }
        });

        if (dropdownContainer) {
            const trigger = e.target.closest('.dropdown-trigger');
            if (trigger) {
                const menu = dropdownContainer.querySelector('.dropdown-menu');
                const arrow = trigger.querySelector('.dropdown-arrow');
                const isHidden = menu.classList.toggle('hidden');
                
                if (isHidden) {
                    arrow?.classList.remove('rotate-180');
                } else {
                    arrow?.classList.add('rotate-180');
                }
            }
        }
    });


    // ----------------------------------------
    // Global Toast Notification
    // ----------------------------------------
    const TOAST_CONFIGS = {
        success: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
            classes: 'border-emerald-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-emerald-500 bg-emerald-500/10',
            barClass: 'bg-emerald-500',
            label: 'Berhasil',
            labelClass: 'text-emerald-600 dark:text-emerald-400',
        },
        error: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
            classes: 'border-rose-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-rose-500 bg-rose-500/10',
            barClass: 'bg-rose-500',
            label: 'Gagal',
            labelClass: 'text-rose-600 dark:text-rose-400',
        },
        warning: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
            classes: 'border-amber-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-amber-500 bg-amber-500/10',
            barClass: 'bg-amber-500',
            label: 'Peringatan',
            labelClass: 'text-amber-600 dark:text-amber-400',
        },
        info: {
            icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
            classes: 'border-blue-500/30 bg-white dark:bg-slate-900',
            iconClasses: 'text-blue-500 bg-blue-500/10',
            barClass: 'bg-blue-500',
            label: 'Info',
            labelClass: 'text-blue-600 dark:text-blue-400',
        },
    };

    window.showToast = (type = 'info', message = '', duration = 4000) => {
        const container = document.getElementById('toast-container');
        if (!container) return;

        const cfg = TOAST_CONFIGS[type] ?? TOAST_CONFIGS.info;
        const id  = `toast-${Date.now()}`;

        const el = document.createElement('div');
        el.id = id;
        el.className = `pointer-events-auto w-full rounded-2xl border shadow-xl shadow-black/10 overflow-hidden
            translate-x-full opacity-0 transition-all duration-500 ease-out ${cfg.classes}`;

        el.innerHTML = `
            <div class="flex items-start gap-4 px-5 py-4">
                <div class="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center ${cfg.iconClasses}">
                    ${cfg.icon}
                </div>
                <div class="flex-1 min-w-0 pt-0.5">
                    <p class="text-[10px] font-black uppercase tracking-widest mb-0.5 ${cfg.labelClass}">${cfg.label}</p>
                    <p class="text-sm font-semibold text-gray-700 dark:text-slate-200 leading-snug">${message}</p>
                </div>
                <button onclick="dismissToast('${id}')" class="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            <div class="h-0.5 w-full ${cfg.barClass} toast-progress" style="transform-origin:left; transition: transform ${duration}ms linear;"></div>
        `;

        container.prepend(el);

        // Animate in
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.classList.remove('translate-x-full', 'opacity-0');
                el.classList.add('translate-x-0', 'opacity-100');
                // shrink progress bar
                const bar = el.querySelector('.toast-progress');
                if (bar) bar.style.transform = 'scaleX(0)';
            });
        });

        // Auto-dismiss
        const timer = setTimeout(() => dismissToast(id), duration);
        el._timer = timer;
    };

    window.dismissToast = (id) => {
        const el = document.getElementById(id);
        if (!el) return;
        clearTimeout(el._timer);
        el.classList.add('translate-x-full', 'opacity-0');
        el.classList.remove('translate-x-0', 'opacity-100');
        setTimeout(() => el.remove(), 500);
    };

    console.log('Daily Tracker Premium Boilerplate UI initialized');
});
