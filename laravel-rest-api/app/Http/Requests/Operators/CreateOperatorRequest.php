<?php

namespace App\Http\Requests\Operators;

use App\Models\Patient;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class CreateOperatorRequest extends FormRequest
{


    public function authorize()
    {
        return Auth::check();
    }
    public function rules()
    {

        $rules = [
            'name'     => 'required', 'string', 'max:255',
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => 'required', 'confirmed', Rules\Password::defaults(),
            'phone' => 'required', 'phone',
            'association_id' => 'nullable|exists:associations,id',
            'role_id' => 'required|exists:roles,id',
            'status' => 'in:active,inactive,suspended,deleted',

        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'association_id.exists' => 'The selected association does not exist.',
            'role_id.exists' => 'The selected association does not exist.',
            'status.in' => 'The patient status must be one of active, inactive, suspended, or deleted.',
            'name.string' => 'The association name must be a string.',
        ];
    }
}
