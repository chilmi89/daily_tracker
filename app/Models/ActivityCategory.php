<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivityCategory extends Model
{
    protected $fillable = ['name', 'description'];

    public function activities()
    {
        return $this->hasMany(Activity::class, 'category_id');
    }
}
