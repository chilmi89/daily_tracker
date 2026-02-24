<?php

namespace App\Services\Superadmin;

use App\Models\User;
use App\Repositories\Superadmin\UserRepository;
use Illuminate\Support\Facades\Hash;

class UserServiceImpl implements UserService
{
    public function __construct(
        protected UserRepository $repository
    ) {}

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function findById(int $id)
    {
        return $this->repository->findById($id);
    }

    /**
     * Generate unique employee code: EMP-001, EMP-002, ...
     * Finds the highest existing number and increments by 1.
     */
    protected function generateEmployeeCode(): string
    {
        $prefix = 'EMP';

        // Ambil semua kode yg sesuai pola EMP-NNN, lalu cari nomor tertinggi
        $last = User::where('employee_code', 'LIKE', "{$prefix}-%")
            ->orderByRaw("CAST(SUBSTRING(employee_code, " . (strlen($prefix) + 2) . ") AS UNSIGNED) DESC")
            ->value('employee_code');

        $nextNumber = 1;

        if ($last) {
            $parts = explode('-', $last);
            $lastNumber = (int) end($parts);
            $nextNumber = $lastNumber + 1;
        }

        return $prefix . '-' . str_pad($nextNumber, 3, '0', STR_PAD_LEFT);
    }

    public function create(array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        // Auto-generate employee_code jika dikosongkan
        if (empty($data['employee_code'])) {
            $data['employee_code'] = $this->generateEmployeeCode();
        }

        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        return $this->repository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }

    public function syncRoles(int $id, array $roles)
    {
        $user = $this->repository->findById($id);
        return $user->syncRoles($roles);
    }

    public function syncPermissions(int $id, array $permissions)
    {
        return $this->repository->syncPermissions($id, $permissions);
    }
}
