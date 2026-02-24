<?php

namespace App\Http\Controllers\superadmin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SuperadminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users'       => User::count(),
            'active_users'      => User::where('status', 'active')->orWhereNull('status')->count(),
            'inactive_users'    => User::where('status', 'inactive')->count(),
            'total_roles'       => Role::count(),
            'total_permissions' => Permission::count(),
            'server_load'       => '24%',
        ];

        // 1. User Growth Data (for Area Chart)
        $growthData = collect();
        for ($i = 9; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            $count = User::where('created_at', '<=', $date->endOfDay())->count();
            $growthData->push([
                'name' => $date->format('d/m'),
                'users' => $count,
            ]);
        }

        // 2. Statistical / "Candle" Data (for System Activity Volatility)
        // Since we don't have real load logs, we'll simulate realistic OHLC data
        $performanceData = collect();
        for ($i = 6; $i >= 0; $i--) {
            $date = Carbon::now()->subDays($i);
            
            // Randomly generate realistic load percentages
            $open = rand(15, 30);
            $close = rand(15, 30);
            $high = max($open, $close) + rand(5, 15);
            $low = max(5, min($open, $close) - rand(2, 8));

            $performanceData->push([
                'name' => $date->format('D'),
                'open' => $open,
                'close' => $close,
                'high' => $high,
                'low' => $low,
            ]);
        }

        // 3. Role Distribution Data (for Pie Chart)
        $roleDistribution = Role::withCount('users')->get()->map(function ($role) {
            return [
                'name' => $role->name,
                'value' => $role->users_count,
            ];
        });

        return Inertia::render('Superadmin/Index', [
            'stats' => $stats,
            'growthData' => $growthData,
            'performanceData' => $performanceData,
            'roleDistribution' => $roleDistribution,
        ]);
    }
}
