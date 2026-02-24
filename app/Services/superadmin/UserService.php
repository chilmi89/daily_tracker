<?php

namespace App\Services\Superadmin;

interface UserService
{
    public function getAll();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function syncRoles(int $id, array $roles);
    public function syncPermissions(int $id, array $permissions);
}
