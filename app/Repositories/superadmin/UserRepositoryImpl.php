<?php

namespace App\Repositories\Superadmin;

use App\Models\User;

class UserRepositoryImpl implements UserRepository
{
    public function __construct(
        protected User $model
    ) {}

    public function getAll()
    {
        return $this->model->with('roles')->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->with('roles')->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $user = $this->findById($id);
        $user->update($data);
        return $user->fresh('roles');
    }

    public function delete(int $id)
    {
        $user = $this->findById($id);
        return $user->delete();
    }
}
