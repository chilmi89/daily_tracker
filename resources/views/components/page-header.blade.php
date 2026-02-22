@props(['title', 'description'])

<div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-700">
    <div class="space-y-1">
        <h1 class="font-display text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight">
            {{ $title }}<span class="text-indigo-600">.</span>
        </h1>
        @isset($description)
            <p class="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">
                {{ $description }}
            </p>
        @endisset
    </div>
    
    @if($slot->isNotEmpty())
        <div class="flex items-center gap-3">
            {{ $slot }}
        </div>
    @endif
</div>
