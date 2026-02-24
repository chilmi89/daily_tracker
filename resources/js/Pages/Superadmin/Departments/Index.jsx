import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { Building2, Plus, Edit3, Trash2, CheckCircle2, CircleDashed, Layers, XCircle, Users } from 'lucide-react';

/* ─── Shared Styles ──────────────────────────────── */
const inp = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all";
const lbl = "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block";
const err = "mt-1 text-[10px] text-rose-500 font-bold";

/* Tailwind color map — static class only */
const STAT_COLORS = {
    indigo:  { bg: 'bg-indigo-500/10',                     text: 'text-indigo-500'  },
    emerald: { bg: 'bg-emerald-500/10',                    text: 'text-emerald-500' },
    slate:   { bg: 'bg-slate-200/60 dark:bg-slate-800/60', text: 'text-slate-400'   },
    purple:  { bg: 'bg-purple-500/10',                     text: 'text-purple-500'  },
    amber:   { bg: 'bg-amber-500/10',                      text: 'text-amber-500'   },
    rose:    { bg: 'bg-rose-500/10',                       text: 'text-rose-500'    },
};

/* ─── Status Badge ───────────────────────────────── */
function ActiveBadge({ active }) {
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
            active
                ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
        }`}>
            {active ? <CheckCircle2 size={10} strokeWidth={2.5} /> : <CircleDashed size={10} strokeWidth={2} />}
            {active ? 'Aktif' : 'Non-aktif'}
        </span>
    );
}

/* ─── Form ───────────────────────────────────────── */
function DeptForm({ data, setData, errors }) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nama */}
                <div className="col-span-full sm:col-span-1">
                    <label className={lbl}>Nama Departemen</label>
                    <input type="text" value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className={inp} placeholder="Cth: Engineering" />
                    {errors.name && <p className={err}>{errors.name}</p>}
                </div>

                {/* Kode */}
                <div>
                    <label className={lbl}>Kode Dept.</label>
                    <input type="text" value={data.code}
                        onChange={e => setData('code', e.target.value.toUpperCase())}
                        className={inp} placeholder="Cth: ENG" maxLength={20} />
                    {errors.code && <p className={err}>{errors.code}</p>}
                </div>
            </div>

            {/* Deskripsi */}
            <div>
                <label className={lbl}>Deskripsi (opsional)</label>
                <textarea value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    className={inp + ' resize-none'} rows={3}
                    placeholder="Deskripsi singkat tentang departemen ini..." />
                {errors.description && <p className={err}>{errors.description}</p>}
            </div>

            {/* Status */}
            <div>
                <label className={lbl}>Status</label>
                <select value={data.is_active ? '1' : '0'}
                    onChange={e => setData('is_active', e.target.value === '1')}
                    className={inp + ' appearance-none'}>
                    <option value="1">Aktif</option>
                    <option value="0">Non-aktif</option>
                </select>
                {errors.is_active && <p className={err}>{errors.is_active}</p>}
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────── */
const emptyForm = { name: '', code: '', description: '', is_active: true };

export default function Index({ departments }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen,   setIsEditOpen]   = useState(false);
    const [editing,      setEditing]      = useState(null);

    const {
        data: createData, setData: setCreateData,
        post: postCreate, processing: createProc,
        errors: createErrors, reset: resetCreate,
    } = useForm(emptyForm);

    const {
        data: editData, setData: setEditData,
        put: putEdit, processing: editProc,
        errors: editErrors, reset: resetEdit,
    } = useForm(emptyForm);

    const openEdit = (dept) => {
        setEditing(dept);
        setEditData({
            name:        dept.name,
            code:        dept.code        ?? '',
            description: dept.description ?? '',
            is_active:   dept.is_active   ?? true,
        });
        setIsEditOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        postCreate(route('superadmin.departments.store'), {
            onSuccess: () => { setIsCreateOpen(false); resetCreate(); },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        putEdit(route('superadmin.departments.update', editing.id), {
            onSuccess: () => { setIsEditOpen(false); resetEdit(); },
        });
    };

    const handleDelete = (dept) => {
        if (dept.users_count > 0) {
            alert(`Departemen "${dept.name}" masih memiliki ${dept.users_count} pengguna. Pindahkan pengguna terlebih dahulu sebelum menghapus.`);
            return;
        }
        if (confirm(`Hapus departemen "${dept.name}"?`)) {
            router.delete(route('superadmin.departments.destroy', dept.id));
        }
    };

    const stats = [
        { label: 'Total Departemen', value: departments.length,                                   color: 'indigo',  icon: Layers        },
        { label: 'Aktif',            value: departments.filter(d => d.is_active).length,          color: 'emerald', icon: CheckCircle2   },
        { label: 'Non-aktif',        value: departments.filter(d => !d.is_active).length,         color: 'slate',   icon: XCircle        },
        { label: 'Total Karyawan',   value: departments.reduce((s, d) => s + d.users_count, 0),  color: 'purple',  icon: Users          },
    ];

    return (
        <AuthenticatedLayout title="Manajemen Departemen">
            <PageHeader
                title="Manajemen Departemen"
                description="Kelola struktur departemen organisasi dalam sistem."
            >
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="mr-2" size={16} strokeWidth={2.5} />
                    Tambah Departemen
                </Button>
            </PageHeader>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {stats.map((stat, i) => {
                    const c = STAT_COLORS[stat.color] ?? STAT_COLORS.slate;
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-slate-800/40 px-5 py-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-11 h-11 rounded-2xl ${c.bg} flex items-center justify-center shrink-0 ${c.text}`}>
                                <Icon size={20} strokeWidth={2} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter leading-none">{stat.value}</p>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.18em] mt-0.5 truncate">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Table */}
            <DataTable
                headers={['#', 'Nama Departemen', 'Kode', 'Total Karyawan', 'Status', 'Aksi']}
                empty={departments.length === 0}
                emptyMessage="Belum ada departemen. Tambahkan departemen pertama!"
            >
                {departments.map((dept, i) => (
                    <tr key={dept.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">

                        {/* No */}
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                        </td>

                        {/* Nama */}
                        <td className="px-6 py-3.5">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-2xl bg-indigo-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:rotate-6 transition-transform shrink-0">
                                    <Building2 size={14} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-gray-900 dark:text-white tracking-tight">{dept.name}</p>
                                    {dept.description && (
                                        <p className="text-[10px] font-medium text-slate-400 truncate max-w-xs">{dept.description}</p>
                                    )}
                                </div>
                            </div>
                        </td>

                        {/* Kode */}
                        <td className="px-6 py-3.5">
                            {dept.code ? (
                                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                                    {dept.code}
                                </span>
                            ) : (
                                <span className="text-[10px] italic text-slate-300 dark:text-slate-700">—</span>
                            )}
                        </td>

                        {/* Total Karyawan */}
                        <td className="px-6 py-3.5">
                            <span className="px-3 py-1.5 rounded-xl text-[9px] font-black tracking-widest border border-purple-500/20 bg-purple-500/5 text-purple-600 dark:text-purple-400">
                                {dept.users_count} pengguna
                            </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-3.5">
                            <ActiveBadge active={dept.is_active} />
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                <button onClick={() => openEdit(dept)}
                                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                                    <Edit3 size={14} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => handleDelete(dept)}
                                    className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            {/* Create Modal */}
            <Modal
                show={isCreateOpen}
                title="Tambah Departemen Baru"
                maxWidth="lg"
                onClose={() => setIsCreateOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsCreateOpen(false)}>Batal</Button>
                        <Button disabled={createProc} onClick={handleCreate}>Simpan</Button>
                    </div>
                }
            >
                <form onSubmit={handleCreate}>
                    <DeptForm data={createData} setData={setCreateData} errors={createErrors} />
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal
                show={isEditOpen}
                title={`Edit: ${editing?.name ?? '...'}`}
                maxWidth="lg"
                onClose={() => setIsEditOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsEditOpen(false)}>Batal</Button>
                        <Button disabled={editProc} onClick={handleEdit}>Update</Button>
                    </div>
                }
            >
                <form onSubmit={handleEdit}>
                    <DeptForm data={editData} setData={setEditData} errors={editErrors} />
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
