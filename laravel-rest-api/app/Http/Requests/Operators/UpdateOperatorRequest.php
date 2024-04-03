<?php

namespace App\Http\Requests\Operators;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UpdateOperatorRequest extends FormRequest
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
            'name' => 'nullable|string',
            'role_id' => 'nullable|exists:roles,id',
            'status' => 'in:active,inactive,suspended,deleted',

        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'role_id.exists' => 'The selected association does not exist.',
            'status.in' => 'The patient status must be one of active, inactive, suspended, or deleted.',
            'name.string' => 'The association name must be a string.',
        ];
    }
}
