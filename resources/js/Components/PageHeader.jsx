export default function PageHeader({ title, description, children }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-white/40 dark:bg-slate-950/20 backdrop-blur-md py-4 px-6 rounded-4xl border border-gray-100/50 dark:border-slate-800/30 transition-all duration-500">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight sm:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="mt-1 text-sm font-medium text-gray-500 dark:text-slate-500 max-w-2xl">
                        {description}
                    </p>
                )}
            </div>
            {children && (
                <div className="flex items-center gap-3 flex-shrink-0 animate-in fade-in slide-in-from-right-4 duration-700">
                    {children}
                </div>
            )}
        </div>
    );
}
