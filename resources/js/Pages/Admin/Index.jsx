import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import { useCan } from '@/Hooks/useCan';
import { CheckCircle, XCircle, Shield, Key, User, ChevronRight, Lock } from 'lucide-react';

// ─── Helper Badge ────────────────────────────────────────────────────────────
function StatusBadge({ allowed }) {
    return allowed ? (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <CheckCircle size={10} /> Diizinkan
        </span>
    ) : (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest bg-rose-500/10 text-rose-500 border border-rose-500/20">
            <XCircle size={10} /> Ditolak
        </span>
    );
}

// ─── Check Row ───────────────────────────────────────────────────────────────
function CheckRow({ label, value, description }) {
    return (
        <div className="flex items-center justify-between gap-4 py-4 border-b border-slate-100 dark:border-slate-800/40 last:border-0">
            <div className="min-w-0">
                <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-widest">{label}</p>
                {description && (
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 uppercase tracking-wider opacity-70">{description}</p>
                )}
            </div>
            <StatusBadge allowed={value} />
        </div>
    );
}

// ─── Section Card ────────────────────────────────────────────────────────────
function Section({ icon: Icon, title, color = 'indigo', children }) {
    const colors = {
        indigo: 'from-indigo-500/10 to-purple-500/10 border-indigo-500/10 text-indigo-600',
        emerald: 'from-emerald-500/10 to-teal-500/10 border-emerald-500/10 text-emerald-600',
        rose: 'from-rose-500/10 to-pink-500/10 border-rose-500/10 text-rose-600',
        amber: 'from-amber-500/10 to-orange-500/10 border-amber-500/10 text-amber-600',
    };

    return (
        <div className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-slate-800/40 overflow-hidden shadow-xl shadow-indigo-500/5 p-6">
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-2xl bg-linear-to-br flex items-center justify-center border shrink-0 ${colors[color]}`}>
                    <Icon size={16} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-700 dark:text-slate-200">{title}</h3>
            </div>
            <div>{children}</div>
        </div>
    );
}

// ─── Custom Permission Tester ─────────────────────────────────────────────────
function PermissionTester({ can }) {
    const [input, setInput] = useState('');
    const [tested, setTested] = useState(null);

    const test = () => {
        if (input.trim()) {
            setTested({ name: input.trim(), result: can(input.trim()) });
        }
    };

    return (
        <div>
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && test()}
                    placeholder="Ketik nama permission, e.g. edit users"
                    className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-bold text-slate-700 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/10 transition-all uppercase tracking-wider"
                />
                <button
                    onClick={test}
                    className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white text-[11px] font-black uppercase tracking-widest transition-all shrink-0"
                >
                    Test
                </button>
            </div>
            {tested && (
                <div className="flex items-center justify-between mt-3 px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest font-mono">{tested.name}</span>
                    <StatusBadge allowed={tested.result} />
                </div>
            )}
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
const Index = ({ authUser }) => {
    const { can, hasRole, hasAnyRole, roles, permissions } = useCan();

    return (
        <AuthenticatedLayout title="Admin Dashboard">
            <PageHeader
                title="Admin Dashboard"
                description={`Selamat datang, ${authUser?.name}. Panel pengujian RBAC aktif.`}
            />

            {/* RBAC Summary Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                    { label: 'Role Aktif', value: roles.join(', ') || '–', icon: Shield, color: 'text-indigo-500' },
                    { label: 'Total Roles', value: roles.length, icon: User, color: 'text-purple-500' },
                    { label: 'Total Permissions', value: permissions.length, icon: Key, color: 'text-emerald-500' },
                    { label: 'Guard', value: 'web', icon: Lock, color: 'text-amber-500' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-slate-100 dark:border-slate-800/40 p-5 shadow-xl shadow-indigo-500/5">
                        <div className="flex items-center gap-2 mb-2">
                            <stat.icon size={14} className={stat.color} />
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                        <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-tight">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Role Checks */}
                <Section icon={Shield} title="Role Checks" color="indigo">
                    <CheckRow
                        label="hasRole('admin')"
                        value={hasRole('admin')}
                        description="Apakah user memiliki role admin?"
                    />
                    <CheckRow
                        label="hasRole('superadmin')"
                        value={hasRole('superadmin')}
                        description="Apakah user memiliki role superadmin?"
                    />
                    <CheckRow
                        label="hasAnyRole(['admin', 'superadmin'])"
                        value={hasAnyRole(['admin', 'superadmin'])}
                        description="Apakah user memiliki salah satu dari role ini?"
                    />
                    <CheckRow
                        label="hasRole('member')"
                        value={hasRole('member')}
                        description="Apakah user memiliki role member?"
                    />
                </Section>

                {/* Permission Checks — sesuai permission yang ada di DB Spatie */}
                <Section icon={Key} title="Permission Checks" color="emerald">
                    {permissions.length === 0 ? (
                        <div className="py-8 text-center">
                            <p className="text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.3em]">
                                Tidak ada permission langsung yang diberikan
                            </p>
                            <p className="text-[9px] text-slate-400 mt-1 opacity-60">
                                Permission mungkin diberikan via Role
                            </p>
                        </div>
                    ) : (
                        permissions.map(perm => (
                            <CheckRow
                                key={perm}
                                label={`can('${perm}')`}
                                value={can(perm)}
                                description={`Permission: ${perm}`}
                            />
                        ))
                    )}
                </Section>

                {/* Manual Permission Tester */}
                <Section icon={ChevronRight} title="Uji Permission Manual" color="amber">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-4 opacity-70">
                        Ketik nama permission apapun untuk menguji apakah user ini memilikinya.
                    </p>
                    <PermissionTester can={can} />
                </Section>

                {/* Active Roles & Permissions List */}
                <Section icon={User} title="Daftar Role & Permission Aktif" color="rose">
                    <div className="mb-3">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Roles</p>
                        <div className="flex flex-wrap gap-2">
                            {roles.length > 0 ? roles.map(r => (
                                <span key={r} className="px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest bg-indigo-500/5 text-indigo-600 border border-indigo-500/10">
                                    {r}
                                </span>
                            )) : (
                                <span className="text-[10px] text-slate-400 italic">Tidak ada role</span>
                            )}
                        </div>
                    </div>
                    <div className="border-t border-slate-100 dark:border-slate-800 pt-3 mt-3">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Direct Permissions</p>
                        <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                            {permissions.length > 0 ? permissions.map(p => (
                                <span key={p} className="px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest bg-emerald-500/5 text-emerald-600 border border-emerald-500/10">
                                    {p}
                                </span>
                            )) : (
                                <span className="text-[10px] text-slate-400 italic">Tidak ada direct permission</span>
                            )}
                        </div>
                    </div>
                </Section>
            </div>
        </AuthenticatedLayout>
    );
};  

export default Index;