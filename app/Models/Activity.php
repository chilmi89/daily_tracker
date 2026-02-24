<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    protected $fillable = [
        'daily_report_id',
        'category_id',
        'task_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'progress',
    ];

    public function dailyReport()
    {
        return $this->belongsTo(DailyReport::class);
    }

    public function category()
    {
        return $this->belongsTo(ActivityCategory::class, 'category_id');
    }

    public function task()
    {
        return $this->belongsTo(Task::class);
    }
}
