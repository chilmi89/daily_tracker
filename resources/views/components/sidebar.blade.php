<aside id="sidebar" class="fixed top-0 left-0 w-72 bg-white/95 dark:bg-slate-950/95 backdrop-blur-3xl border-r border-gray-100 dark:border-white/5 h-full flex flex-col transition-all duration-500 z-50 lg:translate-x-0 -translate-x-full group/sidebar overflow-hidden">
    <!-- Sidebar Header -->
    <div id="sidebar-header" class="h-24 px-6 flex items-center justify-between border-b border-gray-50 dark:border-white/5 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shrink-0 transition-all duration-500">
        <div class="flex items-center gap-3.5 logo-container transition-all duration-500 overflow-hidden">
            <div class="nav-label transition-all duration-500 whitespace-nowrap overflow-hidden logo-text opacity-100">
                <span class="font-display text-xl font-extrabold text-gray-900 dark:text-white tracking-tight uppercase leading-none block">Daily<span class="text-indigo-600">Tracker</span></span>
                <p class="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em] mt-0.5">Workspace v1.0</p>
            </div>
        </div>

        <button id="sidebar-toggle" class="p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all active:scale-95 group/toggle border border-transparent hover:border-gray-100 dark:hover:border-white/5 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 z-20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="toggle-icon transition-transform duration-500"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
        </button>
    </div>

    <!-- Navigation Content -->
    <nav class="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto no-scrollbar custom-scrollbar transition-all duration-500">
        @php
            $navItems = [
                ['name' => 'Dashboard', 'icon' => 'layout-dashboard', 'route' => 'dashboard'],
                ['name' => 'Profile Saya', 'icon' => 'user', 'route' => 'profile'],
                ['name' => 'Aktivitas Harian', 'icon' => 'list-todo', 'route' => 'users.index'],
            ];

            if (Auth::user()->hasRole('superadmin')) {
                $navItems[] = ['name' => 'Superadmin Panel', 'icon' => 'shield-check', 'route' => 'superadmin.index'];
                $navItems[] = ['name' => 'Kelola Pengguna', 'icon' => 'users', 'route' => 'superadmin.users.index'];
            }
        @endphp

        @foreach($navItems as $item)
            @php
                $isActive = isset($item['route']) && $item['route'] !== '#' && request()->routeIs($item['route']);
            @endphp

            <div class="space-y-1">
                <a href="{{ (isset($item['route']) && $item['route'] !== '#') ? route($item['route']) : '#' }}"
                   class="flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group/nav relative {{ $isActive ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-500/30' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400' }}">

                    <div class="shrink-0 {{ $isActive ? 'text-white' : 'text-slate-400 group-hover/nav:text-indigo-600 dark:group-hover/nav:text-indigo-400 transition-colors duration-300' }}">
                         @if($item['icon'] === 'layout-dashboard') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>
                         @elseif($item['icon'] === 'user') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                         @elseif($item['icon'] === 'users') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                         @elseif($item['icon'] === 'list-todo') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 18 18"/><path d="M15 3h6v6"/><path d="M9 21H3v-6"/></svg>
                         @elseif($item['icon'] === 'shield-check') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1-1z"/><path d="m9 12 2 2 4-4"/></svg>
                         @elseif($item['icon'] === 'database') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
                         @elseif($item['icon'] === 'key') <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4.1a1 1 0 0 0-1.4 0l-2.1 2.1a1 1 0 0 0 0 1.4Zm-5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L14.2 11.6a1 1 0 0 0-1.4 0l-2.1 2.1a1 1 0 0 0 0 1.4Z"/><path d="m7.5 15.5-5 5"/><path d="m9 14 1.5 1.5"/><path d="m10.5 12.5 1.5 1.5"/><path d="m12 11 1.5 1.5"/><path d="M4 19a2 2 0 1 0 4 4 2 2 0 0 0-4-4Z"/></svg>
                         @endif
                    </div>

                    <span class="text-sm font-semibold tracking-tight nav-label transition-all duration-500 whitespace-nowrap overflow-hidden flex-1 opacity-100">{{ $item['name'] }}</span>

                    @if($isActive)
                        <span class="absolute right-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse nav-label transition-all duration-300"></span>
                    @endif
                </a>
            </div>
        @endforeach
    </nav>

</aside>
