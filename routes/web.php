<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\superadmin\UserController as SuperadminUserController;
use App\Http\Controllers\superadmin\RoleController as SuperadminRoleController;
use App\Http\Controllers\Auth\AuthController;

// Root Redirect
Route::get('/', function () {
    return redirect()->route('login');
});

// Protected Routes
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Users (General)
    Route::get('/users', function () {
        return Inertia::render('Users/Index');
    })->name('users.index');

    // Profile
    Route::get('/profile', function () {
        return Inertia::render('Profile/Index');
    })->name('profile');

    // Settings
    Route::get('/settings', function () {
        return Inertia::render('Settings/Index');
    })->name('settings');

        // Superadmin Area
    Route::prefix('superadmin')
        ->name('superadmin.')
        ->middleware('role:superadmin')
        ->group(function () {
            Route::get('/', [\App\Http\Controllers\superadmin\SuperadminDashboardController::class, 'index'])->name('index');

            Route::resource('users', SuperadminUserController::class);
            
            Route::resource('roles', SuperadminRoleController::class)->except(['create', 'edit', 'show']);

            // Decoupled Assignments
            Route::prefix('assignments')->name('assignments.')->group(function () {
                Route::get('user-roles', [App\Http\Controllers\superadmin\UserRoleAssignmentController::class, 'index'])->name('users.index');
                Route::put('user-roles/{user}', [App\Http\Controllers\superadmin\UserRoleAssignmentController::class, 'update'])->name('users.update');
                
                Route::get('role-permissions', [App\Http\Controllers\superadmin\RolePermissionAssignmentController::class, 'index'])->name('roles.index');
                Route::put('role-permissions/{role}', [App\Http\Controllers\superadmin\RolePermissionAssignmentController::class, 'update'])->name('roles.update');
            });
            Route::resource('permissions', \App\Http\Controllers\superadmin\PermissionController::class)->except(['create', 'edit', 'show']);
            Route::resource('departments', \App\Http\Controllers\superadmin\DepartmentController::class)->except(['create', 'edit', 'show']);
        });

    // Admin Area
    Route::prefix('admin')
        ->name('admin.')
        ->middleware('role:admin')
        ->group(function () {
            Route::get('/', [\App\Http\Controllers\admin\AdminDashboardController::class, 'index'])->name('index');
        });
});

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');
