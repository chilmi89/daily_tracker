<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Throwable;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::withCount('users')
            ->latest()
            ->get();

        return Inertia::render('Superadmin/Departments/Index', [
            'departments' => $departments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:100', 'unique:departments,name'],
            'code'        => ['nullable', 'string', 'max:20', 'unique:departments,code'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active'   => ['boolean'],
        ]);

        try {
            $dept = Department::create($validated);

            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'success', 'message' => "Departemen \"{$dept->name}\" berhasil ditambahkan."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menambahkan departemen. ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name'        => ['required', 'string', 'max:100', "unique:departments,name,{$department->id}"],
            'code'        => ['nullable', 'string', 'max:20', "unique:departments,code,{$department->id}"],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active'   => ['boolean'],
        ]);

        try {
            $department->update($validated);

            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'success', 'message' => "Departemen \"{$department->name}\" berhasil diperbarui."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal memperbarui departemen. ' . $e->getMessage()]);
        }
    }

    public function destroy(Department $department)
    {
        try {
            $name = $department->name;
            $department->delete();

            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'success', 'message' => "Departemen \"{$name}\" berhasil dihapus."]);
        } catch (Throwable $e) {
            return redirect()->route('superadmin.departments.index')
                ->with('toast', ['type' => 'error', 'message' => 'Gagal menghapus departemen. ' . $e->getMessage()]);
        }
    }
}
