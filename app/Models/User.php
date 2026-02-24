<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasRoles;

    protected $fillable = [
        'name',
        'email',
        'password',
        'employee_code',
        'position',
        'department_id',
        'manager_id',
        'join_date',
        'status',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
            'join_date'         => 'date',
        ];
    }

    /*
    |--------------------------------------------------------------------------
    | Relationships
    |--------------------------------------------------------------------------
    */

    /** Department user ini */
    public function department()
    {
        return $this->belongsTo(Department::class, 'department_id');
    }

    /** Manager (atasan) */
    public function manager()
    {
        return $this->belongsTo(User::class, 'manager_id');
    }

    /** Bawahan langsung */
    public function subordinates()
    {
        return $this->hasMany(User::class, 'manager_id');
    }

    /** Laporan harian milik user ini */
    public function dailyReports()
    {
        return $this->hasMany(DailyReport::class);
    }

    /** Task yang diberikan oleh user ini */
    public function assignedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_by');
    }

    /** Task yang diterima oleh user ini */
    public function receivedTasks()
    {
        return $this->hasMany(Task::class, 'assigned_to');
    }
}
