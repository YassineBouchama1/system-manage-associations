<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->foreignId('association_id')->nullable()->constrained('associations')->onDelete('cascade');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('city');
            $table->string('current_address');
            // $table->string('birth_address');
            $table->string('phone');
            $table->string('avatar');
            $table->enum('status', ['active', 'inactive', 'deleted', 'dead'])->default('active'); // if driver auto inactive tell  add all
            $table->date('date_of_birth');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
