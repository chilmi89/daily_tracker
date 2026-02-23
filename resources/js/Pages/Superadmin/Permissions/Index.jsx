import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { Key, Plus, Edit3, Trash2 } from 'lucide-react';

export default function Index({ permissions }) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [activePermission, setActivePermission] = useState(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, errors: createErrors, reset: resetCreate } = useForm({
        name: '',
    });

    const { data: editData, setData: setEditData, put: putEdit, processing: editProcessing, errors: editErrors, reset: resetEdit } = useForm({
        name: '',
    });

    const openEditModal = (permission) => {
        setActivePermission(permission);
        setEditData({ name: permission.name });
        setIsEditModalOpen(true);
    };

    const handleCreate = (e) => {
        e.preventDefault();
        postCreate(route('superadmin.permissions.store'), {
            onSuccess: () => {
                setIsCreateModalOpen(false);
                resetCreate();
            },
        });
    };

    const handleEdit = (e) => {
        e.preventDefault();
        putEdit(route('superadmin.permissions.update', activePermission.id), {
            onSuccess: () => {
                setIsEditModalOpen(false);
                resetEdit();
            },
        });
    };

    const handleDelete = (id, name) => {
        if (confirm(`Hapus permission "${name}"?`)) {
            router.delete(route('superadmin.permissions.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout title="Manajemen Permission">
            <PageHeader 
                title="Manajemen Permission" 
                description="Kendalikan akses spesifik pada fitur-fitur aplikasi."
            >
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="mr-2" size={16} strokeWidth={3} />
                    Buat Permission
                </Button>
            </PageHeader>

            <DataTable 
                headers={['#', 'Identitas Permission', 'Guard Name', 'Bergabung', 'Aksi']}
                empty={permissions.length === 0}
                emptyMessage="Belum ada permission terdefinisi"
            >
                {permissions.map((perm, i) => (
                    <tr key={perm.id} className="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">
                        <td className="px-6 py-3.5 w-12 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-6 py-3.5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-emerald-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xs group-hover:scale-110 transition-transform duration-300 shrink-0">
                                    <Key size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight uppercase italic">{perm.name}</span>
                            </div>
                        </td>
                        <td className="px-6 py-3.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{perm.guard_name}</span>
                        </td>
                        <td className="px-6 py-3.5 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                            {new Date(perm.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-6 py-3.5 text-right">
                            <div className="flex items-center justify-end gap-2 text-slate-400">
                                <button onClick={() => openEditModal(perm)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-all">
                                    <Edit3 size={14} strokeWidth={2.5} />
                                </button>
                                <button onClick={() => handleDelete(perm.id, perm.name)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-all">
                                    <Trash2 size={14} strokeWidth={2.5} />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            {/* Create Modal */}
            <Modal show={isCreateModalOpen} title="BUAT PERMISSION" onClose={() => setIsCreateModalOpen(false)}
                footer={<div className="flex gap-3"><Button variant="flat" onClick={() => setIsCreateModalOpen(false)}>Batal</Button><Button disabled={createProcessing} onClick={handleCreate}>Simpan</Button></div>}
            >
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Permission Name</label>
                    <input type="text" value={createData.name} onChange={e => setCreateData('name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner" placeholder="Cth: users.create" />
                    {createErrors.name && <p className="text-[10px] text-rose-500 font-bold">{createErrors.name}</p>}
                </div>
            </Modal>

            {/* Edit Modal */}
            <Modal show={isEditModalOpen} title="EDIT PERMISSION" onClose={() => setIsEditModalOpen(false)}
                footer={<div className="flex gap-3"><Button variant="flat" onClick={() => setIsEditModalOpen(false)}>Batal</Button><Button disabled={editProcessing} onClick={handleEdit}>Update</Button></div>}
            >
                <div className="space-y-4">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Permission Name</label>
                    <input type="text" value={editData.name} onChange={e => setEditData('name', e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 text-sm font-bold shadow-inner" />
                    {editErrors.name && <p className="text-[10px] text-rose-500 font-bold">{editErrors.name}</p>}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
