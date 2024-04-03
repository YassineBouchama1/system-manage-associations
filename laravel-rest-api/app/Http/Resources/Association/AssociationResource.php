<?php

namespace App\Http\Resources\Association;

use Illuminate\Http\Resources\Json\JsonResource;

class AssociationResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'logo' => $this->logo,
            'city' => $this->city,
            'illness_id' => $this->illness_id,
            'status' => $this->status,
            'deleted_at' => $this->deleted_at,

            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
