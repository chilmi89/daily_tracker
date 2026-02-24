<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Repositories\Superadmin\RoleRepository;
use Illuminate\Http\Request;
use Throwable;

class RoleController extends Controller
{
    public function __construct(
        protected RoleRepository $repository
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = $this->repository->getAll();
        $permissions = \Spatie\Permission\Models\Permission::all();

        return \Inertia\Inertia::render('Superadmin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return back();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name'],
        ]);

        try {
            $role = $this->repository->create([
                'name' => $validated['name'],
                'guard_name' => 'web',
            ]);

            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'success', 'message' => "Role \"{$role->name}\" berhasil ditambahkan."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menambahkan role. ' . $e->getMessage()]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return redirect()->route('superadmin.roles.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $id)
    {
        return redirect()->route('superadmin.roles.index');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles,name,' . $id],
        ]);

        try {
            $role = $this->repository->update($id, [
                'name' => $validated['name'],
            ]);

            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'success', 'message' => "Role \"{$role->name}\" berhasil diperbarui."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal memperbarui role. ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $this->repository->delete($id);

            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'success', 'message' => 'Role berhasil dihapus.']);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menghapus role. ' . $e->getMessage()]);
        }
    }

    /**
     * Sync permissions for a role.
     */
    public function syncPermissions(Request $request, int $id)
    {
        $validated = $request->validate([
            'permissions' => ['array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        try {
            $this->repository->syncPermissions($id, $validated['permissions'] ?? []);

            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'success', 'message' => 'Permissions berhasil diperbarui untuk role tersebut.']);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.roles.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal memperbarui permissions. ' . $e->getMessage()]);
        }
    }
}
