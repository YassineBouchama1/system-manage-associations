<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;

class CreateUser
{
    public function __invoke(
        string $name,
        string $email,
        string $password,
        string $phone,
        string $role_id,
        ?string $association_id,
        string $status = 'active'

    ): User {
        $user = User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
            'phone'    => $phone,
            'role_id'    => $role_id,
            'association_id'    => $association_id,
            'status' => $status,

        ]);

        event(new Registered($user));

        return $user;
    }
}
