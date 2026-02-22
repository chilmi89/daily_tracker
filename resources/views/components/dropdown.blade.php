@props([
    'align' => 'right',
    'width' => '48',
    'contentClasses' => 'py-2 bg-white dark:bg-slate-900',
    'trigger',
])

@php
switch ($align) {
    case 'left':
        $alignmentClasses = 'origin-top-left left-0';
        break;
    case 'top':
        $alignmentClasses = 'origin-bottom';
        break;
    case 'right':
    default:
        $alignmentClasses = 'origin-top-right right-0';
        break;
}

switch ($width) {
    case '48':
        $width = 'w-48';
        break;
    case '64':
        $width = 'w-64';
        break;
}
@endphp

<div class="relative dropdown-container">
    <div class="dropdown-trigger cursor-pointer">
        {{ $trigger }}
    </div>

    <div class="absolute z-[100] mt-2 {{ $width }} rounded-2xl shadow-2xl shadow-indigo-500/10 border border-gray-100 dark:border-slate-800/50 {{ $alignmentClasses }} hidden dropdown-menu animate-in fade-in zoom-in duration-200">
        <div class="rounded-2xl ring-1 ring-black ring-opacity-5 {{ $contentClasses }}">
            {{ $slot }}
        </div>
    </div>
</div>
