<?php

namespace App\Repositories\Superadmin;

use App\Models\Task;

class TaskRepository
{
    public function __construct(
        protected Task $model
    ) {}

    /** Kolom relasi yang selalu di-eager load */
    private const WITH = ['assigner:id,name,employee_code', 'assignee:id,name,employee_code'];

    public function getAll()
    {
        return $this->model
            ->with(self::WITH)
            ->latest()
            ->get();
    }

    public function findById(int $id)
    {
        return $this->model
            ->with(self::WITH)
            ->findOrFail($id);
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
        return $this->model
            ->with(self::WITH)
            ->latest()
            ->paginate($perPage);
    }
}