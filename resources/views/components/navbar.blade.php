<header class="h-20 flex items-center justify-between px-8 border-b border-gray-100 dark:border-slate-800/40 bg-white/40 dark:bg-slate-950/20 backdrop-blur-md sticky top-0 z-40">
    <div class="flex items-center gap-4">
        <div class="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-lg shadow-emerald-500/40"></div>
            <span class="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em] leading-none">System Online</span>
        </div>
    </div>

    <div class="flex items-center gap-4">
        <!-- Theme Toggle -->
        <button id="theme-toggle" class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 transition-all active:scale-95 group/theme border border-transparent hover:border-gray-100 dark:hover:border-white/5 shadow-sm hover:shadow-lg hover:shadow-indigo-500/5 items-center justify-center">
            <svg id="theme-icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hidden"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
            <svg id="theme-icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="hidden"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
        </button>

        <button class="p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-indigo-950/20 text-slate-500 dark:text-slate-400 transition-all flex items-center gap-3 font-bold text-xs uppercase tracking-widest relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
            <span class="absolute top-2 right-2 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white dark:border-slate-950 shadow-sm"></span>
        </button>
        
        <div class="h-10 w-px bg-gray-100 dark:bg-slate-800 mx-2"></div>

        <div class="flex items-center gap-3 pl-2 relative dropdown-container">
            <button class="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group/profile border border-transparent hover:border-gray-100 dark:hover:border-white/5 dropdown-trigger">
                <div class="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-xl shadow-indigo-500/20 ring-2 ring-white dark:ring-slate-900 group-hover/profile:scale-105 transition-transform duration-300">
                    {{ substr(Auth::user()->name, 0, 1) }}
                </div>
                <div class="text-left hidden sm:block">
                    <p class="text-[11px] font-black text-gray-900 dark:text-white tracking-tight leading-none group-hover/profile:text-indigo-600 dark:group-hover/profile:text-indigo-400 transition-colors">{{ Auth::user()->name }}</p>
                    <p class="text-[8px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest mt-1.5 opacity-70">{{ Auth::user()->roles->first()->name ?? 'Member' }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="ml-1 text-slate-400 group-hover/profile:text-indigo-600 transition-all dropdown-arrow"><path d="m6 9 6 6 6-6"/></svg>
            </button>

            <!-- Profile Dropdown -->
            <div class="dropdown-menu hidden absolute top-full right-0 mt-3 w-64 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-[2rem] border border-gray-100 dark:border-white/5 shadow-2xl shadow-indigo-500/10 p-2 z-50 overflow-hidden transform origin-top-right transition-all duration-200">
                <div class="p-4 mb-1">
                    <div class="flex items-center gap-3 mb-4">
                        <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-sm">
                            {{ substr(Auth::user()->name, 0, 1) }}
                        </div>
                        <div>
                            <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight">{{ Auth::user()->name }}</p>
                            <p class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mt-0.5">{{ Auth::user()->roles->first()->name ?? 'Member' }}</p>
                        </div>
                    </div>
                    <div class="h-px bg-gray-50 dark:bg-white/5 w-full"></div>
                </div>

                <div class="space-y-1">
                    <a href="{{ route('profile') }}" class="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all group/item">
                        <div class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover/item:bg-indigo-500 group-hover/item:text-white transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                        <span class="text-xs font-black uppercase tracking-widest">Profil Saya</span>
                    </a>
                </div>

                <div class="p-2 mt-2 border-t border-gray-50 dark:border-white/5">
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all group/logout">
                            <div class="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center group-hover/logout:bg-rose-500 group-hover/logout:text-white transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="group-hover/logout:-translate-x-0.5 transition-transform"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
                            </div>
                            <span class="text-xs font-black uppercase tracking-widest">Logout</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</header>
