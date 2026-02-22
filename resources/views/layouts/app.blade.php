<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="h-full font-sans">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Daily Tracker') }} - @yield('title')</title>

    <!-- Fonts: Inter (body) + Plus Jakarta Sans (headings) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Scripts and Styles -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased bg-slate-50 dark:bg-[#080c14] text-slate-900 dark:text-white h-full overflow-hidden">
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
                @yield('content')
            </div>

            <!-- Footer -->
            <footer class="p-6 text-center text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-[0.2em] bg-white/20 dark:bg-slate-900/10 backdrop-blur-sm border-t border-gray-100 dark:border-slate-800/40">
                &copy; {{ date('Y') }} Daily Tracker<span class="text-indigo-600">.</span> All rights reserved.
            </footer>
        </main>
    </div>

    <x-toast />
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {

            @if(session('success'))
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: {!! json_encode(session('success')) !!},
                timer: 3000,
                timerProgressBar: true,
                showConfirmButton: false,
                position: 'center',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    timerProgressBar: 'swal-progress-success',
                }
            });
            @endif

            @if(session('error'))
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: {!! json_encode(session('error')) !!},
                showConfirmButton: true,
                confirmButtonText: 'Tutup',
                customClass: {
                    popup: 'swal-custom-popup',
                    title: 'swal-custom-title',
                    confirmButton: 'swal-btn-confirm',
                }
            });
            @endif

            @if(session('toast'))
            @php $t = session('toast'); @endphp
            Swal.fire({
                icon: {!! json_encode($t['type'] ?? 'info') !!},
                title: {!! json_encode($t['type'] === 'success' ? 'Berhasil!' : ($t['type'] === 'error' ? 'Gagal!' : 'Info')) !!},
                text: {!! json_encode($t['message'] ?? '') !!},
                timer: 3500,
                timerProgressBar: true,
                showConfirmButton: false,
                toast: true,
                position: 'top-end',
                customClass: {
                    popup: 'swal-custom-toast',
                }
            });
            @endif

        });
    </script>

    {{-- SweetAlert2 Custom Styles --}}
    <style>
        .swal-custom-popup {
            border-radius: 1.5rem !important;
            border: 1px solid rgba(99,102,241,0.15) !important;
            box-shadow: 0 25px 60px rgba(0,0,0,0.15) !important;
            font-family: 'Inter', sans-serif !important;
            padding: 2rem 2rem 1.75rem !important;
        }
        .swal-custom-title {
            font-family: 'Plus Jakarta Sans', 'Inter', sans-serif !important;
            font-weight: 700 !important;
            font-size: 1.15rem !important;
            color: #0f172a !important;
        }
        .dark .swal-custom-title {
            color: #f1f5f9 !important;
        }
        .swal-custom-toast {
            border-radius: 1rem !important;
            border: 1px solid rgba(99,102,241,0.2) !important;
            box-shadow: 0 10px 30px rgba(0,0,0,0.12) !important;
            font-family: 'Inter', sans-serif !important;
        }
        .swal-btn-confirm {
            background: #6366f1 !important;
            border-radius: 0.75rem !important;
            font-family: 'Inter', sans-serif !important;
            font-weight: 600 !important;
            padding: 0.6rem 1.5rem !important;
            box-shadow: 0 4px 15px rgba(99,102,241,0.3) !important;
        }
        .swal-btn-confirm:hover {
            background: #4f46e5 !important;
        }
        .swal-progress-success {
            background: #10b981 !important;
            border-radius: 0 0 1.5rem 1.5rem !important;
        }
        .swal2-icon.swal2-success .swal2-success-ring {
            border-color: rgba(16,185,129,0.3) !important;
        }
        .swal2-icon.swal2-error [class^=swal2-x-mark-line] {
            background-color: #ef4444 !important;
        }
    </style>
    @stack('scripts')
</body>
</html>
