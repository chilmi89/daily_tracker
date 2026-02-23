<?php

namespace App\Repositories\Superadmin;

use Spatie\Permission\Models\Permission;

class PermissionRepository
{
    public function __construct(
        protected Permission $model
    ) {}

    public function getAll()
    {
        return $this->model->latest()->get();
    }

    public function findById(int $id)
    {
        return $this->model->findOrFail($id);
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
}
