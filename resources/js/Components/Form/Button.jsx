import { forwardRef } from 'react';

const variantMap = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900 focus:ring-indigo-500',
    secondary: 'bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-300 focus:ring-gray-400',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm shadow-red-200 dark:shadow-red-900 focus:ring-red-500',
    ghost: 'bg-transparent hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 focus:ring-gray-400',
};

const sizeMap = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(function Button(
    { children, variant = 'primary', size = 'md', isLoading = false, className = '', disabled, ...props },
    ref
) {
    return (
        <button
            ref={ref}
            disabled={disabled || isLoading}
            className={`inline-flex items-center justify-center gap-2 font-medium rounded-xl border border-transparent
                transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900
                disabled:opacity-50 disabled:cursor-not-allowed
                ${variantMap[variant] ?? variantMap.primary}
                ${sizeMap[size] ?? sizeMap.md}
                ${className}`}
            {...props}
        >
            {isLoading && (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
            )}
            {children}
        </button>
    );
});

export default Button;
