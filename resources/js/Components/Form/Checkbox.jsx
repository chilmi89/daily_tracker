export default function Checkbox({ label, description, error, className = '', ...props }) {
    return (
        <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer group">
                <input
                    type="checkbox"
                    className={`mt-0.5 w-4 h-4 text-indigo-600 border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer ${className}`}
                    {...props}
                />
                <div>
                    {label && (
                        <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {label}
                        </span>
                    )}
                    {description && (
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{description}</p>
                    )}
                </div>
            </label>
            {error && <p className="text-xs text-red-500 dark:text-red-400 ml-7">{error}</p>}
        </div>
    );
}
