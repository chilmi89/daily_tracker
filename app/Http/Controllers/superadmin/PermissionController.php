<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Repositories\Superadmin\PermissionRepository;
use Illuminate\Http\Request;
use Throwable;

class PermissionController extends Controller
{
    public function __construct(
        protected PermissionRepository $repository
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = $this->repository->getAll();

        return \Inertia\Inertia::render('Superadmin/Permissions/Index', [
            'permissions' => $permissions
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name'],
        ]);

        try {
            $permission = $this->repository->create([
                'name' => $validated['name'],
                'guard_name' => 'web',
            ]);

            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'success', 'message' => "Permission \"{$permission->name}\" berhasil ditambahkan."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menambahkan permission. ' . $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:permissions,name,' . $id],
        ]);

        try {
            $permission = $this->repository->update($id, [
                'name' => $validated['name'],
            ]);

            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'success', 'message' => "Permission \"{$permission->name}\" berhasil diperbarui."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal memperbarui permission. ' . $e->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $this->repository->delete($id);

            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'success', 'message' => 'Permission berhasil dihapus.']);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.permissions.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menghapus permission. ' . $e->getMessage()]);
        }
    }
}
