<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\superadmin\UserController as SuperadminUserController;
use App\Http\Controllers\Auth\AuthController;

// Root redirect
Route::get('/', function () {
    return redirect()->route('login');
});

// Protected Routes
Route::middleware('auth')->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');

    // Users (General)
    Route::get('/users', function () {
        return view('users.index');
    })->name('users.index');

    // Profile
    Route::get('/profile', function () {
        return view('profile.index');
    })->name('profile');

    // Settings
    Route::get('/settings', function () {
        return view('settings.index');
    })->name('settings');

    // Superadmin Area
    Route::prefix('superadmin')
        ->name('superadmin.')
        ->middleware('role:superadmin')
        ->group(function () {
            Route::get('/', function () {
                return view('superadmin.index');
            })->name('index');

            Route::resource('users', SuperadminUserController::class);
        });
});

// Authentication
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [AuthController::class, 'authenticate']);
});

Route::post('/logout', [AuthController::class, 'logout'])->name('logout')->middleware('auth');
