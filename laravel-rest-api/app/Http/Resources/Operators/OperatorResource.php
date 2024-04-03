<?php

namespace App\Http\Resources\Operators;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OperatorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'association' => $this->association->name,
            'association_id' => $this->association->id,
            'role' => $this->role_name,
            'name' => $this->name,
            'status' => $this->status,
            'deleted_at' => $this->deleted_at,
            'created_at' => (string) $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => (string) $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
