<?php

namespace App\Http\Resources\Patient;

use App\Models\Illness;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientXlsxResource extends JsonResource
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
        $result = [];

        // // Include selected columns
        // foreach ($selectedColumns as $column) {
        //     if (property_exists($this, $column)) {
        //         $result[$column] = $this->$column;
        //     }
        // }

        //return only columns thet user request
        in_array("id", $selectedColumns) &&  $result['id'] =  $this->id;
        in_array('illness', $selectedColumns) &&  $result['illness'] =  $illnessName;
        in_array("association", $selectedColumns) &&  $result['association'] = $this->association->name;
        in_array("first_name", $selectedColumns) &&  $result['first_name'] = $this->first_name;
        in_array("last_name", $selectedColumns) && $result['last_name'] =  $this->last_name;
        in_array("city", $selectedColumns) && $result['city'] = $this->city;
        in_array("current_address", $selectedColumns) &&  $result['current_address'] =  $this->current_address;
        in_array("phone", $selectedColumns) &&    $result['phone'] = $this->phone;
        in_array('avatar', $selectedColumns) && $result['avatar'] =  $imageUrl;
        in_array("status", $selectedColumns) &&   $result['status'] =  $this->status;
        in_array("date_of_birth", $selectedColumns) && $result['date_of_birth'] = $this->date_of_birth;
        in_array("deleted_at", $selectedColumns) && $result['deleted_at'] = $this->deleted_at;
        in_array('created_at', $selectedColumns) && $result['created_at'] =  (string) $this->created_at->format('Y-m-d H:i:s');
        in_array('updated_at', $selectedColumns) && $result['updated_at'] = (string) $this->updated_at->format('Y-m-d H:i:s');


        return $result;
    }
}
