import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import {
    ClipboardList, Plus, Edit3, Trash2,
    CheckCircle2, Clock, CircleDashed,
    AlertCircle, Users2, TrendingUp,
} from 'lucide-react';

/* ─── Shared Styles ──────────────────────────────── */
const inp  = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all";
const lbl  = "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block";
const err  = "mt-1 text-[10px] text-rose-500 font-bold";

/* ─── Color maps ─────────────────────────────────── */
const STAT_COLORS = {
    indigo:  { bg: 'bg-indigo-500/10',  text: 'text-indigo-500'  },
    emerald: { bg: 'bg-emerald-500/10', text: 'text-emerald-500' },
    amber:   { bg: 'bg-amber-500/10',   text: 'text-amber-500'   },
    purple:  { bg: 'bg-purple-500/10',  text: 'text-purple-500'  },
    slate:   { bg: 'bg-slate-200/60 dark:bg-slate-800/60', text: 'text-slate-400' },
};

const PRIORITY_STYLES = {
    low:    { label: 'Rendah',  cls: 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700' },
    medium: { label: 'Sedang',  cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20' },
    high:   { label: 'Tinggi',  cls: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20' },
};

const STATUS_STYLES = {
    pending:     { label: 'Pending',     cls: 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700',         icon: CircleDashed   },
    in_progress: { label: 'Dikerjakan', cls: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',                       icon: Clock          },
    completed:   { label: 'Selesai',    cls: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',                icon: CheckCircle2   },
};

/* ─── Badges ─────────────────────────────────────── */
function PriorityBadge({ priority }) {
    const p = PRIORITY_STYLES[priority] ?? PRIORITY_STYLES.medium;
    return (
        <span className={`inline-flex items-center px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${p.cls}`}>
            {p.label}
        </span>
    );
}

function StatusBadge({ status }) {
    const s = STATUS_STYLES[status] ?? STATUS_STYLES.pending;
    const Icon = s.icon;
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${s.cls}`}>
            <Icon size={10} strokeWidth={2.5} />
            {s.label}
        </span>
    );
}

/* ─── Empty Form ─────────────────────────────────── */
const emptyForm = {
    title: '', description: '', assigned_to: '',
    priority: 'medium', status: 'pending', due_date: '',
};

/* ─── Task Form Component ────────────────────────── */
function TaskForm({ data, setData, errors, users }) {
    return (
        <div className="space-y-4">
            {/* Title */}
            <div>
                <label className={lbl}>Judul Task</label>
                <input type="text" value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className={inp} placeholder="Masukkan judul task..." />
                {errors.title && <p className={err}>{errors.title}</p>}
            </div>

            {/* Description */}
            <div>
                <label className={lbl}>Deskripsi <span className="ml-1 text-slate-400 normal-case font-normal">(opsional)</span></label>
                <textarea value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={3}
                    className={`${inp} resize-none`}
                    placeholder="Deskripsi detail task..." />
                {errors.description && <p className={err}>{errors.description}</p>}
            </div>

            {/* Assigned To */}
            <div>
                <label className={lbl}>Ditugaskan Ke</label>
                <select value={data.assigned_to}
                    onChange={e => setData('assigned_to', e.target.value)}
                    className={inp}>
                    <option value="">— Pilih karyawan —</option>
                    {users.map(u => (
                        <option key={u.id} value={u.id}>
                            {u.name}{u.employee_code ? ` (${u.employee_code})` : ''}
                        </option>
                    ))}
                </select>
                {errors.assigned_to && <p className={err}>{errors.assigned_to}</p>}
            </div>

            {/* Priority + Status */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className={lbl}>Prioritas</label>
                    <select value={data.priority}
                        onChange={e => setData('priority', e.target.value)}
                        className={inp}>
                        <option value="low">Rendah</option>
                        <option value="medium">Sedang</option>
                        <option value="high">Tinggi</option>
                    </select>
                    {errors.priority && <p className={err}>{errors.priority}</p>}
                </div>
                <div>
                    <label className={lbl}>Status</label>
                    <select value={data.status}
                        onChange={e => setData('status', e.target.value)}
                        className={inp}>
                        <option value="pending">Pending</option>
                        <option value="in_progress">Dikerjakan</option>
                        <option value="completed">Selesai</option>
                    </select>
                    {errors.status && <p className={err}>{errors.status}</p>}
                </div>
            </div>

            {/* Due Date */}
            <div>
                <label className={lbl}>Tenggat Waktu <span className="ml-1 text-slate-400 normal-case font-normal">(opsional)</span></label>
                <input type="date" value={data.due_date}
                    onChange={e => setData('due_date', e.target.value)}
                    className={inp} />
                {errors.due_date && <p className={err}>{errors.due_date}</p>}
            </div>
        </div>
    );
}

/* ─── Main Page ──────────────────────────────────── */
export default function Index({ tasks, users }) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen,   setIsEditOpen]   = useState(false);
    const [editTarget,   setEditTarget]   = useState(null);

    /* Create form */
    const { data: createData, setData: setCreateData, post: createPost,
            processing: createProcessing, errors: createErrors, reset: createReset } = useForm(emptyForm);

    /* Edit form */
    const { data: editData, setData: setEditData, put: editPut,
            processing: editProcessing, errors: editErrors, reset: editReset } = useForm(emptyForm);

    /* ── Handlers ── */
    const handleCreate = () => {
        createPost(route('superadmin.tasks.store'), {
            onSuccess: () => { setIsCreateOpen(false); createReset(); },
        });
    };

    const openEdit = (task) => {
        setEditTarget(task);
        setEditData({
            title:       task.title,
            description: task.description ?? '',
            assigned_to: String(task.assigned_to),
            priority:    task.priority,
            status:      task.status,
            due_date:    task.due_date ? task.due_date.substring(0, 10) : '',
        });
        setIsEditOpen(true);
    };

    const handleEdit = () => {
        editPut(route('superadmin.tasks.update', editTarget.id), {
            onSuccess: () => {
                setIsEditOpen(false);
                editReset(); // ✅ FIX: reset form agar data lama tidak tersisa
            },
        });
    };

    const handleDelete = (task) => {
        if (confirm(`Hapus task "${task.title}"?`)) {
            router.delete(route('superadmin.tasks.destroy', task.id));
        }
    };

    /* ── Stats ── */
    const stats = [
        { label: 'Total Task',  value: tasks.length,                                          color: 'indigo',  icon: ClipboardList },
        { label: 'Pending',     value: tasks.filter(t => t.status === 'pending').length,       color: 'slate',   icon: CircleDashed  },
        { label: 'Dikerjakan',  value: tasks.filter(t => t.status === 'in_progress').length,   color: 'amber',   icon: TrendingUp    },
        { label: 'Selesai',     value: tasks.filter(t => t.status === 'completed').length,     color: 'emerald', icon: CheckCircle2  },
    ];

    /* ── Format due date ── */
    const formatDate = (val) => {
        if (!val) return '—';
        return new Date(val).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    };

    const modalFooter = (isCreate) => (
        <div className="flex gap-3">
            <Button variant="flat" onClick={() => isCreate ? setIsCreateOpen(false) : setIsEditOpen(false)}>Batal</Button>
            <Button disabled={isCreate ? createProcessing : editProcessing}
                    onClick={isCreate ? handleCreate : handleEdit}>
                {isCreate ? 'Simpan Task' : 'Update Task'}
            </Button>
        </div>
    );

    return (
        <AuthenticatedLayout title="Manajemen Task">
            <PageHeader
                title="Manajemen Task"
                description="Buat, assign, dan pantau perkembangan task seluruh tim."
            >
                <Button onClick={() => setIsCreateOpen(true)}>
                    <Plus className="mr-2" size={16} strokeWidth={2.5} />
                    Tambah Task
                </Button>
            </PageHeader>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {stats.map((stat, i) => {
                    const c    = STAT_COLORS[stat.color] ?? STAT_COLORS.slate;
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

            {/* Data Table */}
            <DataTable
                headers={['#', 'Judul Task', 'Dibuat Oleh', 'Ditugaskan Ke', 'Prioritas', 'Status', 'Tenggat', 'Aksi']}
                empty={tasks.length === 0}
                emptyMessage="Belum ada task"
            >
                {tasks.map((task, i) => (
                    <tr key={task.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">

                        {/* No */}
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                            {String(i + 1).padStart(2, '0')}
                        </td>

                        {/* Judul */}
                        <td className="px-6 py-3.5 max-w-xs">
                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{task.title}</p>
                            {task.description && (
                                <p className="text-[11px] text-slate-400 truncate mt-0.5">{task.description}</p>
                            )}
                        </td>

                        {/* Dibuat Oleh (Assigner) */}
                        <td className="px-6 py-3.5">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {task.assigner?.name ?? '—'}
                            </p>
                            {task.assigner?.employee_code && (
                                <p className="text-[10px] text-slate-400 font-mono">{task.assigner.employee_code}</p>
                            )}
                        </td>

                        {/* Assigned To */}
                        <td className="px-6 py-3.5">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                {task.assignee?.name ?? '—'}
                            </p>
                            {task.assignee?.employee_code && (
                                <p className="text-[10px] text-slate-400 font-mono">{task.assignee.employee_code}</p>
                            )}
                        </td>

                        {/* Priority */}
                        <td className="px-6 py-3.5">
                            <PriorityBadge priority={task.priority} />
                        </td>

                        {/* Status */}
                        <td className="px-6 py-3.5">
                            <StatusBadge status={task.status} />
                        </td>

                        {/* Due Date */}
                        <td className="px-6 py-3.5 text-sm text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                            {formatDate(task.due_date)}
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => openEdit(task)}
                                    className="p-2 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 text-slate-400 hover:text-indigo-500 transition-colors"
                                    title="Edit"
                                >
                                    <Edit3 size={15} strokeWidth={2.5} />
                                </button>
                                <button
                                    onClick={() => handleDelete(task)}
                                    className="p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 transition-colors"
                                    title="Hapus"
                                >
                                    <Trash2 size={15} strokeWidth={2.5} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            {/* Modal Create */}
            <Modal
                show={isCreateOpen}
                maxWidth="lg"
                onClose={() => setIsCreateOpen(false)}
                title="Tambah Task Baru"
                footer={modalFooter(true)}
            >
                <TaskForm data={createData} setData={setCreateData} errors={createErrors} users={users} />
            </Modal>

            {/* Modal Edit */}
            <Modal
                show={isEditOpen}
                maxWidth="lg"
                onClose={() => setIsEditOpen(false)}
                title={`Edit Task — ${editTarget?.title ?? ''}`}
                footer={modalFooter(false)}
            >
                <TaskForm data={editData} setData={setEditData} errors={editErrors} users={users} />
            </Modal>
        </AuthenticatedLayout>
    );
}
