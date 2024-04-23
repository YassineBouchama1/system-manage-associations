<?php

namespace App\Http\Resources\Patient;

use App\Models\Illness;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $imageUrl = asset('patients/' . $this->avatar);

        // get illness patient

        $illnessName = '';
        if ($this->association && $this->association->illness_id) {
            $illnessName =  Illness::withTrashed()->find($this->association->illness_id)->name;
        }

        $selectedColumnsString = $request->query('columns', '');
        $selectedColumns = !empty($selectedColumnsString) ? explode(',', $selectedColumnsString) : [];


        return [
            'id' => $this->id,
            'illness' => $illnessName,
            'association' => $this->association ? $this->association->name : null,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'city' => $this->city,
            'current_address' => $this->current_address,
            // 'birth_address' => $this->birth_address,
            'phone' => $this->phone,
            'avatar' => $imageUrl,
            'status' => $this->status,
            'date_of_birth' => $this->date_of_birth,
            'deleted_at' => $this->deleted_at,
            'created_at' => (string) $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => (string) $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
