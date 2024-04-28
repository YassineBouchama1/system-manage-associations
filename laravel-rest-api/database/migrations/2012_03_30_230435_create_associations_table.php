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
        Schema::create('associations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->text('address')->nullable();
            $table->string('logo');
            $table->string('city');
            $table->foreignId('illness_id')->constrained('illnesses')->cascadeOnDelete();;
            $table->enum('status', ['active', 'inactive', 'suspended', 'deleted'])->default('active'); // if driver auto inactive tell  add all
            $table->text('region');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('associations');
    }
};
