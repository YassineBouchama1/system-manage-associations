<?php

namespace App\Http\Resources\Association;

use App\Models\Illness;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class AssociationXlsxResource extends JsonResource
{
    public function toArray($request)
    {

        // bring email admin association
        $admin = User::where('association_id', $this->id)
            ->where('role_id', '2')->first();

        // add frontend url to image
        $imageUrl = asset('associations/' . $this->logo);

        // get number of patients  for each association
        $patients_count = Patient::where('association_id', $this->id)->count();


        $selectedColumnsString = $request->query('columns', '');
        $selectedColumns = !empty($selectedColumnsString) ? explode(',', $selectedColumnsString) : [];
        $result = [];



        in_array("id", $selectedColumns) &&  $result['id'] =  $this->id;
        in_array('illness', $selectedColumns) &&  $result['illness'] =  $this->illness;
        in_array("name", $selectedColumns) &&  $result['name'] = $this->name;
        in_array("patients_count", $selectedColumns) &&  $result['patients_count'] = $patients_count;

        in_array("city", $selectedColumns) && $result['city'] = $this->city;

        in_array("address", $selectedColumns) &&  $result['address'] =  $this->address;
        in_array("phone", $selectedColumns) &&    $result['phone'] = $this->phone;
        in_array('logo', $selectedColumns) && $result['logo'] =  $imageUrl;
        in_array("status", $selectedColumns) &&   $result['status'] =  $this->status;
        in_array("email", $selectedColumns) && $result['email'] = $admin->email;
        in_array("deleted_at", $selectedColumns) && $result['deleted_at'] = $this->deleted_at;
        in_array('created_at', $selectedColumns) && $result['created_at'] =  (string) $this->created_at->format('Y-m-d H:i:s');
        in_array('updated_at', $selectedColumns) && $result['updated_at'] = (string) $this->updated_at->format('Y-m-d H:i:s');


        return $result;
    }
}
