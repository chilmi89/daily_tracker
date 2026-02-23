import React, { useState } from 'react';
import { useForm, router, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { Shield, Plus, Edit3, Trash2 } from 'lucide-react';

export default function Index({ roles }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activeRole, setActiveRole] = useState(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
    });

    const { data: editData, setData: setEditData, put: putEdit, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        name: '',
    });

    const openEditModal = (role) => {
        setActiveRole(role);
        setEditData({ name: role.name });
        setIsEditModalOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        postCreate(route('superadmin.roles.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                resetCreate();
            },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        putEdit(route('superadmin.roles.update', activeRole.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                resetEdit();
            },
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus role "${name}"?`)) {
            router.delete(route('superadmin.roles.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Manajemen Role">
            <PageHeader 
                title="Manajemen Role" 
                description="Definisikan peran dan pasangkan dengan hak akses sistem."
            >
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="mr-2" size={16} strokeWidth={3} />
                    Buat Role Baru
                </Button>
            </PageHeader>

            <DataTable 
                headers={['#', 'Identitas Role', 'Total Permissions', 'Guard', 'Aksi']}
                empty={roles.length === 0}
                emptyMessage="Belum ada role terdefinisi"
            >
                {roles.map((role, i) => (
                    <tr key={role.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-3.5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 font-black text-xs uppercase group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <Shield size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight uppercase italic">{role.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-3.5">
                            <span className="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 inline-block">
                                {role.permissions?.length || 0} Permissions Assigned
                            </span>
                        </td>
                        <td className="px-6 py-3.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{role.guard_name}</span>
                        </td>
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                <button onClick={() => openEditModal(role)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                                    <Edit3 size={14} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => handleDelete(role.id, role.name)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} title="BUAT ROLE BARU" onClose={() => setIsCreateModalOpen(false)}
                footer={<div className="flex gap-3"><Button variant="flat" onClick={() => setIsCreateModalOpen(false)}>Batal</Button><Button disabled={createProcessing} onClick={handleCreate}>Simpan Role</Button></div>}
            >
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Role</label>
                    <input type="text" value={createData.name} onChange={e => setCreateData('name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner" placeholder="Cth: manager" />
                    {createErrors.name && <p className="text-[10px] text-rose-500 font-bold">{createErrors.name}</p>}
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} title="EDIT ROLE" onClose={() => setIsEditModalOpen(false)}
                footer={<div className="flex gap-3"><Button variant="flat" onClick={() => setIsEditModalOpen(false)}>Batal</Button><Button disabled={editProcessing} onClick={handleEdit}>Update Role</Button></div>}
            >
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Nama Role</label>
                    <input type="text" value={editData.name} onChange={e => setEditData('name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner" />
                    {editErrors.name && <p className="text-[10px] text-rose-500 font-bold">{editErrors.name}</p>}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
