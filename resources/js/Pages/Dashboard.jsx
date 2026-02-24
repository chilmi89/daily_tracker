import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { 
    Users, 
    Zap, 
    DollarSign, 
    MessageSquare, 
    TrendingUp, 
    ArrowUpRight, 
    ArrowDownRight,
    Search,
    Rocket,
    Shield
} from 'lucide-react';

export default function Dashboard() {
    const stats = [
        { label: 'Total Pengguna', val: '1,280', icon: Users, color: 'indigo', trend: '+12.5%' },
        { label: 'Sesi Aktif', val: '342', icon: Zap, color: 'emerald', trend: '+8.2%' },
        { label: 'Pendapatan Bersih', val: 'Rp 48M', icon: DollarSign, color: 'amber', trend: '-3.1%' },
        { label: 'Support Tickets', val: '27', icon: MessageSquare, color: 'rose', trend: '5 baru' }
    ];

    const activities = [
        { u: 'Budi Santoso', a: 'Quantum sync completed', t: '2m ago', v: 'BS', c: 'indigo' },
        { u: 'Siti Rahayu', a: 'Security protocol updated', t: '15m ago', v: 'SR', c: 'emerald' },
        { u: 'Ahmad Dahlan', a: 'Database migration active', t: '40m ago', v: 'AD', c: 'amber' },
        { u: 'Super Admin', a: 'System firewall reboot', t: '1h ago', v: 'SA', c: 'purple' }
    ];

    return (
        <AuthenticatedLayout title="Dashboard">
            <PageHeader 
                title="Intelligence Dashboard" 
                description="Monitor system performance and user engagement in real-time."
            />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mb-10">
                {stats.map((stat, i) => (
                    <Card key={i} padding="p-6" className={`hover:border-${stat.color}-400/30`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-600 shadow-inner group-hover/card:rotate-6 transition-transform`}>
                                <stat.icon size={18} strokeWidth={2.5} />
                            </div>
                            <span className={`text-[10px] font-black ${stat.trend.includes('-') ? 'text-rose-500 bg-rose-500/10' : 'text-emerald-500 bg-emerald-500/10'} px-2 py-1 rounded-lg uppercase tracking-tight`}>
                                {stat.trend}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                        <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.val}</p>
                    </Card>
                ))}
            </div>

            {/* Charts & Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 mb-10">
                <Card 
                    title="Revenue Streams" 
                    description="Monthly financial performance" 
                    className="lg:col-span-2"
                    header={
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-widest border border-indigo-100 dark:border-indigo-500/20">Today</button>
                            <button className="px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-widest transition-colors">Week</button>
                        </div>
                    }
                >
                    <div className="h-[300px] w-full bg-slate-50 dark:bg-slate-900/40 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group/graph">
                        <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/5 via-transparent to-purple-500/5 opacity-0 group-hover/graph:opacity-100 transition-opacity duration-1000"></div>
                        <div className="text-center group cursor-pointer relative z-10">
                            <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500 drop-shadow-xl text-slate-400 dark:text-slate-600 flex justify-center">
                                <TrendingUp size={48} />
                            </div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Processing Visual Data...</p>
                        </div>
                    </div>
                </Card>

                <Card title="Network Activity" description="Daily user interactions">
                    <div className="h-[300px] w-full flex items-end justify-between gap-2 px-4 pt-4">
                        {[40, 65, 45, 90, 55, 75, 30].map((h, i) => (
                            <div 
                                key={i}
                                className="flex-1 bg-indigo-500/10 dark:bg-indigo-500/10 rounded-t-2xl hover:bg-indigo-600 dark:hover:bg-indigo-500 hover:h-[95%] transition-all duration-700 relative group cursor-help shadow-inner" 
                                style={{ height: `${h}%` }}
                            >
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-2 py-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-50 group-hover:scale-100 shadow-xl border border-slate-800">{h}%</div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6 px-4">
                        {['S','S','R','K','J','S','M'].map((d, i) => (
                            <span key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
                <Card 
                    title="System Logs" 
                    description="Real-time events and security audits"
                    footer={
                        <Button variant="outline" className="w-full">
                            View Comprehensive Audit Trail
                        </Button>
                    }
                >
                    <div className="space-y-6">
                        {activities.map((act, i) => (
                            <div key={i} className="flex items-center gap-5 group cursor-default">
                                <div className={`w-12 h-12 rounded-2xl bg-${act.c}-500/10 flex items-center justify-center text-${act.c}-600 text-xs font-black group-hover:scale-110 transition-transform duration-500 shadow-sm border border-${act.c}-500/5`}>
                                    {act.v}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{act.u}</p>
                                    <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-tighter opacity-80">{act.a}</p>
                                </div>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest whitespace-nowrap bg-slate-50 dark:bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800">{act.t}</span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card title="Command Center" description="Execute critical system operations" variant="gradient">
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                            <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 text-white flex justify-center"><Rocket /></div>
                            <span className="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Deploy Update</span>
                        </button>

                        <button className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                            <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 text-white flex justify-center"><Users /></div>
                            <span className="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Manage Access</span>
                        </button>

                        <button className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                            <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 text-white flex justify-center"><Settings /></div>
                            <span className="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">System Config</span>
                        </button>

                        <button className="p-6 rounded-3xl bg-white/10 hover:bg-white/20 border border-white/10 hover:border-white/20 transition-all duration-500 group text-center active:scale-95">
                            <div className="text-2xl mb-3 group-hover:scale-125 transition-transform duration-500 text-white flex justify-center"><Shield /></div>
                            <span className="text-[10px] font-black text-indigo-50 uppercase tracking-[0.2em]">Audit Shield</span>
                        </button>
                    </div>
                    
                    <div className="mt-8 p-6 rounded-2xl bg-black/20 border border-white/5">
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-[10px] font-black text-indigo-200 uppercase tracking-widest">Server Health</p>
                            <span className="text-[10px] font-black text-emerald-300">99.9%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <div className="w-[99%] h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                        </div>
                    </div>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
