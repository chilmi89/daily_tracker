import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import StatsCard from '@/Components/StatsCard';
import PageHeader from '@/Components/PageHeader';
import Button from '@/Components/Form/Button';
import {
    Users,
    Activity,
    CircleDollarSign,
    Ticket,
    Download,
    RefreshCw,
    TrendingUp,
    Zap,
    History,
    FileText,
    Settings,
    ArrowUpRight
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';

const chartData = [
    { name: 'Jan', revenue: 4000 },
    { name: 'Feb', revenue: 3000 },
    { name: 'Mar', revenue: 5000 },
    { name: 'Apr', revenue: 2780 },
    { name: 'May', revenue: 4890 },
    { name: 'Jun', revenue: 3390 },
    { name: 'Jul', revenue: 4490 },
];

const barData = [
    { name: 'S', value: 45 },
    { name: 'S', value: 52 },
    { name: 'R', value: 38 },
    { name: 'K', value: 65 },
    { name: 'J', value: 48 },
    { name: 'S', value: 35 },
    { name: 'M', value: 20 },
];

const recentActivity = [
    { id: 1, user: 'Budi Santoso', action: 'Membuat akun baru', time: '5m lalu', avatar: 'BS' },
    { id: 2, user: 'Siti Rahayu', action: 'Memperbarui profil', time: '23m lalu', avatar: 'SR' },
    { id: 3, user: 'Ahmad Dahlan', action: 'Mengupload dokumen', time: '1j lalu', avatar: 'AD' },
    { id: 4, user: 'Dewi Permata', action: 'Login ke sistem', time: '2j lalu', avatar: 'DP' },
];

const quickActions = [
    { label: 'Tambah User', icon: Users, href: '/users', color: 'indigo' },
    { label: 'Laporan', icon: FileText, href: '/dashboard', color: 'emerald' },
    { label: 'Setelan', icon: Settings, href: '/settings', color: 'amber' },
    { label: 'Export', icon: Download, href: '/dashboard', color: 'rose' },
];

export default function Dashboard({ stats = {} }) {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <PageHeader title="Overview" description="Ringkasan performa sistem Anda hari ini.">
                <Button size="sm" variant="secondary" className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md">
                    <Download size={14} className="mr-2" />
                    Download report
                </Button>
                <Button size="sm" className="shadow-lg shadow-indigo-500/30">
                    <RefreshCw size={14} className="mr-2" />
                    Update data
                </Button>
            </PageHeader>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
                <StatsCard title="Total Pengguna" value="1,280" icon={<Users size={20} />} color="indigo" trend={12} trendLabel="vs bulan lalu" />
                <StatsCard title="Aktif Hari Ini" value="342" icon={<Activity size={20} />} color="green" trend={8} trendLabel="dari kemarin" />
                <StatsCard title="Pendapatan" value="Rp 48M" icon={<CircleDollarSign size={20} />} color="amber" trend={-3} trendLabel="vs bulan lalu" />
                <StatsCard title="Permintaan" value="27" icon={<Ticket size={20} />} color="rose" trend={5} trendLabel="perlu direspon" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <TrendingUp size={18} className="text-indigo-600" />
                                <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Pendapatan Tahunan</h2>
                            </div>
                            <p className="text-sm font-medium text-gray-500 dark:text-slate-500">Nilai dalam Jutaan Rupiah</p>
                        </div>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)', backgroundColor: '#fff' }}
                                    itemStyle={{ color: '#6366f1', fontSize: '13px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-indigo-500/5">
                    <div className="flex items-center gap-2 mb-8">
                        <Zap size={18} className="text-indigo-600" />
                        <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Trend Aktivitas</h2>
                    </div>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} dy={10} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                                    {barData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index === 3 ? '#6366f1' : '#E2E8F0'} className="dark:fill-slate-800 transition-all duration-500 hover:fill-indigo-400" />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Recent Activity */}
                <div className="xl:col-span-2 bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm transition-all duration-500">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-2">
                            <History size={18} className="text-indigo-600" />
                            <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight">Aktivitas Terkini</h2>
                        </div>
                        <button className="text-xs font-bold text-indigo-600 hover:underline tracking-widest uppercase">Lihat Log</button>
                    </div>
                    <div className="space-y-6">
                        {recentActivity.map(item => (
                            <div key={item.id} className="flex items-center gap-4 py-3 group">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-600 text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                                    {item.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{item.user}</p>
                                    <p className="text-xs font-medium text-gray-500 dark:text-slate-500 truncate">{item.action}</p>
                                </div>
                                <span className="text-[10px] font-bold text-gray-400 dark:text-slate-600 uppercase tracking-wider">{item.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-4xl border border-gray-100 dark:border-slate-800/40 p-8 shadow-sm transition-all duration-500">
                    <h2 className="text-xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Navigasi Cepat</h2>
                    <div className="grid grid-cols-2 gap-4">
                        {quickActions.map(action => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={action.label}
                                    className="flex flex-col items-center gap-3 p-6 rounded-3xl bg-gray-50/50 dark:bg-[#020617]/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 transition-all duration-500 group border border-transparent hover:border-indigo-100 dark:hover:border-indigo-900/50"
                                    onClick={() => window.location.href = action.href}
                                >
                                    <Icon size={24} className="group-hover:scale-125 transition-transform duration-500 text-gray-600 dark:text-slate-400 group-hover:text-indigo-600" />
                                    <span className="text-[11px] font-extrabold text-gray-500 dark:text-slate-400 group-hover:text-indigo-600 uppercase tracking-wider text-center leading-tight">
                                        {action.label}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-10 pt-8 border-t border-gray-100 dark:border-slate-800/50 space-y-6">
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400">
                                <span>Resources</span>
                                <span className="text-gray-900 dark:text-white">72%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-slate-800/50 rounded-full h-1.5 p-0.5">
                                <div className="bg-indigo-600 h-0.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" style={{ width: '72%' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
