<?php

namespace App\Http\Resources\TimeLines;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TimeLineResource extends JsonResource
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
            'description' => $this->description,
            'patient_id' => $this->patient_id,
            'responsible' => $this->responsable,
            'file' => $this->file_url ? asset('TimeLine/' . $this->patient_id . '/' . $this->file_url) : null,
            'time' => $this->created_at->format('Y-m-d'),
        ];
    }
}
