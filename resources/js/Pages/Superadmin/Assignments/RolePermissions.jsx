import React, { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import Toggle from '@/Components/UI/Toggle';
import { Key, Settings2, LayoutDashboard, Users, Shield, Activity, BarChart } from 'lucide-react';

/* ── Permission Groups ───────────────────────────────────────── */
const GROUPS = [
    {
        key:   'dashboard',
        label: 'Core System',
        icon:  LayoutDashboard,
        color: 'blue',
        match: p => p.startsWith('dashboard.') || p.startsWith('settings.'),
    },
    {
        key:   'rbac',
        label: 'RBAC Management',
        icon:  Shield,
        color: 'purple',
        match: p => p.startsWith('roles.') || p.startsWith('permissions.') || p.includes('assign'),
    },
    {
        key:   'users',
        label: 'User Management',
        icon:  Users,
        color: 'indigo',
        match: p => p.startsWith('users.') && !p.includes('assign'),
    },
    {
        key:   'activity',
        label: 'Daily Tracker – Aktivitas',
        icon:  Activity,
        color: 'emerald',
        match: p => p.startsWith('activity.'),
    },
    {
        key:   'monitor',
        label: 'Monitoring & Laporan',
        icon:  BarChart,
        color: 'amber',
        match: p => p.startsWith('monitoring.') || p.startsWith('report.'),
    },
];

function groupPermissions(permissions) {
    const grouped = [];
    const used    = new Set();

    for (const g of GROUPS) {
        const items = permissions.filter(p => g.match(p.name) && !used.has(p.id));
        items.forEach(p => used.add(p.id));
        grouped.push({ ...g, items });
    }

    // Sisa yang tidak masuk group manapun
    const rest = permissions.filter(p => !used.has(p.id));
    if (rest.length) grouped.push({ key: 'other', label: 'Lainnya', icon: Key, color: 'slate', items: rest });

    return grouped;
}

export default function RolePermissions({ roles, permissions }) {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen,  setIsModalOpen]  = useState(false);
    const [searchTerm,   setSearchTerm]   = useState('');

    const { data, setData, put, processing, reset } = useForm({ permissions: [] });

    const openModal = (role) => {
        setSelectedRole(role);
        setData('permissions', role.permissions.map(p => p.name));
        setIsModalOpen(true);
    };

    const togglePermission = (permName) => {
        const current = [...data.permissions];
        const index   = current.indexOf(permName);
        if (index > -1) current.splice(index, 1);
        else current.push(permName);
        setData('permissions', current);
    };

    const toggleGroup = (items) => {
        const names   = items.map(p => p.name);
        const allOn   = names.every(n => data.permissions.includes(n));
        const current = [...data.permissions];
        if (allOn) {
            setData('permissions', current.filter(p => !names.includes(p)));
        } else {
            const toAdd = names.filter(n => !current.includes(n));
            setData('permissions', [...current, ...toAdd]);
        }
    };

    const selectAll  = () => setData('permissions', permissions.map(p => p.name));
    const clearAll   = () => setData('permissions', []);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('superadmin.assignments.roles.update', selectedRole.id), {
            onSuccess: () => { setIsModalOpen(false); reset(); },
        });
    };

    const grouped = useMemo(() => groupPermissions(permissions), [permissions]);

    const filteredGrouped = useMemo(() => {
        if (!searchTerm) return grouped;
        return grouped
            .map(g => ({ ...g, items: g.items.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) }))
            .filter(g => g.items.length > 0);
    }, [grouped, searchTerm]);

    return (
        <AuthenticatedLayout title="Role Permissions">
            <PageHeader
                title="Penetapan Hak Akses"
                description="Konfigurasikan set izin untuk setiap peran dalam sistem."
            />

            <DataTable
                headers={['#', 'Nama Role', 'Total Izin', { label: 'Aksi', align: 'center' }]}
                empty={roles.length === 0}
            >
                {roles.map((role, i) => (
                    <tr key={role.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                            {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-8 py-5">
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-9 h-9 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 border border-purple-500/10 group-hover:rotate-12 transition-transform">
                                    <Key size={14} />
                                </div>
                                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{role.name}</span>
                            </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                            <span className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-500/5 text-emerald-600 border border-emerald-500/10">
                                {role.permissions.length} / {permissions.length} Permissions
                            </span>
                        </td>
                        <td className="px-8 py-5 text-center">
                            <div className="flex justify-center">
                                <Button variant="flat" size="sm" onClick={() => openModal(role)} className="rounded-2xl border-purple-500/10 hover:border-purple-500/40">
                                    <Settings2 className="mr-2" size={14} />
                                    Atur Izin
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            <Modal
                show={isModalOpen}
                title={`Konfigurasi Izin: ${selectedRole?.name?.toUpperCase()}`}
                maxWidth="2xl"
                onClose={() => setIsModalOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button disabled={processing} onClick={handleSubmit}>Simpan Konfigurasi</Button>
                    </div>
                }
            >
                <div className="space-y-5">
                    {/* Search + Bulk Actions */}
                    <div className="flex gap-3 items-center">
                        <input
                            type="text" placeholder="Cari izin..."
                            className="flex-1 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-4 py-2.5 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={selectAll} className="text-[10px] font-black text-indigo-600 hover:text-indigo-800 uppercase tracking-widest whitespace-nowrap transition-colors">
                            Pilih Semua
                        </button>
                        <button onClick={clearAll} className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest whitespace-nowrap transition-colors">
                            Hapus Semua
                        </button>
                    </div>

                    {/* Summary */}
                    <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dipilih</span>
                        <span className="text-sm font-black text-indigo-600">
                            {data.permissions.length} / {permissions.length}
                        </span>
                    </div>

                    {/* Grouped Permissions */}
                    <div className="max-h-[480px] overflow-y-auto space-y-5 pr-1 custom-scrollbar">
                        {filteredGrouped.map((group) => {
                            const Icon    = group.icon;
                            const allOn   = group.items.every(p => data.permissions.includes(p.name));
                            const someOn  = group.items.some(p => data.permissions.includes(p.name));

                            return (
                                <div key={group.key}>
                                    {/* Group Header */}
                                    <button
                                        type="button"
                                        onClick={() => toggleGroup(group.items)}
                                        className="w-full flex items-center gap-3 mb-3 group"
                                    >
                                        <div className={`w-7 h-7 rounded-xl bg-${group.color}-500/10 flex items-center justify-center text-${group.color}-600 border border-${group.color}-500/10 transition-transform group-hover:scale-110`}>
                                            <Icon size={13} strokeWidth={2.5} />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                                            {group.label}
                                        </span>
                                        <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800 ml-1" />
                                        <span className={`text-[9px] font-black uppercase tracking-widest ${allOn ? 'text-indigo-600' : someOn ? 'text-amber-500' : 'text-slate-300'}`}>
                                            {allOn ? 'Semua Aktif' : someOn ? 'Sebagian' : 'Tidak Ada'}
                                        </span>
                                    </button>

                                    {/* Toggles */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        {group.items.map((perm) => (
                                            <Toggle
                                                key={perm.id}
                                                label={perm.name}
                                                description={group.label}
                                                enabled={data.permissions.includes(perm.name)}
                                                onChange={() => togglePermission(perm.name)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
