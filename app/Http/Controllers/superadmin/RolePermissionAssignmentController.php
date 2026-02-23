<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Services\Superadmin\Role as RoleService;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class RolePermissionAssignmentController extends Controller
{
    public function __construct(
        protected RoleService $roleService
    ) {}

    public function index()
    {
        return Inertia::render('Superadmin/Assignments/RolePermissions', [
            'roles' => $this->roleService->getAll(),
            'permissions' => Permission::all()
        ]);
    }

    public function update(Request $request, int $roleId)
    {
        $validated = $request->validate([
            'permissions' => ['required', 'array'],
            'permissions.*' => ['string', 'exists:permissions,name'],
        ]);

        try {
            $role = $this->roleService->findById($roleId);
            $this->roleService->syncPermissions($roleId, $validated['permissions']);

            return redirect()->back()
                ->with('toast', [
                    'type' => 'success', 
                    'message' => "Hak akses berhasil diperbarui untuk role \"{$role->name}\"."
                ]);
        } catch (Throwable $e) {
            return redirect()->back()
                ->with('toast', [
                    'type' => 'error', 
                    'message' => 'Gagal memperbarui hak akses: ' . $e->getMessage()
                ]);
        }
    }
}
