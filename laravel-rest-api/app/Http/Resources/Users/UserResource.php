<?php

namespace App\Http\Resources\Users;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;


class UserResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'name'              => $this->name,
            'email'             => $this->email,
            'role'             => $this->role_name,
            'role_id'             => $this->role_id,
            'email_verified_at' => $this->email_verified_at,
        ];
    }
}
