export default function Input({ label, error, helper, className = '', ...props }) {
    return (
        <div className="space-y-1.5">
            {label && (
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
                    {label}
                    {props.required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                className={`w-full px-4 py-2.5 text-sm rounded-xl border transition-all
                    bg-white dark:bg-slate-800
                    text-gray-900 dark:text-slate-100
                    placeholder-gray-400 dark:placeholder-slate-500
                    ${error
                        ? 'border-red-400 dark:border-red-600 focus:ring-red-500'
                        : 'border-gray-200 dark:border-slate-700 focus:ring-indigo-500'
                    }
                    focus:outline-none focus:ring-2 focus:border-transparent
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}
            {helper && !error && <p className="text-xs text-gray-400 dark:text-slate-500">{helper}</p>}
        </div>
    );
}
