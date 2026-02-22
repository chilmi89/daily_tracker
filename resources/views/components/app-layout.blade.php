<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full font-sans">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Daily Tracker') }} - {{ $title ?? '' }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <!-- Scripts and Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-white h-full overflow-hidden">
    <div class="flex h-full shadow-2xl shadow-indigo-500/10 transition-all duration-700">
        <!-- Sidebar Overlay (Mobile) -->
        <div id="sidebar-overlay" class="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-40 lg:hidden hidden transition-opacity duration-500"></div>

        <!-- Sidebar -->
        <x-sidebar />

        <!-- Main Content -->
        <main id="main-content" class="flex-1 flex flex-col min-w-0 bg-white/40 dark:bg-slate-950/20 backdrop-blur-sm relative overflow-hidden lg:ml-72 transition-all duration-300 ease-in-out">
            <!-- Top Navbar -->
            <x-navbar />

            <!-- Page Content -->
            <div class="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8 space-y-8 pb-24">
                {{ $slot }}
            </div>

            <!-- Footer -->
            <footer class="p-6 text-center text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-[0.2em] bg-white/20 dark:bg-slate-900/10 backdrop-blur-sm border-t border-gray-100 dark:border-slate-800/40">
                &copy; {{ date('Y') }} Daily Tracker<span class="text-indigo-600">.</span> All rights reserved.
            </footer>
        </main>
    </div>

    @stack('scripts')
</body>
</html>
