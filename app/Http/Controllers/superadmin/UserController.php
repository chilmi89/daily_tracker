<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Services\Superadmin\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Throwable;

class UserController extends Controller
{
    public function __construct(
        protected UserService $service
    ) {}

    public function index()
    {
        $users = $this->service->getAll();
        $roles = \Spatie\Permission\Models\Role::all();
        $managers = User::select('id', 'name', 'employee_code')
            ->where('status', 'active')
            ->orderBy('name')
            ->get();

        return \Inertia\Inertia::render('Superadmin/Users/Index', [
            'users'    => $users,
            'roles'    => $roles,
            'managers' => $managers,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['nullable', 'email', 'unique:users,email'],
            'password'      => ['required', 'string', 'min:8'],
            'role'          => ['nullable', 'string', 'exists:roles,name'],

            // Employee Profile
            'employee_code' => ['nullable', 'string', 'max:50', 'unique:users,employee_code'],
            'position'      => ['nullable', 'string', 'max:100'],
            'department'    => ['nullable', 'string', 'max:100'],
            'manager_id'    => ['nullable', 'integer', 'exists:users,id'],
            'join_date'     => ['nullable', 'date'],
            'status'        => ['nullable', 'in:active,inactive'],
        ]);

        try {
            $user = $this->service->create($validated);

            if (!empty($validated['role'])) {
                $user->syncRoles([$validated['role']]);
            }

            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'success', 'message' => "Pengguna \"{$user->name}\" berhasil ditambahkan."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menambahkan pengguna. ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name'          => ['required', 'string', 'max:255'],
            'email'         => ['nullable', 'email', "unique:users,email,{$id}"],
            'password'      => ['nullable', 'string', 'min:8'],
            'role'          => ['nullable', 'string', 'exists:roles,name'],

            // Employee Profile
            'employee_code' => ['nullable', 'string', 'max:50', "unique:users,employee_code,{$id}"],
            'position'      => ['nullable', 'string', 'max:100'],
            'department'    => ['nullable', 'string', 'max:100'],
            'manager_id'    => ['nullable', 'integer', 'exists:users,id', "not_in:{$id}"],
            'join_date'     => ['nullable', 'date'],
            'status'        => ['nullable', 'in:active,inactive'],
        ]);

        try {
            $user = $this->service->update($id, $validated);

            if (array_key_exists('role', $validated)) {
                $user->syncRoles($validated['role'] ? [$validated['role']] : []);
            }

            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'success', 'message' => "Pengguna \"{$user->name}\" berhasil diperbarui."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal memperbarui pengguna. ' . $e->getMessage()]);
        }
    }

    public function destroy(int $id)
    {
        try {
            $user = $this->service->findById($id);
            $name = $user->name;

            $this->service->delete($id);

            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'success', 'message' => "Pengguna \"{$name}\" berhasil dihapus."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.users.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menghapus pengguna. ' . $e->getMessage()]);
        }
    }

    public function assignRole(Request $request, int $id)
    {
        $validated = $request->validate([
            'role' => ['nullable', 'string', 'exists:roles,name'],
        ]);

        try {
            $user = $this->service->findById($id);
            $this->service->syncRoles($id, $validated['role'] ? [$validated['role']] : []);

            return redirect()->route('superadmin.users.index')
                ->with('toast', [
                    'type'    => 'success',
                    'message' => "Role berhasil diperbarui untuk pengguna \"{$user->name}\".",
                ]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.users.index')
                ->with('toast', [
                    'type'    => 'error',
                    'message' => 'Gagal memperbarui role pengguna. ' . $e->getMessage(),
                ]);
        }
    }
}
