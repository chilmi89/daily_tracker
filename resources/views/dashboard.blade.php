@extends('layouts.app')

@section('title', 'Dashboard Overview')

@section('content')
    <x-page-header 
        title="Intelligence Dashboard" 
        description="Monitor system performance and user engagement in real-time."
    />

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        @foreach([
            ['label' => 'Total Pengguna', 'val' => '1,280', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>', 'color' => 'indigo', 'trend' => '+12.5%'],
            ['label' => 'Sesi Aktif', 'val' => '342', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>', 'color' => 'emerald', 'trend' => '+8.2%'],
            ['label' => 'Pendapatan Bersih', 'val' => 'Rp 48M', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>', 'color' => 'amber', 'trend' => '-3.1%'],
            ['label' => 'Support Tickets', 'val' => '27', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>', 'color' => 'rose', 'trend' => '5 baru'],
        ] as $stat)
            <x-card padding="p-6" class="hover:border-{{ $stat['color'] }}-400/30">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-12 h-12 rounded-2xl bg-{{ $stat['color'] }}-500/10 flex items-center justify-center text-{{ $stat['color'] }}-600 shadow-inner group-hover/card:rotate-6 transition-transform">
                        {!! $stat['icon'] !!}
                    </div>
                    <span class="text-[10px] font-black {{ str_contains($stat['trend'], '-') ? 'text-rose-500 bg-rose-500/10' : 'text-emerald-500 bg-emerald-500/10' }} px-2 py-1 rounded-lg uppercase tracking-tight">
                        {{ $stat['trend'] }}
                    </span>
                </div>
                <p class="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{{ $stat['label'] }}</p>
                <p class="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{{ $stat['val'] }}</p>
            </x-card>
        @endforeach
    </div>

    <!-- Charts & Insights Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
        <x-card title="Revenue Streams" description="Monthly financial performance" class="lg:col-span-2">
            <x-slot name="header">
                <div class="flex gap-2">
                    <button class="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">Today</button>
                    <button class="px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Week</button>
                </div>
            </x-slot>
            
            <div class="h-[300px] w-full bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group/graph">
                <div class="absolute inset-0 bg-linear-to-tr from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/graph:opacity-100 transition-opacity duration-1000"></div>
                <div class="text-center group cursor-pointer relative z-10">
                    <div class="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-xl">📈</div>
                    <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Processing Visual Data...</p>
                </div>
            </div>
        </x-card>

        <x-card title="Network Activity" description="Daily user interactions">
            <div class="h-[300px] w-full flex items-end justify-between gap-2 px-4 pt-4">
                @foreach([40, 65, 45, 90, 55, 75, 30] as $h)
                    <div class="flex-1 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-t-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:h-[95%] transition-all duration-700 relative group cursor-help" style="height: {{ $h }}%">
                        <div class="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 shadow-xl border border-slate-800">{{ $h }}%</div>
                    </div>
                @endforeach
            </div>
            <div class="flex justify-between mt-6 px-4">
                @foreach(['S','S','R','K','J','S','M'] as $d)
                    <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ $d }}</span>
                @endforeach
            </div>
        </x-card>
    </div>

    <!-- Bottom Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
        <!-- Recent Intelligence -->
        <x-card title="System Logs" description="Real-time events and security audits">
            <div class="space-y-6">
                @foreach([
                    ['u' => 'Budi Santoso', 'a' => 'Quantum sync completed', 't' => '2m ago', 'v' => 'BS', 'c' => 'indigo'],
                    ['u' => 'Siti Rahayu', 'a' => 'Security protocol updated', 't' => '15m ago', 'v' => 'SR', 'c' => 'emerald'],
                    ['u' => 'Ahmad Dahlan', 'a' => 'Database migration active', 't' => '40m ago', 'v' => 'AD', 'c' => 'amber'],
                    ['u' => 'Super Admin', 'a' => 'System firewall reboot', 't' => '1h ago', 'v' => 'SA', 'c' => 'purple'],
                ] as $act)
                    <div class="flex items-center gap-5 group cursor-default">
                        <div class="w-12 h-12 rounded-2xl bg-{{ $act['c'] }}-500/10 flex items-center justify-center text-{{ $act['c'] }}-600 text-xs font-black group-hover:scale-110 transition-transform duration-500 shadow-sm border border-{{ $act['c'] }}-500/5">
                            {{ $act['v'] }}
                        </div>
                        <div class="flex-1 min-w-0">
                            <p class="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{{ $act['u'] }}</p>
                            <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-tighter opacity-80">{{ $act['a'] }}</p>
                        </div>
                        <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">{{ $act['t'] }}</span>
                    </div>
                @endforeach
            </div>
            <x-slot name="footer">
                <button class="w-full py-3 rounded-2xl border border-gray-100 dark:border-slate-800 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-indigo-600 hover:bg-slate-50 dark:hover:bg-indigo-950/20 transition-all active:scale-95">
                    View Comprehensive Audit Trail
                </button>
            </x-slot>
        </x-card>

        <!-- Command Center (Quick Actions) -->
        <x-card title="Command Center" description="Execute critical system operations" variant="gradient">
            <div class="grid grid-cols-2 gap-4">
                <button onclick="openModal('demo-modal')" class="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                    <div class="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500">🚀</div>
                    <span class="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Deploy Update</span>
                </button>

                <a href="{{ route('superadmin.users.index') }}" class="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                    <div class="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500">👥</div>
                    <span class="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Manage Access</span>
                </a>

                <a href="{{ route('settings') }}" class="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                    <div class="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500">⚙️</div>
                    <span class="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">System Config</span>
                </a>

                <button class="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                    <div class="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500">🛡️</div>
                    <span class="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Audit Shield</span>
                </button>
            </div>
            
            <div class="mt-8 p-6 rounded-2xl bg-black/20 border border-white/5">
                <div class="flex items-center justify-between mb-4">
                    <p class="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Server Health</p>
                    <span class="text-[10px] font-black text-emerald-300">99.9%</span>
                </div>
                <div class="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div class="w-[99%] h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
            </div>
        </x-card>
    </div>

    <!-- Demo Modal -->
    <x-modal id="demo-modal" title="Quantum Deployment" maxWidth="lg">
        <div class="text-center">
            <div class="w-20 h-20 rounded-3xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="animate-bounce"><path d="M12 2v20"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/></svg>
            </div>
            <h4 class="text-lg font-black text-gray-900 dark:text-white mb-2">Initialize Core Update?</h4>
            <p class="text-sm text-slate-500 dark:text-slate-400">This action will synchronize all data across the quantum network. This cannot be undone during processing.</p>
        </div>

        <x-slot name="footer">
            <x-button variant="indigo" class="w-full sm:w-auto" onclick="closeModal('demo-modal')">Authorize Launch</x-button>
            <x-button variant="flat" class="w-full sm:w-auto" onclick="closeModal('demo-modal')">Abort Mission</x-button>
        </x-slot>
    </x-modal>
@endsection
