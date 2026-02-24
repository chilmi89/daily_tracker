import React, { useState, useRef } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { UserPlus, Edit3, Trash2, CheckCircle2, CircleDashed, Briefcase, CalendarDays, X, Users2, ShieldCheck, XCircle } from 'lucide-react';

/* ─── Constants ───────────────────────────────────────────── */

const emptyForm = {
    name: '', email: '', password: '', role: '',
    employee_code: '', position: '', department: '',
    manager_id: '', join_date: '', status: 'active',
};

/* ─── Shared field styles ─────────────────────────────────── */
const inp = "w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all";
const lbl = "text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block";
const err = "mt-1 text-[10px] text-rose-500 font-bold";

/* Tailwind stat card color map (static — tidak boleh dynamic) */
const STAT_COLORS = {
    indigo:  { bg: 'bg-indigo-500/10',                     text: 'text-indigo-500'  },
    emerald: { bg: 'bg-emerald-500/10',                    text: 'text-emerald-500' },
    slate:   { bg: 'bg-slate-200/60 dark:bg-slate-800/60', text: 'text-slate-400'   },
    purple:  { bg: 'bg-purple-500/10',                     text: 'text-purple-500'  },
    amber:   { bg: 'bg-amber-500/10',                      text: 'text-amber-500'   },
    rose:    { bg: 'bg-rose-500/10',                       text: 'text-rose-500'    },
};
/* ─── Status Badge ────────────────────────────────────────── */
function StatusBadge({ status }) {
    const active = !status || status === 'active';
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest border ${
            active
                ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
        }`}>
            {active
                ? <CheckCircle2 size={10} strokeWidth={2.5} />
                : <CircleDashed size={10} strokeWidth={2} />}
            {active ? 'Aktif' : 'Non-aktif'}
        </span>
    );
}

/* ─── Custom Date Picker ─────────────────────────────────── */
const MONTHS_ID = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];

function DatePicker({ value, onChange, placeholder = 'Pilih tanggal...', error }) {
    const inputRef = useRef(null);

    const formatted = (() => {
        if (!value) return '';
        const [y, m, d] = value.split('-');
        if (!y || !m || !d) return '';
        return `${parseInt(d, 10)} ${MONTHS_ID[parseInt(m, 10) - 1]} ${y}`;
    })();

    return (
        <div className="relative">
            {/* Visible display button */}
            <button
                type="button"
                onClick={() => inputRef.current?.showPicker?.() || inputRef.current?.click()}
                className={`
                    w-full flex items-center gap-3 text-left
                    bg-slate-50 dark:bg-slate-950
                    border ${error ? 'border-rose-400' : 'border-slate-200 dark:border-slate-800'}
                    rounded-2xl px-4 py-4 text-sm font-bold shadow-inner
                    focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all
                    hover:border-indigo-400/60 group
                `}
            >
                <CalendarDays size={16} strokeWidth={2}
                    className="text-indigo-500 shrink-0 group-hover:scale-110 transition-transform" />
                <span className={formatted ? 'text-slate-800 dark:text-slate-100' : 'text-slate-400 font-medium'}>
                    {formatted || placeholder}
                </span>
                {value && (
                    <span
                        role="button"
                        onClick={e => { e.stopPropagation(); onChange(''); }}
                        className="ml-auto text-slate-300 hover:text-rose-400 transition-colors cursor-pointer"
                    >
                        <X size={14} strokeWidth={2.5} />
                    </span>
                )}
                {!value && (
                    <span className="ml-auto text-slate-300">
                        <CalendarDays size={14} strokeWidth={1.5} />
                    </span>
                )}
            </button>

            {/* Hidden native date input — triggers the system date picker */}
            <input
                ref={inputRef}
                type="date"
                value={value}
                onChange={e => onChange(e.target.value)}
                className="sr-only"
                tabIndex={-1}
            />
        </div>
    );
}

/* ─── Reusable Field Form ─────────────────────────────────── */
function UserForm({ data, setData, errors, roles, managers, departments, isEdit = false }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Nama */}
            <div className="col-span-full">
                <label className={lbl}>Identitas Nama</label>
                <input type="text" value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={inp} placeholder="Cth: Budi Santoso" />
                {errors.name && <p className={err}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
                <label className={lbl}>Email</label>
                <input type="email" value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={inp} placeholder="email@domain.com" />
                {errors.email && <p className={err}>{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
                <label className={lbl}>{isEdit ? 'Password (Optional)' : 'Secret Key'}</label>
                <input type="password" value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className={inp}
                    placeholder={isEdit ? 'Kosongkan jika tidak diganti' : '••••••••'} />
                {errors.password && <p className={err}>{errors.password}</p>}
            </div>

            {/* Divider: Employee Profile */}
            <div className="col-span-full flex items-center gap-3 pt-1">
                <Briefcase size={12} className="text-slate-400" strokeWidth={2.5} />
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Profil Karyawan</span>
                <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800" />
            </div>

            {/* Kode Karyawan */}
            <div>
                <label className={lbl}>
                    Kode Karyawan
                    <span className="ml-2 text-indigo-400 normal-case tracking-normal font-bold">
                        (opsional — auto-generate jika kosong)
                    </span>
                </label>
                <input type="text" value={data.employee_code}
                    onChange={e => setData('employee_code', e.target.value.toUpperCase())}
                    className={inp} placeholder="Kosongkan untuk auto → EMP-001" />
                {errors.employee_code && <p className={err}>{errors.employee_code}</p>}
            </div>

            {/* Jabatan */}
            <div>
                <label className={lbl}>Jabatan / Posisi</label>
                <input type="text" value={data.position}
                    onChange={e => setData('position', e.target.value)}
                    className={inp} placeholder="Cth: Backend Developer" />
                {errors.position && <p className={err}>{errors.position}</p>}
            </div>

            {/* Departemen */}
            <div>
                <label className={lbl}>Departemen</label>
                <select value={data.department}
                    onChange={e => setData('department', e.target.value)}
                    className={inp + ' appearance-none'}>
                    <option value="">-- Pilih Departemen --</option>
                    {departments.map(d => (
                        <option key={d.id} value={d.name}>
                            {d.name}{d.code ? ` (${d.code})` : ''}
                        </option>
                    ))}
                </select>
                {errors.department && <p className={err}>{errors.department}</p>}
            </div>

            {/* Atasan */}
            <div>
                <label className={lbl}>Atasan (Manager)</label>
                <select value={data.manager_id}
                    onChange={e => setData('manager_id', e.target.value)}
                    className={inp + ' appearance-none'}>
                    <option value="">-- Tanpa Atasan --</option>
                    {managers.map(m => (
                        <option key={m.id} value={m.id}>
                            {m.name}{m.employee_code ? ` (${m.employee_code})` : ''}
                        </option>
                    ))}
                </select>
                {errors.manager_id && <p className={err}>{errors.manager_id}</p>}
            </div>

            {/* Tanggal Bergabung */}
            <div>
                <label className={lbl}>Tanggal Bergabung</label>
                <DatePicker
                    value={data.join_date}
                    onChange={val => setData('join_date', val)}
                    placeholder="Klik untuk pilih tanggal..."
                    error={!!errors.join_date}
                />
                {errors.join_date && <p className={err}>{errors.join_date}</p>}
            </div>

            {/* Status */}
            <div>
                <label className={lbl}>Status</label>
                <select value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className={inp + ' appearance-none'}>
                    <option value="active">Aktif</option>
                    <option value="inactive">Non-aktif</option>
                </select>
                {errors.status && <p className={err}>{errors.status}</p>}
            </div>

            {/* Access Level (Role) */}
            <div className="col-span-full">
                <label className={lbl}>Access Level (Role)</label>
                <select value={data.role}
                    onChange={e => setData('role', e.target.value)}
                    className={inp + ' appearance-none'}>
                    <option value="">-- Tanpa Role --</option>
                    {roles.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                </select>
                {errors.role && <p className={err}>{errors.role}</p>}
            </div>
        </div>
    );
}

/* ─── Main Page ───────────────────────────────────────────── */
export default function Index({ users, roles, managers, departments }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen,   setIsEditModalOpen]   = useState(false);
    const [editingUser,       setEditingUser]        = useState(null);

    const {
        data: createData, setData: setCreateData,
        post: postCreate, processing: createProcessing,
        errors: createErrors, reset: resetCreate,
    } = useForm(emptyForm);

    const {
        data: editData, setData: setEditData,
        put: putEdit, processing: editProcessing,
        errors: editErrors, reset: resetEdit,
    } = useForm(emptyForm);

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditData({
            name:          user.name,
            email:         user.email         ?? '',
            password:      '',
            role:          user.roles?.[0]?.name ?? '',
            employee_code: user.employee_code ?? '',
            position:      user.position      ?? '',
            department:    user.department    ?? '',
            manager_id:    user.manager_id    != null ? String(user.manager_id) : '',
            join_date:     user.join_date     ?? '',
            status:        user.status        ?? 'active',
        });
        setIsEditModalOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        postCreate(route('superadmin.users.store'), {
            onSuccess: () => { setIsCreateModalOpen(false); resetCreate(); },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        putEdit(route('superadmin.users.update', editingUser.id), {
            onSuccess: () => { setIsEditModalOpen(false); resetEdit(); },
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus pengguna "${name}"?`)) {
            router.delete(route('superadmin.users.destroy', id));
        }
    };

    const stats = [
        { label: 'Total Pengguna', value: users.length,                                                              color: 'indigo',  icon: Users2       },
        { label: 'Superadmin',     value: users.filter(u => u.roles?.some(r => r.name === 'superadmin')).length,     color: 'purple',  icon: ShieldCheck  },
        { label: 'Aktif',          value: users.filter(u => !u.status || u.status === 'active').length,              color: 'emerald', icon: CheckCircle2 },
        { label: 'Non-aktif',      value: users.filter(u => u.status === 'inactive').length,                         color: 'slate',   icon: XCircle      },
    ];

    const modalProps = (isCreate) => ({
        show:     isCreate ? isCreateModalOpen : isEditModalOpen,
        maxWidth: '2xl',
        onClose:  isCreate ? () => setIsCreateModalOpen(false) : () => setIsEditModalOpen(false),
        footer: (
            <div className="flex gap-3">
                <Button variant="flat" onClick={isCreate ? () => setIsCreateModalOpen(false) : () => setIsEditModalOpen(false)}>
                    Batal
                </Button>
                <Button
                    disabled={isCreate ? createProcessing : editProcessing}
                    onClick={isCreate ? handleCreate : handleEdit}
                >
                    {isCreate ? 'Simpan Pengguna' : 'Update Data'}
                </Button>
            </div>
        ),
    });

    return (
        <AuthenticatedLayout title="Manajemen Pengguna">
            <PageHeader
                title="Manajemen Pengguna"
                description="Kelola hak akses, peran, dan data karyawan sistem."
            >
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <UserPlus className="mr-2" size={16} strokeWidth={2.5} />
                    Tambah Pengguna
                </Button>
            </PageHeader>

            {/* Stats Bar */}
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

            {/* Data Table */}
            <DataTable
                headers={['#', 'Identitas Pengguna', 'Jabatan & Dept.', 'Status', 'Peran', 'Aksi']}
                empty={users.length === 0}
                emptyMessage="Belum ada pengguna terdaftar"
            >
                {users.map((user, i) => (
                    <tr key={user.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">

                        {/* No */}
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                        </td>

                        {/* Identitas */}
                        <td className="px-6 py-3.5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs uppercase group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-sm shadow-indigo-500/5">
                                    {user.name.substring(0, 1).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{user.name}</p>
                                    <p className="text-[10px] font-bold text-slate-400 truncate">
                                        {user.email || <span className="italic opacity-50">no email</span>}
                                        {user.employee_code && (
                                            <span className="ml-2 text-indigo-400 font-black">[{user.employee_code}]</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </td>

                        {/* Jabatan & Dept */}
                        <td className="px-6 py-3.5">
                            <p className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate">
                                {user.position || <span className="italic text-slate-300 dark:text-slate-600">—</span>}
                            </p>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider truncate">
                                {user.department || <span className="normal-case italic opacity-50">no dept</span>}
                            </p>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-3.5">
                            <StatusBadge status={user.status} />
                        </td>

                        {/* Peran */}
                        <td className="px-6 py-3.5">
                            {user.roles?.[0] ? (
                                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400">
                                    {user.roles[0].name}
                                </span>
                            ) : (
                                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                    member
                                </span>
                            )}
                        </td>

                        {/* Aksi */}
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                <button onClick={() => openEditModal(user)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                                    <Edit3 size={14} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => handleDelete(user.id, user.name)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            {/* ── Create Modal ─────────────────────────────── */}
            <Modal title="Tambah Pengguna Baru" {...modalProps(true)}>
                <form onSubmit={handleCreate}>
                    <UserForm
                        data={createData} setData={setCreateData}
                        errors={createErrors} roles={roles} managers={managers}
                        departments={departments}
                    />
                </form>
            </Modal>

            {/* ── Edit Modal ───────────────────────────────── */}
            <Modal title={`Edit: ${editingUser?.name ?? '...'}`} {...modalProps(false)}>
                <form onSubmit={handleEdit}>
                    <UserForm
                        data={editData} setData={setEditData}
                        errors={editErrors} roles={roles} managers={managers}
                        departments={departments}
                        isEdit
                    />
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
