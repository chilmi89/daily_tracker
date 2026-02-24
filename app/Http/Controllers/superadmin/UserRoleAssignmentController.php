<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Services\Superadmin\UserService;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class UserRoleAssignmentController extends Controller
{
    public function __construct(
        protected UserService $userService
    ) {}

    public function index()
    {
        return Inertia::render('Superadmin/Assignments/UserRoles', [
            'users' => $this->userService->getAll(),
            'roles' => Role::all()
        ]);
    }

    public function update(Request $request, int $userId)
    {
        $validated = $request->validate([
            'roles' => ['required', 'array'],
            'roles.*' => ['string', 'exists:roles,name'],
        ]);

        try {
            $user = $this->userService->findById($userId);
            $this->userService->syncRoles($userId, $validated['roles']);

            return redirect()->back()
                ->with('toast', [
                    'type' => 'success', 
                    'message' => "Role berhasil diperbarui untuk pengguna \"{$user->name}\"."
                ]);
        } catch (Throwable $e) {
            return redirect()->back()
                ->with('toast', [
                    'type' => 'error', 
                    'message' => 'Gagal memperbarui role: ' . $e->getMessage()
                ]);
        }
    }
}
