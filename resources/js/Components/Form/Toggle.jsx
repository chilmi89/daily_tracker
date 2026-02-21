export default function Toggle({ label, description, checked, onChange }) {
    return (
        <div className="flex items-center justify-between py-2">
            <div>
                {label && (
                    <p className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</p>
                )}
                {description && (
                    <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{description}</p>
                )}
            </div>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() => onChange(!checked)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 ${checked ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-slate-700'
                    }`}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${checked ? 'translate-x-6' : 'translate-x-1'
                        }`}
                />
            </button>
        </div>
    );
}
