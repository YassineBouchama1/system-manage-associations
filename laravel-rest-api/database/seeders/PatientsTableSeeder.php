<?php

namespace Database\Seeders;

use App\Models\Patient;
use Database\Factories\PatientFactory;
use Illuminate\Database\Seeder;

class PatientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        PatientFactory::times(50)->create();
    }
}
