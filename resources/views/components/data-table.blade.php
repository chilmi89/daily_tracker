@props(['headers', 'empty' => false, 'emptyMessage' => 'Data tidak ditemukan'])

<div class="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 shadow-sm overflow-hidden transition-all duration-500">
    <div class="overflow-x-auto no-scrollbar custom-scrollbar">
        <table class="w-full text-left border-collapse">
            <thead>
                <tr class="border-b border-gray-100 dark:border-slate-800/50">
                    @foreach($headers as $header)
                        <th class="px-6 py-5 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                            {{ $header }}
                        </th>
                    @endforeach
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-50 dark:divide-slate-800/30">
                @if($empty)
                    <tr>
                        <td colspan="{{ count($headers) }}" class="px-6 py-20 text-center">
                            <div class="flex flex-col items-center gap-4">
                                <div class="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-3xl mb-2 grayscale opacity-50">
                                    �
                                </div>
                                <p class="text-xs font-black text-slate-500 uppercase tracking-widest">{{ $emptyMessage }}</p>
                            </div>
                        </td>
                    </tr>
                @else
                    {{ $slot }}
                @endif
            </tbody>
        </table>
    </div>
</div>
