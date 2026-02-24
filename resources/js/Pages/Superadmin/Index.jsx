import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import Card from '@/Components/UI/Card';
import Button from '@/Components/UI/Button';
import { 
    Users, 
    Shield, 
    Key, 
    Activity, 
    Server, 
    Lock,
    ArrowUpRight,
    Search,
    Globe,
    TrendingUp,
    Zap
} from 'lucide-react';
import { Link } from '@inertiajs/react';
import { 
    AreaChart, 
    Area, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie,
    Legend
} from 'recharts';

export default function Index({ stats, growthData, performanceData, roleDistribution }) {
    const mainStats = [
        { label: 'Total Users', val: stats.total_users.toLocaleString(), icon: Users, color: 'indigo' },
        { label: 'System Roles', val: stats.total_roles.toLocaleString(), icon: Shield, color: 'purple' },
        { label: 'Active Permissions', val: stats.total_permissions.toLocaleString(), icon: Key, color: 'emerald' },
        { label: 'Server Load', val: stats.server_load, icon: Activity, color: 'amber' }
    ];

    const COLORS = ['#4f46e5', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];

    // Custom Candle Shape for the BarChart
    const CandleBar = (props) => {
        const { x, y, width, height, payload } = props;
        const { low, high, open, close } = payload;
        const isUp = close >= open;
        const color = isUp ? '#10b981' : '#ef4444'; // Emerald for up, Rose for down
        
        // Scale calculation based on YAxis range (0-100 or max)
        // Since we are inside a Bar, height and y are relative to the 'high' value.
        // For a true candle, it's better to use a custom SVG group that knows the scale.
        // However, we can approximate it or use a simpler visual for "volatility".
        
        const candleWidth = Math.min(width * 0.5, 14);
        const candleX = x + (width - candleWidth) / 2;
        const whiskerX = x + width / 2;

        // Simplified candle for dashboard aesthetic:
        // Bar already draws the 'high' range. We'll overlay the body.
        return (
            <g>
                {/* Vertical Line (Whisker) */}
                <line 
                    x1={whiskerX} 
                    y1={y} 
                    x2={whiskerX} 
                    y2={y + height} 
                    stroke={color} 
                    strokeWidth={1.5} 
                    strokeDasharray="2 2"
                />
                {/* Candle Body (Simulated middle part) */}
                <rect 
                    x={candleX} 
                    y={y + height * 0.2} 
                    width={candleWidth} 
                    height={height * 0.6} 
                    fill={color} 
                    rx={4}
                    className="shadow-sm"
                />
            </g>
        );
    };

    return (
        <AuthenticatedLayout title="Superadmin Panel">
            <PageHeader 
                title="Superadmin Command" 
                description="High-level system administration and security oversight."
            />

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {mainStats.map((stat, i) => (
                    <Card key={i} padding="p-6">
                        <div className="flex items-center gap-5">
                            <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center text-${stat.color}-600 shadow-inner group-hover/card:scale-110 transition-transform`}>
                                <stat.icon size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-1">{stat.val}</p>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Advanced Charts Section - Structured Layout */}
            <div className="space-y-8 mb-12">
                {/* Full Width Row */}
                <Card title="User Growth Trends" description="Total registered users over time">
                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                                    dy={10}
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                                />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="users" 
                                    stroke="#4f46e5" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorUsers)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                {/* 2 Column Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card title="System Volatility" description="Activity ranges and server spikes">
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={performanceData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis 
                                        dataKey="name" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                                        dy={10}
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 10, fontWeight: 700, fill: '#94a3b8'}}
                                    />
                                    <Tooltip 
                                        cursor={{fill: '#f8fafc'}}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                                    />
                                    <Bar 
                                        dataKey="high" 
                                        shape={<CandleBar />}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card title="Role Distribution" description="User allocation matrix">
                        <div className="h-[250px] w-full mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={roleDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {roleDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', fontSize: '10px' }}
                                    />
                                    <Legend 
                                        verticalAlign="bottom" 
                                        height={36} 
                                        iconType="circle"
                                        formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{value}</span>}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Configuration Shortcuts */}
                <Card title="Management Tools" description="Direct access to system core" className="lg:col-span-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="grid grid-cols-3 gap-3">
                                <Link href={route('superadmin.users.index')} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all group flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 mb-2 group-hover:rotate-12 transition-transform">
                                        <Users size={20} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate w-full">Users</span>
                                </Link>

                                <Link href={route('superadmin.roles.index')} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-purple-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all group flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-2 group-hover:rotate-12 transition-transform">
                                        <Shield size={20} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate w-full">Roles</span>
                                </Link>

                                <Link href={route('superadmin.permissions.index')} className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/30 hover:bg-white dark:hover:bg-slate-800 transition-all group flex flex-col items-center text-center">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-2 group-hover:rotate-12 transition-transform">
                                        <Key size={20} />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-900 dark:text-white truncate w-full">Access</span>
                                </Link>
                            </div>

                            <div className="p-6 rounded-[2rem] bg-indigo-600 text-white relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-150 transition-transform duration-700">
                                    <TrendingUp size={120} />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80">Strategic Insight</p>
                                    <p className="text-lg font-bold leading-tight mb-4">You have {stats.total_users} active users connected to the system core.</p>
                                    <Button variant="flat" className="bg-white/10 hover:bg-white/20 border-white/10 text-white text-[10px]">
                                        View Analytics
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 mb-2">Direct Actions</p>
                            <div className="grid grid-cols-1 gap-3">
                                <Link href={route('superadmin.assignments.users.index')} className="flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                                        <Shield size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1 italic">Role Mapping</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter opacity-80">Assign roles to users</p>
                                    </div>
                                </Link>

                                <Link href={route('superadmin.assignments.roles.index')} className="flex items-center gap-4 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-purple-500/30 transition-all group">
                                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:rotate-6 transition-transform">
                                        <Key size={24} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight leading-none mb-1 italic">Permission Sync</p>
                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter opacity-80">Sync matrix permissions</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* System Health */}
                <Card title="Infrastructure" description="Live cluster status">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-400 flex items-center gap-2"><Server size={12} /> Database</span>
                                <span className="text-emerald-500 italic">Connected</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[88%] bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-400 flex items-center gap-2"><Lock size={12} /> Security SSL</span>
                                <span className="text-emerald-500 italic">Verified</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                <span className="text-slate-400 flex items-center gap-2"><Activity size={12} /> API Latency</span>
                                <span className="text-blue-500 italic">12ms</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div className="h-full w-[45%] bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.4)]"></div>
                            </div>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full mt-10">
                        <Zap className="mr-2" size={14} />
                        Launch Nexus Monitor
                    </Button>
                </Card>
            </div>
        </AuthenticatedLayout>
    );
}
