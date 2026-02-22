<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Services\Superadmin\UserService;
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

        return view('superadmin.users.index', compact('users'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', 'unique:users,email'],
            'password' => ['required', 'string', 'min:8'],
            'role'     => ['nullable', 'string', 'exists:roles,name'],
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
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'email', "unique:users,email,{$id}"],
            'password' => ['nullable', 'string', 'min:8'],
            'role'     => ['nullable', 'string', 'exists:roles,name'],
        ]);

        try {
            $user = $this->service->update($id, $validated);

            if (!empty($validated['role'])) {
                $user->syncRoles([$validated['role']]);
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
}
