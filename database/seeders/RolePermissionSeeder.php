<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // 1. Define Permissions
        $permissions = [
            // Core System
            'dashboard.view',
            'settings.view',
            'settings.edit',
            
            // RBAC Management (Superadmin Only)
            'roles.view',
            'roles.create',
            'roles.edit',
            'roles.delete',
            'permissions.view',
            'permissions.create',
            'permissions.edit',
            'permissions.delete',
            'users.assign-role',
            'roles.assign-permission',
            
            // User Management
            'users.view',
            'users.create',
            'users.edit',
            'users.delete',

            // Daily Tracker - Activities
            'activity.view',
            'activity.create',
            'activity.edit',
            'activity.delete',

            // Daily Tracker - Monitoring
            'monitoring.view',
            'report.export',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 2. Create Roles and Assign Permissions

        // --- Role Admin (Supervisor / Manager) ---
        $roleAdmin = Role::firstOrCreate(['name' => 'admin']);
        $roleAdmin->syncPermissions([
            'dashboard.view',
            'users.view',
            'users.create',
            'users.edit',
            'activity.view',
            'activity.create',
            'activity.edit',
            'activity.delete',
            'monitoring.view',
            'report.export',
        ]);

        // --- Role Superadmin (System Owner) ---
        $roleSuperAdmin = Role::firstOrCreate(['name' => 'superadmin']);
        // Superadmin gets everything
        $roleSuperAdmin->syncPermissions(Permission::all());
    }
}
