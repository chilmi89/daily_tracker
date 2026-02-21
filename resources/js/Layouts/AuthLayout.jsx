export default function AuthLayout({ children, title, subtitle }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950 p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-200 dark:shadow-indigo-900 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    {title && (
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    )}
                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{subtitle}</p>
                    )}
                </div>

                {/* Card */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-slate-950/50 border border-gray-100 dark:border-slate-800 p-8">
                    {children}
                </div>

                <p className="text-center text-xs text-gray-400 dark:text-slate-600 mt-6">
                    © {new Date().getFullYear()} Dashboard. All rights reserved.
                </p>
            </div>
        </div>
    );
}
