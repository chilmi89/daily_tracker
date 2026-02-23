<?php

namespace App\Repositories\Superadmin;

use Spatie\Permission\Models\Role;

class RoleRepository
{
    public function __construct(
        protected Role $model
    ) {}

    public function getAll()
    {
        return $this->model->with('permissions')->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->with('permissions')->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $model = $this->findById($id);
        $model->update($data);
        return $model->fresh();
    }

    public function delete(int $id)
    {
        $model = $this->findById($id);
        return $model->delete();
    }

    public function paginate(int $perPage = 15)
    {
        return $this->model->latest()->paginate($perPage);
    }

    public function syncPermissions(int $id, array $permissions)
    {
        $role = $this->findById($id);
        return $role->syncPermissions($permissions);
    }
}
