@props([
    'id',
    'title' => null,
    'maxWidth' => '2xl', // sm, md, lg, xl, 2xl, 3xl, 4xl, 5xl, full
    'closeable' => true,
])

@php
    $maxWidthClass = [
        'sm' => 'sm:max-w-sm',
        'md' => 'sm:max-w-md',
        'lg' => 'sm:max-w-lg',
        'xl' => 'sm:max-w-xl',
        '2xl' => 'sm:max-w-2xl',
        '3xl' => 'sm:max-w-3xl',
        '4xl' => 'sm:max-w-4xl',
        '5xl' => 'sm:max-w-5xl',
        'full' => 'sm:max-w-full',
    ][$maxWidth] ?? 'sm:max-w-2xl';
@endphp

{{-- Modal backdrop: clicking this div directly closes the modal --}}
<div 
    id="{{ $id }}"
    class="fixed inset-0 z-60 items-center justify-center p-4 hidden modal-container"
    role="dialog" 
    aria-modal="true"
    aria-labelledby="modal-title-{{ $id }}"
>
    {{-- Dark blur overlay (pointer-events-none so clicks pass through to .modal-container) --}}
    <div class="absolute inset-0 bg-slate-950/60 backdrop-blur-sm pointer-events-none" aria-hidden="true"></div>

    {{-- Panel (pointer-events-auto to capture interactions inside) --}}
    <div class="relative w-full {{ $maxWidthClass }} bg-white dark:bg-slate-900 rounded-4xl text-left shadow-2xl border border-gray-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-300 pointer-events-auto">
        @if($title)
            <div class="px-8 py-6 border-b border-gray-50 dark:border-slate-800/50 flex items-center justify-between">
                <h3 class="text-xl font-black text-gray-900 dark:text-white tracking-tight" id="modal-title-{{ $id }}">
                    {{ $title }}
                </h3>
                @if($closeable)
                    <button type="button" class="text-slate-400 hover:text-indigo-600 transition-colors close-modal-btn" aria-label="Tutup">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    </button>
                @endif
            </div>
        @endif

        <div class="px-8 py-8">
            {{ $slot }}
        </div>

        @if(isset($footer))
            <div class="px-8 py-6 bg-slate-50/50 dark:bg-slate-950/20 border-t border-gray-50 dark:border-slate-800/50 flex flex-row-reverse gap-3">
                {{ $footer }}
            </div>
        @endif
    </div>
</div>
