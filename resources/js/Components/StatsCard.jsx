export default function StatsCard({ title, value, icon, color = 'indigo', trend, trendLabel }) {
    const colorMap = {
        indigo: 'bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 border-indigo-100/50 dark:border-indigo-800/30',
        green: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border-emerald-100/50 dark:border-emerald-800/30',
        amber: 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 border-amber-100/50 dark:border-amber-800/30',
        rose: 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 border-rose-100/50 dark:border-rose-800/30',
    };

    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl p-6 border border-gray-100 dark:border-slate-800/40 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 dark:hover:shadow-indigo-500/10 transition-all duration-500 group">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-bold text-gray-500 dark:text-slate-500 tracking-wide uppercase">{title}</p>
                    <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-1 group-hover:scale-105 transition-transform duration-500 origin-left">
                        {value}
                    </h3>

                    {trend !== undefined && (
                        <div className="flex items-center gap-1.5 mt-3">
                            <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${trend >= 0 ? 'bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-600' : 'bg-rose-100/80 dark:bg-rose-950/50 text-rose-600'}`}>
                                {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
                            </span>
                            <span className="text-xs font-medium text-gray-400 dark:text-slate-500">{trendLabel}</span>
                        </div>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border ${colorMap[color]} shadow-sm transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}
