<?php

namespace App\Services\Superadmin;

use App\Repositories\Superadmin\RoleRepository;
use Illuminate\Support\Facades\Hash;

class RoleImpl implements Role
{
    public function __construct(
        protected RoleRepository $repository
    ) {}

    public function getAll()
    {
        return $this->repository->getAll();
    }

    public function findById(int $id)
    {
        return $this->repository->findById($id);
    }

    public function create(array $data)
    {
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
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

    public function syncPermissions(int $id, array $permissions)
    {
        return $this->repository->syncPermissions($id, $permissions);
    }
}