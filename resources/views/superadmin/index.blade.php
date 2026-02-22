@extends('layouts.app')

@section('title', 'Dashboard')

@section('content')

{{-- ── Welcome Banner ─────────────────────────────────────────────── --}}
<div class="relative overflow-hidden rounded-3xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
    {{-- Background gradient --}}
    <div class="absolute inset-0 bg-linear-to-br from-indigo-600 via-indigo-500 to-purple-600 dark:from-indigo-700 dark:via-indigo-600 dark:to-purple-700"></div>

    {{-- Decorative blobs --}}
    <div class="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    <div class="absolute -bottom-20 -left-10 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
    <div class="absolute top-1/2 right-1/3 w-40 h-40 bg-cyan-400/10 rounded-full blur-2xl"></div>

    <div class="relative px-8 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 mb-4">
                <div class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <span class="text-[10px] font-bold text-white/80 uppercase tracking-[0.2em]">System Online</span>
            </div>
            <h1 class="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
                Selamat datang, <span class="text-yellow-300">{{ Auth::user()->name }}</span> 👋
            </h1>
            <p class="text-indigo-100/80 text-sm leading-relaxed max-w-lg">
                Anda berada di Panel Superadmin. Kelola pengguna, pantau aktivitas, dan pastikan sistem berjalan optimal dari sini.
            </p>
        </div>
        <div class="flex items-center gap-3 shrink-0">
            <a href="{{ route('superadmin.users.index') }}"
               class="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-indigo-600 font-bold text-sm shadow-xl hover:scale-105 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                Kelola Pengguna
            </a>
        </div>
    </div>
</div>

{{-- ── Stat Cards ──────────────────────────────────────────────────── --}}
@php
    $totalUsers  = \App\Models\User::count();
    $superadmins = \App\Models\User::role('superadmin')->count();
    $admins      = \App\Models\User::role('admin')->count();
    $members     = $totalUsers - $superadmins - $admins;

    $stats = [
        [
            'label'   => 'Total Pengguna',
            'value'   => $totalUsers,
            'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
            'bg'      => 'from-indigo-500 to-indigo-600',
            'shadow'  => 'shadow-indigo-500/30',
            'light'   => 'bg-indigo-50 dark:bg-indigo-950/30',
            'text'    => 'text-indigo-600 dark:text-indigo-400',
            'change'  => '+100%',
        ],
        [
            'label'   => 'Superadmin',
            'value'   => $superadmins,
            'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
            'bg'      => 'from-purple-500 to-purple-600',
            'shadow'  => 'shadow-purple-500/30',
            'light'   => 'bg-purple-50 dark:bg-purple-950/30',
            'text'    => 'text-purple-600 dark:text-purple-400',
            'change'  => 'Admin Tinggi',
        ],
        [
            'label'   => 'Admin',
            'value'   => $admins,
            'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>',
            'bg'      => 'from-blue-500 to-cyan-500',
            'shadow'  => 'shadow-blue-500/30',
            'light'   => 'bg-blue-50 dark:bg-blue-950/30',
            'text'    => 'text-blue-600 dark:text-blue-400',
            'change'  => 'Admin Reguler',
        ],
        [
            'label'   => 'Member',
            'value'   => $members,
            'icon'    => '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
            'bg'      => 'from-emerald-500 to-teal-500',
            'shadow'  => 'shadow-emerald-500/30',
            'light'   => 'bg-emerald-50 dark:bg-emerald-950/30',
            'text'    => 'text-emerald-600 dark:text-emerald-400',
            'change'  => 'Pengguna Biasa',
        ],
    ];
@endphp

<div class="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
    @foreach($stats as $stat)
    <div class="card-hover relative overflow-hidden bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-100 dark:border-slate-800/50 shadow-sm p-6">
        {{-- Background decoration --}}
        <div class="absolute top-0 right-0 w-24 h-24 rounded-full bg-linear-to-br {{ $stat['bg'] }} opacity-5 translate-x-6 -translate-y-6"></div>

        <div class="flex items-start justify-between mb-4">
            {{-- Icon --}}
            <div class="w-11 h-11 rounded-2xl bg-linear-to-br {{ $stat['bg'] }} shadow-lg {{ $stat['shadow'] }} flex items-center justify-center text-white">
                {!! $stat['icon'] !!}
            </div>
            {{-- Badge --}}
            <span class="text-[9px] font-bold {{ $stat['text'] }} {{ $stat['light'] }} px-2.5 py-1 rounded-full uppercase tracking-wider">
                {{ $stat['change'] }}
            </span>
        </div>

        <p class="font-display text-3xl font-extrabold text-gray-900 dark:text-white leading-none mb-1">
            {{ $stat['value'] }}
        </p>
        <p class="text-[10px] font-semibold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
            {{ $stat['label'] }}
        </p>
    </div>
    @endforeach
</div>

{{-- ── Main Grid ───────────────────────────────────────────────────── --}}
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">

    {{-- Quick Actions ──────── --}}
    <div class="lg:col-span-1 bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-100 dark:border-slate-800/50 shadow-sm p-6">
        <h2 class="font-display text-base font-bold text-gray-900 dark:text-white mb-1">Aksi Cepat</h2>
        <p class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-5">Shortcut navigasi</p>

        <div class="space-y-2.5">
            @php
                $actions = [
                    ['label' => 'Tambah Pengguna Baru', 'href' => route('superadmin.users.index'), 'color' => 'indigo', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>'],
                    ['label' => 'Lihat Semua Pengguna', 'href' => route('superadmin.users.index'), 'color' => 'blue', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>'],
                    ['label' => 'Aktivitas Harian Saya', 'href' => route('users.index'), 'color' => 'emerald', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>'],
                    ['label' => 'Profil Saya', 'href' => route('profile'), 'color' => 'purple', 'icon' => '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>'],
                ];
                $colorMap = [
                    'indigo'  => ['bg' => 'bg-indigo-50 dark:bg-indigo-950/30',    'text' => 'text-indigo-600 dark:text-indigo-400',   'hover' => 'hover:bg-indigo-100 dark:hover:bg-indigo-950/50'],
                    'blue'    => ['bg' => 'bg-blue-50 dark:bg-blue-950/30',        'text' => 'text-blue-600 dark:text-blue-400',       'hover' => 'hover:bg-blue-100 dark:hover:bg-blue-950/50'],
                    'emerald' => ['bg' => 'bg-emerald-50 dark:bg-emerald-950/30',  'text' => 'text-emerald-600 dark:text-emerald-400', 'hover' => 'hover:bg-emerald-100 dark:hover:bg-emerald-950/50'],
                    'purple'  => ['bg' => 'bg-purple-50 dark:bg-purple-950/30',    'text' => 'text-purple-600 dark:text-purple-400',   'hover' => 'hover:bg-purple-100 dark:hover:bg-purple-950/50'],
                ];
            @endphp

            @foreach($actions as $action)
            @php $c = $colorMap[$action['color']]; @endphp
            <a href="{{ $action['href'] }}"
               class="flex items-center gap-3.5 px-4 py-3 rounded-2xl {{ $c['bg'] }} {{ $c['hover'] }} transition-all duration-200 group">
                <div class="w-8 h-8 rounded-xl {{ $c['bg'] }} flex items-center justify-center {{ $c['text'] }}">
                    {!! $action['icon'] !!}
                </div>
                <span class="text-sm font-semibold {{ $c['text'] }} flex-1">{{ $action['label'] }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="{{ $c['text'] }} opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                    <path d="m9 18 6-6-6-6"/>
                </svg>
            </a>
            @endforeach
        </div>
    </div>

    {{-- System Info ──────── --}}
    <div class="lg:col-span-2 space-y-6">

        {{-- System Status Card --}}
        <div class="bg-white dark:bg-slate-900/80 rounded-3xl border border-gray-100 dark:border-slate-800/50 shadow-sm p-6">
            <h2 class="font-display text-base font-bold text-gray-900 dark:text-white mb-1">Status Sistem</h2>
            <p class="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-5">Monitoring infrastruktur</p>

            <div class="space-y-3.5">
                @php
                    $services = [
                        ['name' => 'Laravel Backend', 'status' => 'online',   'ping' => '12ms'],
                        ['name' => 'Database MySQL',  'status' => 'online',   'ping' => '4ms'],
                        ['name' => 'Vite Dev Server', 'status' => 'online',   'ping' => '—'],
                        ['name' => 'Auth / Session',  'status' => 'online',   'ping' => 'OK'],
                    ];
                @endphp
                @foreach($services as $svc)
                <div class="flex items-center gap-4 p-3.5 rounded-2xl bg-gray-50/80 dark:bg-slate-800/40">
                    <div class="w-2 h-2 rounded-full {{ $svc['status'] === 'online' ? 'bg-emerald-500' : 'bg-rose-500' }} shadow-lg {{ $svc['status'] === 'online' ? 'shadow-emerald-500/50' : 'shadow-rose-500/50' }} shrink-0 animate-pulse"></div>
                    <span class="text-sm font-semibold text-gray-700 dark:text-slate-300 flex-1">{{ $svc['name'] }}</span>
                    <span class="text-[9px] font-bold {{ $svc['status'] === 'online' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30' : 'text-rose-500 bg-rose-50 dark:bg-rose-950/30' }} px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {{ $svc['status'] }}
                    </span>
                    <span class="text-[10px] font-mono text-slate-400 dark:text-slate-500 w-12 text-right">{{ $svc['ping'] }}</span>
                </div>
                @endforeach
            </div>
        </div>

        {{-- Info Card --}}
        <div class="relative overflow-hidden bg-linear-to-br from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-slate-700/50 shadow-sm p-6">
            <div class="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl"></div>
            <div class="absolute -bottom-8 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div class="relative">
                <div class="flex items-center gap-2 mb-4">
                    <div class="w-7 h-7 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-indigo-400"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    </div>
                    <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Info Sistem</span>
                </div>
                <h3 class="font-display text-lg font-bold text-white mb-2">Daily Tracker — Laravel Edition</h3>
                <p class="text-sm text-slate-400 leading-relaxed mb-4">
                    Dibangun dengan <span class="text-indigo-400 font-semibold">Laravel 12</span> + <span class="text-purple-400 font-semibold">Blade + Vite</span>. Autentikasi menggunakan <span class="text-cyan-400 font-semibold">Spatie Permission</span>.
                </p>
                <div class="flex flex-wrap gap-2">
                    @foreach(['Laravel 12', 'Tailwind v4', 'Spatie Roles', 'SweetAlert2', 'Vite'] as $tag)
                    <span class="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 uppercase tracking-wider">{{ $tag }}</span>
                    @endforeach
                </div>
            </div>
        </div>

    </div>
</div>

@endsection
