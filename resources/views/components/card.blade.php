@props([
    'title' => null,
    'description' => null,
    'icon' => null,
    'variant' => 'glass', // glass, white, gradient, flat
    'padding' => 'p-8',
    'animate' => true,
    'class' => '',
])

@php
    $baseStyles = "rounded-4xl border transition-all duration-500 relative overflow-hidden group/card shadow-sm";
    
    $variants = [
        'glass' => "bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl border-gray-100 dark:border-slate-800/40",
        'white' => "bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800",
        'gradient' => "bg-linear-to-br from-indigo-600 to-purple-600 text-white border-transparent",
        'flat' => "bg-slate-50 dark:bg-slate-900/40 border-slate-100 dark:border-slate-800",
    ];
    
    $animation = $animate ? "hover:scale-[1.01] hover:shadow-2xl hover:shadow-indigo-500/10" : "";
    $variantStyle = $variants[$variant] ?? $variants['glass'];
@endphp

<div {{ $attributes->merge(['class' => "$baseStyles $variantStyle $animation $class"]) }}>
    <!-- Decorative Glow for Glass Variant -->
    @if($variant === 'glass')
        <div class="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 blur-3xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000"></div>
    @endif

    <div class="{{ $padding }} relative z-10 h-full flex flex-col">
        @if($title || $icon || isset($header))
            <div class="flex items-center justify-between mb-8">
                <div class="min-w-0">
                    <div class="flex items-center gap-3">
                        @if($icon)
                            <div class="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover/card:rotate-6 transition-transform duration-500">
                                {!! $icon !!}
                            </div>
                        @endif
                        @if($title)
                            <h2 class="text-xl font-black {{ $variant === 'gradient' ? 'text-white' : 'text-gray-900 dark:text-white' }} tracking-tight">
                                {{ $title }}
                            </h2>
                        @endif
                    </div>
                    @if($description)
                        <p class="text-xs font-bold {{ $variant === 'gradient' ? 'text-indigo-100' : 'text-slate-500' }} uppercase tracking-widest mt-1">
                            {{ $description }}
                        </p>
                    @endif
                </div>

                @if(isset($header))
                    <div>{{ $header }}</div>
                @endif
            </div>
        @endif

        <div class="flex-1">
            {{ $slot }}
        </div>

        @if(isset($footer))
            <div class="mt-8 pt-6 border-t {{ $variant === 'gradient' ? 'border-white/10' : 'border-gray-50 dark:border-slate-800/40' }}">
                {{ $footer }}
            </div>
        @endif
    </div>
</div>
