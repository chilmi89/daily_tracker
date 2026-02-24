<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $bindings = [
            // Repositories - langsung bind classnya
            \App\Repositories\Superadmin\UserRepository::class,
            \App\Repositories\Superadmin\RoleRepository::class,
            \App\Repositories\Superadmin\PermissionRepository::class,
            \App\Repositories\Superadmin\TaskRepository::class,

            // Services - tetap pakai interface + implementation
            \App\Services\Superadmin\UserService::class => \App\Services\Superadmin\UserServiceImpl::class,
            \App\Services\Superadmin\Role::class        => \App\Services\Superadmin\RoleImpl::class,
            \App\Services\Superadmin\TaskService::class => \App\Services\Superadmin\TaskServiceImpl::class,
        ];

        foreach ($bindings as $key => $value) {
            if (is_int($key)) {
                // Auto-binding untuk repository
                $this->app->singleton($value);
            } else {
                // Manual binding untuk service (interface => implementation)
                $this->app->bind($key, $value);
            }
        }
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Implicitly grant "superadmin" role all permissions
        // This works even if permissions are not explicitly assigned to the role
        \Illuminate\Support\Facades\Gate::before(function ($user, $ability) {
            return $user->hasRole('superadmin') ? true : null;
        });
    }
}
