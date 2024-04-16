<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Generator as Faker;
use App\Models\Patient;

class PatientFactory extends Factory
{
    public function definition()
    {
        $dateOfBirth = $this->faker->dateTimeBetween('2024-02-25', '2024-04-10');
        $createdAt = $this->faker->dateTimeBetween($dateOfBirth, 'now');
        return [
            'association_id' => 2,
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'city' => $this->faker->city,
            'current_address' => $this->faker->address,
            'phone' => $this->faker->phoneNumber,
            'avatar' => $this->faker->imageUrl(),
            'status' => 'active',
            'date_of_birth' => $this->faker->dateTimeBetween('2000-02-25', '2020-04-10')->format('Y-m-d'),
            'created_at' => $createdAt->format('Y-m-d H:i:s'),
        ];
    }
}
