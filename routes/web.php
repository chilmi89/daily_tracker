<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Root redirect ke dashboard
Route::get('/', function () {
    return redirect('/dashboard');
});

// Dashboard
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

// Users
Route::get('/users', function () {
    return Inertia::render('Users/Index');
});

// Profile
Route::get('/profile', function () {
    return Inertia::render('Profile/Index');
});

// Settings
Route::get('/settings', function () {
    return Inertia::render('Settings/Index');
});

// Error pages (preview)
Route::get('/403', function () {
    return Inertia::render('Errors/403');
});
Route::get('/404', function () {
    return Inertia::render('Errors/404');
});
Route::get('/500', function () {
    return Inertia::render('Errors/500');
});
Route::get('/superadmin', function () {
    return Inertia::render('superadmin/Index');
});

// Authentication
Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::post('/logout', function (\Illuminate\Http\Request $request) {
    \Illuminate\Support\Facades\Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/login');
})->name('logout');
