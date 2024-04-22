<?php

namespace App\Http\Resources\Association;

use App\Models\Illness;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AssociationResource extends JsonResource
{
    public function toArray($request)
    {

        // bring email admin association
        $admin = User::where('association_id', $this->id)
            ->where('role_id', '2')->first();

        // add frontend url to image
        $imageUrl = asset('associations/' . $this->logo);

        // get illness name for each association
        $illness = Illness::withTrashed()->find($this->illness_id)->name;

        // $illness = $this->illness ? $this->illness->name : null;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'address' => $this->address,
            'logo' => $imageUrl,
            'city' => $this->city,
            'illness_id' => $this->illness_id,
            'illness' =>  $illness,
            'email' => $admin ? $admin->email : null,
            'phone' =>  $admin ? $admin->phone : null,
            'status' => $this->status,
            'deleted_at' => $this->deleted_at,

            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
