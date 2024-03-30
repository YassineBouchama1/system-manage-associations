<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->foreignId('role_id')->constrained('roles')->cascadeOnDelete();
            $table->foreignId('association_id')->nullable()->constrained('associations')->onDelete('cascade');

            $table->string('phone')->nullable();
            $table->timestamp('last_online_at')->nullable(); // updated when driver logout
            $table->enum('status', ['active', 'inactive', 'suspended', 'deleted'])->default('active'); // if driver auto inactive tell  add all
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
            // $table->string('profile_photo')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
