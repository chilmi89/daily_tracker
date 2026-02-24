<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Services\Superadmin\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SuperTaskController extends Controller
{
    public function __construct(protected TaskService $taskService) {}

    /* ─────────────────────────────────────────────
     | GET /superadmin/tasks
     ───────────────────────────────────────────── */
    public function index()
    {
        // Eager load assigner & assignee agar tidak N+1 di frontend
        $tasks = $this->taskService->getAll();

        // Hanya tampilkan user aktif sebagai pilihan assignee
        $users = User::where('status', 'active')
            ->orderBy('name')
            ->get(['id', 'name', 'employee_code']);

        return Inertia::render('Superadmin/Tasks/Index', [
            'tasks' => $tasks,
            'users' => $users,
        ]);
    }

    /* ─────────────────────────────────────────────
     | POST /superadmin/tasks
     ───────────────────────────────────────────── */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'assigned_to' => ['required', 'integer', 'exists:users,id'],
            'priority'    => ['required', 'in:low,medium,high'],
            'status'      => ['required', 'in:pending,in_progress,completed'],
            'due_date'    => ['nullable', 'date', 'after_or_equal:today'],
        ]);

        // assigned_by selalu diambil dari user yang sedang login,
        // bukan dari request — mencegah user memalsukan pemberi tugas
        $validated['assigned_by'] = auth()->id();

        $task = $this->taskService->create($validated);

        return redirect()->route('superadmin.tasks.index')
            ->with('toast', [
                'type'    => 'success',
                'message' => "Task \"{$task->title}\" berhasil dibuat.",
            ]);
    }

    /* ─────────────────────────────────────────────
     | PUT /superadmin/tasks/{task}
     ───────────────────────────────────────────── */
    public function update(Request $request, int $id)
    {
        $validated = $request->validate([
            'title'       => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'assigned_to' => ['required', 'integer', 'exists:users,id'],
            'priority'    => ['required', 'in:low,medium,high'],
            'status'      => ['required', 'in:pending,in_progress,completed'],
            'due_date'    => ['nullable', 'date'],
        ]);

        // ✅ FIX: assigned_by TIDAK boleh diubah saat update.
        // Hapus dari payload agar tidak ter-overwrite via mass assignment.
        unset($validated['assigned_by']);

        $task = $this->taskService->update($id, $validated);

        return redirect()->route('superadmin.tasks.index')
            ->with('toast', [
                'type'    => 'success',
                'message' => "Task \"{$task->title}\" berhasil diperbarui.",
            ]);
    }

    /* ─────────────────────────────────────────────
     | DELETE /superadmin/tasks/{task}
     ───────────────────────────────────────────── */
    public function destroy(int $id)
    {
        // Ambil dulu title sebelum dihapus untuk pesan flash
        $task  = $this->taskService->findById($id);
        $title = $task->title;

        $this->taskService->delete($id);

        return redirect()->route('superadmin.tasks.index')
            ->with('toast', [
                'type'    => 'success',
                'message' => "Task \"{$title}\" berhasil dihapus.",
            ]);
    }
}
