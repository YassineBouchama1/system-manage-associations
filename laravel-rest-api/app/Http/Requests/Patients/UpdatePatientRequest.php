<?php

namespace App\Http\Requests\Patients;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UpdatePatientRequest extends FormRequest
{


    public function authorize()
    {
        return Auth::check();
    }
    public function rules()
    {
        // $PatientsId = $this->route('Patient');
        // 'name' => 'nullable|string|unique:Patients,name,' . $PatientsId . ',id,deleted_at,NULL',

        $rules = [
            'association_id' => 'nullable|exists:associations,id',
            'first_name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'city' => 'nullable|string',
            'current_address' => 'nullable|string',
            'birth_address' => 'nullable|string',
            'phone' => 'nullable|string',
            'status' => 'in:active,inactive,suspended,deleted',
            'date_of_birth' => 'nullable|date',
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'association_id.exists' => 'The selected association does not exist.',
            'first_name.string' => 'The first name must be a string.',
            'first_name.max' => 'The first name must be no more than 255 characters.',
            'last_name.string' => 'The last name must be a string.',
            'last_name.max' => 'The last name must be no more than 255 characters.',
            'city.string' => 'The city must be a string.',
            'current_address.string' => 'The current address must be a string.',
            'birth_address.string' => 'The birth address must be a string.',
            'phone.string' => 'The phone number must be a string.',
            'status.in' => 'The patient status must be one of active, inactive, suspended, or deleted.',
            'date_of_birth.date' => 'The date of birth must be a valid date.',
        ];
    }
}
