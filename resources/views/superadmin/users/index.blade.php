@extends('layouts.app')

@section('title', 'Manajemen Pengguna')

@section('content')

    {{-- Flash Messages (Handled by SweetAlert2 in layout) --}}

    {{-- Page Header --}}
    <x-page-header
        title="Manajemen Pengguna"
        description="Kelola hak akses, peran, dan data pengguna sistem."
    >
        <x-button variant="indigo" onclick="openModal('modal-create')">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
            Tambah Pengguna
        </x-button>
    </x-page-header>

    {{-- Stats Bar --}}
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        @php
            $totalUsers  = $users->count();
            $superadmins = $users->filter(fn($u) => $u->roles->first()?->name === 'superadmin')->count();
            $admins      = $users->filter(fn($u) => $u->roles->first()?->name === 'admin')->count();
            $members     = $users->filter(fn($u) => !$u->roles->first())->count();
        @endphp
        @foreach([
            ['label' => 'Total Pengguna', 'value' => $totalUsers,  'color' => 'indigo'],
            ['label' => 'Superadmin',     'value' => $superadmins, 'color' => 'purple'],
            ['label' => 'Admin',          'value' => $admins,      'color' => 'blue'],
            ['label' => 'Member',         'value' => $members,     'color' => 'slate'],
        ] as $stat)
            <div class="bg-white/80 dark:bg-slate-950/50 backdrop-blur-xl rounded-3xl border border-gray-100 dark:border-slate-800/40 px-5 py-4 flex items-center gap-4 shadow-sm">
                <div class="w-10 h-10 rounded-2xl bg-{{ $stat['color'] }}-500/10 flex items-center justify-center">
                    <div class="w-2.5 h-2.5 rounded-full bg-{{ $stat['color'] }}-500 shadow-lg shadow-{{ $stat['color'] }}-500/50"></div>
                </div>
                <div>
                    <p class="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">{{ $stat['value'] }}</p>
                    <p class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">{{ $stat['label'] }}</p>
                </div>
            </div>
        @endforeach
    </div>

    {{-- Data Table --}}
    <div class="animate-in fade-in slide-in-from-bottom-4 duration-700">
        <x-data-table
            :headers="['#', 'Identitas Pengguna', 'Peran', 'Bergabung', 'Aksi']"
            :empty="$users->isEmpty()"
            emptyMessage="Belum ada pengguna terdaftar"
        >
            @foreach($users as $i => $user)
                @php $role = $user->roles->first(); @endphp
                <tr class="group hover:bg-slate-50/80 dark:hover:bg-indigo-950/10 transition-colors duration-200">

                    {{-- Row Number --}}
                    <td class="px-6 py-5 w-12">
                        <span class="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                            {{ str_pad($i + 1, 2, '0', STR_PAD_LEFT) }}
                        </span>
                    </td>

                    {{-- Identity --}}
                    <td class="px-6 py-5">
                        <div class="flex items-center gap-4">
                            <div class="w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/10 flex items-center justify-center text-indigo-600 font-black text-xs uppercase group-hover:scale-110 transition-transform duration-300 shrink-0">
                                {{ strtoupper(substr($user->name, 0, 1)) }}
                            </div>
                            <div class="min-w-0">
                                <p class="text-sm font-black text-gray-900 dark:text-white truncate tracking-tight">{{ $user->name }}</p>
                                <p class="text-[10px] font-bold text-slate-500 truncate uppercase tracking-tighter opacity-80">{{ $user->email }}</p>
                            </div>
                        </div>
                    </td>

                    {{-- Role Badge --}}
                    <td class="px-6 py-5">
                        @if($role)
                            @php
                                $roleColors = [
                                    'superadmin' => 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
                                    'admin'      => 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
                                ];
                                $roleColor = $roleColors[$role->name] ?? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
                            @endphp
                            <span class="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border {{ $roleColor }}">
                                {{ $role->name }}
                            </span>
                        @else
                            <span class="px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                member
                            </span>
                        @endif
                    </td>

                    {{-- Date --}}
                    <td class="px-6 py-5">
                        <span class="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tighter">
                            {{ $user->created_at->format('d M Y') }}
                        </span>
                    </td>

                    {{-- Actions --}}
                    <td class="px-6 py-5">
                        <div class="flex items-center justify-end gap-2">
                            {{-- Edit Button --}}
                            <button
                                onclick="openEditModal({{ $user->id }}, '{{ addslashes($user->name) }}', '{{ $user->email }}', '{{ $role?->name ?? '' }}')"
                                class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-indigo-600 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200 flex items-center justify-center"
                                title="Edit Pengguna"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                            </button>

                            {{-- Delete Button --}}
                            <button
                                onclick="openDeleteModal({{ $user->id }}, '{{ addslashes($user->name) }}')"
                                class="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-900 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all duration-200 flex items-center justify-center"
                                title="Hapus Pengguna"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </button>
                        </div>
                    </td>
                </tr>
            @endforeach
        </x-data-table>
    </div>


    {{-- ================================
         MODAL: Create User
    ================================ --}}
    <x-modal id="modal-create" title="Tambah Pengguna Baru" maxWidth="lg">
        <form id="form-create" action="{{ route('superadmin.users.store') }}" method="POST" class="space-y-5">
            @csrf

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {{-- Name --}}
                <div class="sm:col-span-2">
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nama Lengkap</label>
                    <input type="text" name="name" required placeholder="Cth: Budi Santoso"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                    @error('name') <p class="text-[10px] text-rose-500 font-bold mt-1">{{ $message }}</p> @enderror
                </div>

                {{-- Email --}}
                <div class="sm:col-span-2">
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Alamat Email</label>
                    <input type="email" name="email" required placeholder="budi@example.com"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                    @error('email') <p class="text-[10px] text-rose-500 font-bold mt-1">{{ $message }}</p> @enderror
                </div>

                {{-- Password --}}
                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Password</label>
                    <input type="password" name="password" required placeholder="Min. 8 karakter"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                    @error('password') <p class="text-[10px] text-rose-500 font-bold mt-1">{{ $message }}</p> @enderror
                </div>

                {{-- Role --}}
                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Peran (Role)</label>
                    <select name="role"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all">
                        <option value="">-- Tanpa Peran --</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
        </form>

        <x-slot name="footer">
            <x-button type="submit" form="form-create" variant="indigo">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
                Simpan Pengguna
            </x-button>
            <x-button type="button" variant="flat" onclick="closeModal('modal-create')">Batal</x-button>
        </x-slot>
    </x-modal>


    {{-- ================================
         MODAL: Edit User
    ================================ --}}
    <x-modal id="modal-edit" title="Edit Pengguna" maxWidth="lg">
        <form id="form-edit" method="POST" class="space-y-5">
            @csrf
            @method('PUT')

            <input type="hidden" id="edit-user-id" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {{-- Name --}}
                <div class="sm:col-span-2">
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Nama Lengkap</label>
                    <input type="text" id="edit-name" name="name" required
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                </div>

                {{-- Email --}}
                <div class="sm:col-span-2">
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Alamat Email</label>
                    <input type="email" id="edit-email" name="email" required
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                </div>

                {{-- Password --}}
                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Password Baru <span class="text-slate-300 dark:text-slate-600">(opsional)</span></label>
                    <input type="password" name="password" placeholder="Kosongkan jika tidak diganti"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all" />
                </div>

                {{-- Role --}}
                <div>
                    <label class="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1.5">Peran (Role)</label>
                    <select id="edit-role" name="role"
                        class="w-full bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl px-4 py-3 text-sm font-medium text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 transition-all">
                        <option value="">-- Tanpa Peran --</option>
                        <option value="superadmin">Superadmin</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
            </div>
        </form>

        <x-slot name="footer">
            <x-button type="submit" form="form-edit" variant="indigo">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="mr-1.5"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                Simpan Perubahan
            </x-button>
            <x-button type="button" variant="flat" onclick="closeModal('modal-edit')">Batal</x-button>
        </x-slot>
    </x-modal>



@endsection

@push('scripts')
<script>
    // --- Edit Modal ---
    function openEditModal(id, name, email, role) {
        document.getElementById('edit-user-id').value = id;
        document.getElementById('edit-name').value    = name;
        document.getElementById('edit-email').value   = email;

        const roleSelect = document.getElementById('edit-role');
        for (let opt of roleSelect.options) {
            opt.selected = opt.value === role;
        }

        const form = document.getElementById('form-edit');
        form.action = `/superadmin/users/${id}`;

        openModal('modal-edit');
    }

    // --- Delete Confirmation with SweetAlert2 ---
    function openDeleteModal(id, name) {
        Swal.fire({
            title: 'Hapus Pengguna?',
            text: `Anda akan menghapus akun "${name}". Tindakan ini tidak dapat dibatalkan!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal',
            customClass: {
                popup: 'rounded-3xl border-none shadow-2xl dark:bg-slate-900 dark:text-white',
                confirmButton: 'rounded-xl px-5 py-2.5 text-sm font-bold',
                cancelButton: 'rounded-xl px-5 py-2.5 text-sm font-bold'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Create a dynamic form to submit the delete request
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = `/superadmin/users/${id}`;
                
                const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content;
                
                const csrfInput = document.createElement('input');
                csrfInput.type = 'hidden';
                csrfInput.name = '_token';
                csrfInput.value = csrfToken;
                
                const methodInput = document.createElement('input');
                methodInput.type = 'hidden';
                methodInput.name = '_method';
                methodInput.value = 'DELETE';
                
                form.appendChild(csrfInput);
                form.appendChild(methodInput);
                document.body.appendChild(form);
                form.submit();
            }
        });
    }
</script>
@endpush
