<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * Mengganti kolom `department` (VARCHAR) di tabel users
     * menjadi `department_id` (FK → departments.id).
     */
    public function up(): void
    {
        // 1. Tambah kolom department_id (nullable dulu agar data lama tidak error)
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('department_id')
                  ->nullable()
                  ->after('position')
                  ->constrained('departments')
                  ->nullOnDelete();
        });

        // 2. Migrasi data lama: cocokkan nama department (string) ke departments.id
        //    Jika nama tidak cocok, department_id dibiarkan NULL.
        DB::statement("
            UPDATE users u
            JOIN departments d ON LOWER(TRIM(d.name)) = LOWER(TRIM(u.department))
            SET u.department_id = d.id
        ");

        // 3. Hapus kolom lama
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('department');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Kembalikan kolom string lama
            $table->string('department', 100)->nullable()->after('position');
        });

        // Kembalikan data dari relasi ke string
        DB::statement("
            UPDATE users u
            JOIN departments d ON d.id = u.department_id
            SET u.department = d.name
        ");

        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign(['department_id']);
            $table->dropColumn('department_id');
        });
    }
};
