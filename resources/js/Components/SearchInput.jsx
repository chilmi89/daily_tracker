import { useRef } from 'react';
import { router } from '@inertiajs/react';

export default function SearchInput({ value, onChange, placeholder = 'Cari...', debounceUrl }) {
    const timerRef = useRef(null);

    const handleChange = (e) => {
        const val = e.target.value;
        if (onChange) onChange(val);

        // Auto search with debounce if route provided
        if (debounceUrl) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                router.get(debounceUrl, { search: val }, { preserveState: true, replace: true });
            }, 400);
        }
    };

    return (
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-700 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
        </div>
    );
}
