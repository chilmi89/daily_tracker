<?php

namespace App\Services\Superadmin;

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
