import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PageHeader from '@/Components/UI/PageHeader';
import DataTable from '@/Components/UI/DataTable';
import Button from '@/Components/UI/Button';
import Modal from '@/Components/UI/Modal';
import Toggle from '@/Components/UI/Toggle';
import { Key, Settings2 } from 'lucide-react';

export default function RolePermissions({ roles, permissions }) {
    const [selectedRole, setSelectedRole] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, put, processing, reset } = useForm({
        permissions: [],
    });

    const openModal = (role) => {
        setSelectedRole(role);
        setData('permissions', role.permissions.map(p => p.name));
        setIsModalOpen(true);
    };

    const togglePermission = (permName) => {
        const current = [...data.permissions];
        const index = current.indexOf(permName);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(permName);
        }
        setData('permissions', current);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('superadmin.assignments.roles.update', selectedRole.id), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
            },
        });
    };

    const filteredPermissions = permissions.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            <div className="flex justify-center">
                                <span className="px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] bg-emerald-500/5 text-emerald-600 border border-emerald-500/10 shadow-sm shadow-emerald-500/5">
                                    {role.permissions.length} Permissions
                                </span>
                            </div>
                        </td>
                        <td className="px-8 py-5 text-center whitespace-nowrap">
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
                title={`KONFIGURASI IZIN: ${selectedRole?.name}`} 
                onClose={() => setIsModalOpen(false)}
                footer={
                    <div className="flex gap-3">
                        <Button variant="flat" onClick={() => setIsModalOpen(false)}>Batal</Button>
                        <Button disabled={processing} onClick={handleSubmit}>Simpan Konfigurasi</Button>
                    </div>
                }
            >
                <div className="space-y-6">
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Cari izin..." 
                            className="w-full bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-3 text-xs font-bold focus:ring-2 focus:ring-indigo-500/20 outline-hidden transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {filteredPermissions.map((perm) => (
                            <Toggle 
                                key={perm.id}
                                label={perm.name}
                                description="Global Access"
                                enabled={data.permissions.includes(perm.name)}
                                onChange={() => togglePermission(perm.name)}
                            />
                        ))}
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
