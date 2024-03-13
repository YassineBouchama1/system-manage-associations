<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class CreateUser
{
    public function __invoke(
        string $name,
        string $email,
        string $password,
    ): User {
        $user = User::create([
            'name'     => $name,
            'email'    => $email,
            'password' => Hash::make($password),
        ]);

        //assign role & permissions
        $superAdmin = Role::findByName('super admin');
        $user->assignRole($superAdmin);


        event(new Registered($user));

        return $user;
    }
}
