import React, { useState } from 'react';
import { useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import { Shield, Settings2, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/Utils/cn';

export default function UserRoles({ users, roles }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data, setData, put, processing, reset } = useForm({
        roles: [],
    });

    const openModal = (user) => {
        setSelectedUser(user);
        setData('roles', user.roles.map(r => r.name));
        setIsModalOpen(true);
    };

    const toggleRole = (roleName) => {
        const current = [...data.roles];
        const index = current.indexOf(roleName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(roleName);
        }
        setData('roles', current);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('superadmin.assignments.users.update', selectedUser.id), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    return (
        <AuthenticatedLayout title="Role Assignments">
            <PageHeader 
                title="Penetapan Role" 
                description="Hubungkan pengguna dengan peran yang sesuai dalam ekosistem."
            />

            <DataTable 
                headers={[
                    { label: '#', width: '80px' }, 
                    'Identitas Pengguna', 
                    { label: 'Role Saat Ini', align: 'center' }, 
                    { label: 'Aksi', align: 'center' }
                ]}
                empty={users.length === 0}
            >
                {users.map((user, i) => (
                    <tr key={user.id} className="group hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                        <td className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">
                            {String(i + 1).padStart(2, '0')}
                        </td>
                        <td className="px-8 py-5">
                            <div className="flex flex-col items-center">
                                <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">{user.name}</span>
                                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">{user.email}</span>
                            </div>
                        </td>
                        <td className="px-8 py-5 text-center">
                            <div className="flex flex-wrap justify-center gap-2">
                                {user.roles.length > 0 ? user.roles.map(role => (
                                    <span key={role.id} className="px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest bg-indigo-500/5 text-indigo-600 border border-indigo-500/10 italic">
                                        {role.name}
                                    </span>
                                )) : (
                                    <span className="text-[10px] font-black text-slate-300 dark:text-slate-800 uppercase italic tracking-widest">No Roles</span>
                                )}
                            </div>
                        </td>
                        <td className="px-8 py-5 text-center whitespace-nowrap">
                            <div className="flex justify-center">
                                <Button variant="flat" size="sm" onClick={() => openModal(user)} className="rounded-2xl border-indigo-500/10 hover:border-indigo-500/40">
                                    <Settings2 className="mr-2" size={14} />
                                    Kelola Role
                                </Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>

            <Modal 
                show={isModalOpen} 
                title={`KELOLA ROLE: ${selectedUser?.name}`} 
                onClose={() => setIsModalOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button disabled={processing} onClick={handleSubmit}>Simpan Perubahan</Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-3">
                    {roles.map((role) => (
                        <div 
                            key={role.id}
                            onClick={() => toggleRole(role.name)}
                            className={cn(
                                "p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 group",
                                data.roles.includes(role.name) 
                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20" 
                                    : "bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-300 dark:hover:border-indigo-900"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                                data.roles.includes(role.name) ? "bg-white/20" : "bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800"
                            )}>
                                <Shield size={18} strokeWidth={2.5} className={data.roles.includes(role.name) ? "text-white" : "text-indigo-600"} />
                            </div>
                            <div className="flex flex-col">
                                <span className={cn("text-xs font-bold uppercase tracking-tight italic", data.roles.includes(role.name) ? "text-white" : "text-slate-900 dark:text-white")}>
                                    {role.name}
                                </span>
                                <span className={cn("text-[8px] font-semibold uppercase tracking-widest", data.roles.includes(role.name) ? "text-indigo-100" : "text-slate-400")}>
                                    System Role
                                </span>
                            </div>
                            <div className="ml-auto">
                                {data.roles.includes(role.name) ? <CheckCircle2 size={18} strokeWidth={3} /> : <Circle size={18} strokeWidth={2} className="opacity-20" />}
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
