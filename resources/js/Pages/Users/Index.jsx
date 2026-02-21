import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import PageHeader from '@/Components/PageHeader';
import DataTable from '@/Components/DataTable';
import Pagination from '@/Components/Pagination';
import SearchInput from '@/Components/SearchInput';
import FilterDropdown from '@/Components/FilterDropdown';
import Modal from '@/Components/Modal';
import Button from '@/Components/Form/Button';
import Input from '@/Components/Form/Input';
import Select from '@/Components/Form/Select';

const sampleUsers = [
    { id: 1, name: 'Budi Santoso', email: 'budi@example.com', role: 'Admin', status: 'Aktif', joined: '2024-01-15' },
    { id: 2, name: 'Siti Rahayu', email: 'siti@example.com', role: 'User', status: 'Aktif', joined: '2024-02-20' },
    { id: 3, name: 'Ahmad Dahlan', email: 'ahmad@example.com', role: 'User', status: 'Nonaktif', joined: '2024-03-10' },
    { id: 4, name: 'Dewi Permata', email: 'dewi@example.com', role: 'Editor', status: 'Aktif', joined: '2024-04-05' },
    { id: 5, name: 'Rizki Pratama', email: 'rizki@example.com', role: 'User', status: 'Pending', joined: '2024-05-12' },
];

const columns = [
    {
        key: 'name',
        label: 'Nama',
        sortable: true,
        render: (val, row) => (
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center text-indigo-600 text-sm font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                    {val.charAt(0)}
                </div>
                <div>
                    <p className="font-bold text-gray-900 dark:text-white leading-tight">{val}</p>
                    <p className="text-[11px] font-medium text-gray-400 dark:text-slate-500 mt-0.5">{row.email}</p>
                </div>
            </div>
        ),
    },
    { key: 'role', label: 'Peran', sortable: true, render: (val) => <span className="font-bold text-gray-700 dark:text-slate-300">{val}</span> },
    {
        key: 'status',
        label: 'Status',
        render: (val) => {
            const map = {
                'Aktif': 'bg-emerald-100/80 dark:bg-emerald-950/40 text-emerald-600',
                'Nonaktif': 'bg-gray-100/80 dark:bg-slate-800/40 text-gray-600 dark:text-slate-500',
                'Pending': 'bg-amber-100/80 dark:bg-amber-950/40 text-amber-600',
            };
            return (
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${map[val] ?? map['Nonaktif']}`}>
                    {val}
                </span>
            );
        },
    },
    { key: 'joined', label: 'Terdaftar', sortable: true, render: (val) => <span className="text-gray-400 dark:text-slate-600 font-medium">{val}</span> },
];

export default function Users({ users = { data: sampleUsers, meta: null }, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [filterStatus, setFilterStatus] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', role: 'User' });

    const filterOptions = [
        { value: '', label: 'Semua Status' },
        { value: 'Aktif', label: 'Aktif' },
        { value: 'Nonaktif', label: 'Nonaktif' },
        { value: 'Pending', label: 'Pending' },
    ];

    const filteredData = users.data.filter(u => {
        const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
        const matchStatus = !filterStatus || u.status === filterStatus;
        return matchSearch && matchStatus;
    });

    return (
        <AppLayout>
            <Head title="Pengguna" />

            <PageHeader title="Manajemen User" description="Lihat dan kelola semua hak akses pengguna sistem.">
                <Button onClick={() => setShowModal(true)} className="shadow-lg shadow-indigo-500/20">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    User Baru
                </Button>
            </PageHeader>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="flex-1">
                    <SearchInput
                        value={search}
                        onChange={setSearch}
                        placeholder="Cari berdasarkan nama atau email..."
                        className="rounded-2xl"
                    />
                </div>
                <FilterDropdown
                    label="Status"
                    options={filterOptions}
                    value={filterStatus}
                    onChange={setFilterStatus}
                />
            </div>

            {/* Table */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <DataTable
                    columns={columns}
                    data={filteredData}
                    emptyMessage="Daftar user kosong"
                    actions={(row) => (
                        <>
                            <button className="p-2 rounded-xl text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </>
                    )}
                />
            </div>

            {users.meta && (
                <div className="mt-6 flex justify-center">
                    <Pagination meta={users.meta} />
                </div>
            )}

            {/* Add User Modal */}
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Detail User Baru">
                <div className="space-y-6">
                    <Input
                        label="Nama"
                        placeholder="Nama lengkap"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        required
                    />
                    <Input
                        label="Email"
                        type="email"
                        placeholder="email@domain.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        required
                    />
                    <Select
                        label="Hak Akses"
                        value={form.role}
                        onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                        options={[
                            { value: 'User', label: 'User Biasa' },
                            { value: 'Editor', label: 'Editor Konten' },
                            { value: 'Admin', label: 'Administrator' },
                        ]}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" onClick={() => setShowModal(false)} className="rounded-2xl">Batal</Button>
                        <Button className="rounded-2xl shadow-lg shadow-indigo-500/20">Simpan User</Button>
                    </div>
                </div>
            </Modal>
        </AppLayout>
    );
}
