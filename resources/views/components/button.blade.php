@props([
    'variant' => 'primary',
    'size' => 'md',
    'type' => 'button',
])

@php
    $variants = [
        'primary' => 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 shadow-[0_10px_30px_-10px_rgba(79,70,229,0.3)]',
        'indigo' => 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20',
        'secondary' => 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-gray-100 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-indigo-950/20',
        'danger' => 'bg-rose-500 hover:bg-rose-400 text-white shadow-lg shadow-rose-500/20',
        'flat' => 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700',
        'ghost' => 'text-slate-500 hover:bg-slate-50 dark:hover:bg-indigo-950/20',
    ];

    $sizes = [
        'sm' => 'px-4 py-2 text-xs',
        'md' => 'px-6 py-3.5 text-sm',
        'lg' => 'px-8 py-4 text-base',
    ];

    $classes = "inline-flex items-center justify-center font-black tracking-tight rounded-2xl transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none " . $variants[$variant] . " " . $sizes[$size];
@endphp

<button {{ $attributes->merge(['type' => $type, 'class' => $classes]) }}>
    {{ $slot }}
</button>
