<?php

namespace App\Services\Superadmin;

use App\Repositories\Superadmin\TaskRepository;

class TaskServiceImpl implements TaskService
{
    public function __construct(
        protected TaskRepository $repository
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
        return $this->repository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->repository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->repository->delete($id);
    }
}