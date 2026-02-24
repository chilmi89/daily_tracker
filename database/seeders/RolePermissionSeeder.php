<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cache (WAJIB di Spatie)
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        /*
        |--------------------------------------------------------------------------
        | 1. Define Permissions (MVP Base)
        |--------------------------------------------------------------------------
        */

        $permissions = [

            // Core System
            'dashboard.view',
            'settings.view',
            'settings.edit',

            // RBAC Management
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

            // Monitoring & Reports
            'monitoring.view',
            'report.export',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        /*
        |--------------------------------------------------------------------------
        | 2. Superadmin Role (Full Access)
        |--------------------------------------------------------------------------
        */

        $superadmin = Role::firstOrCreate(['name' => 'superadmin']);

        // Superadmin = semua permission
        $superadmin->syncPermissions(Permission::all());
    }
}
