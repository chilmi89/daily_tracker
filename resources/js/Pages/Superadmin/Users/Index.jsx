import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { UserPlus, Edit3, Trash2 } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cn } from '@/Utils/cn';

export default function Index({ users, roles }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const { data: editData, setData: setEditData, put: putEdit, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        name: '',
        email: '',
        password: '',
        role: '',
    });

    const openEditModal = (user) => {
        setEditingUser(user);
        setEditData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.roles?.[0]?.name || '',
        });
        setIsEditModalOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        postCreate(route('superadmin.users.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                resetCreate();
            },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        putEdit(route('superadmin.users.update', editingUser.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                resetEdit();
            },
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus pengguna "${name}"?`)) {
            router.delete(route('superadmin.users.destroy', id));
        }
    };

    const stats = [
        { label: 'Total Pengguna', value: users.length, color: 'indigo' },
        { label: 'Superadmin', value: users.filter(u => u.roles?.some(r => r.name === 'superadmin')).length, color: 'purple' },
        { label: 'Admin', value: users.filter(u => u.roles?.some(r => r.name === 'admin')).length, color: 'blue' },
        { label: 'Member', value: users.filter(u => !u.roles?.length).length, color: 'slate' },
    ];

    return (
        <AuthenticatedLayout title="Manajemen Pengguna">
            <PageHeader 
                title="Manajemen Pengguna" 
                description="Kelola hak akses, peran, dan data pengguna sistem."
            >
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <UserPlus className="mr-2" size={16} strokeWidth={2.5} />
                    Tambah Pengguna
                </Button>
            </PageHeader>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-slate-800/40 px-5 py-4 flex items-center gap-4 shadow-sm">
                        <div className={`w-10 h-10 rounded-2xl bg-${stat.color}-500/10 flex items-center justify-center`}>
                            <div className={`w-2.5 h-2.5 rounded-full bg-${stat.color}-500 shadow-lg shadow-${stat.color}-500/50`}></div>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{stat.value}</p>
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Data Table */}
            <DataTable 
                headers={['#', 'Identitas Pengguna', 'Peran', 'Bergabung', 'Aksi']}
                empty={users.length === 0}
                emptyMessage="Belum ada pengguna terdaftar"
            >
                {users.map((user, i) => (
                    <tr key={user.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-3.5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs uppercase group-hover:scale-110 transition-transform duration-300 shrink-0 shadow-sm shadow-indigo-500/5">
                                    {user.name.substring(0, 1).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{user.name}</p>
                                    <p className="text-[10px] font-bold text-slate-500 truncate uppercase tracking-tighter opacity-80">{user.email}</p>
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-3.5">
                            {user.roles?.[0] ? (
                                <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400`}>
                                    {user.roles[0].name}
                                </span>
                            ) : (
                                <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                    member
                                </span>
                            )}
                        </td>
                        <td className="px-6 py-3.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                            {new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
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

            {/* Create Modal */}
            <Modal 
                show={isCreateModalOpen} 
                title="Tambah Pengguna BARU" 
                maxWidth="lg" 
                onClose={() => setIsCreateModalOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsCreateModalOpen(false)}>Batal</Button>
                        <Button disabled={createProcessing} onClick={handleCreate}>Simpan Pengguna</Button>
                    </div>
                }
            >
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="col-span-full">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Identitas Nama</label>
                            <input 
                                type="text"
                                value={createData.name}
                                onChange={e => setCreateData('name', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Cth: Budi Santoso"
                            />
                            {createErrors.name && <p className="mt-1 text-[10px] text-rose-500 font-bold">{createErrors.name}</p>}
                        </div>
                        <div className="col-span-full">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Email Connection</label>
                            <input 
                                type="email"
                                value={createData.email}
                                onChange={e => setCreateData('email', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="your@email.com"
                            />
                            {createErrors.email && <p className="mt-1 text-[10px] text-rose-500 font-bold">{createErrors.email}</p>}
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Secret Key</label>
                            <input 
                                type="password"
                                value={createData.password}
                                onChange={e => setCreateData('password', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="••••••••"
                            />
                            {createErrors.password && <p className="mt-1 text-[10px] text-rose-500 font-bold">{createErrors.password}</p>}
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Access Level</label>
                            <select 
                                value={createData.role}
                                onChange={e => setCreateData('role', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20 appearance-none"
                            >
                                <option value="">-- Member --</option>
                                {roles.map(r => <option key={r.id} value={r.name}>{r.name.toUpperCase()}</option>)}
                            </select>
                        </div>
                    </div>
                </form>
            </Modal>

            {/* Edit Modal */}
            <Modal 
                show={isEditModalOpen} 
                title="Update Identitas" 
                maxWidth="lg" 
                onClose={() => setIsEditModalOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsEditModalOpen(false)}>Batal</Button>
                        <Button disabled={editProcessing} onClick={handleEdit}>Update Data</Button>
                    </div>
                }
            >
                <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="col-span-full">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Identitas Nama</label>
                            <input 
                                type="text"
                                value={editData.name}
                                onChange={e => setEditData('name', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                        <div className="col-span-full">
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Email Connection</label>
                            <input 
                                type="email"
                                value={editData.email}
                                onChange={e => setEditData('email', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2 block">Update Key (Optional)</label>
                            <input 
                                type="password"
                                value={editData.password}
                                onChange={e => setEditData('password', e.target.value)}
                                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner focus:ring-2 focus:ring-indigo-500/20"
                                placeholder="Kosongkan jika tidak diganti"
                            />
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
