export default function Select({ label, error, options = [], placeholder, className = '', ...props }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <select
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all
                    bg-white dark:bg-slate-800
                    text-gray-900 dark:text-slate-100
                    ${error
                        ? 'border-red-400 focus:ring-red-500'
                        : 'border-gray-200 dark:border-slate-700 focus:ring-indigo-500'
                    }
                    focus:outline-none focus:ring-2 focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}`}
                {...props}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
            </select>
            {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
        </div>
    );
}
