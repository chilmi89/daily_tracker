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
        $this->app->bind(
            \App\Repositories\Superadmin\UserRepository::class,
            \App\Repositories\Superadmin\UserRepositoryImpl::class,
        );

        $this->app->bind(
            \App\Services\Superadmin\UserService::class,
            \App\Services\Superadmin\UserServiceImpl::class,
        );
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
