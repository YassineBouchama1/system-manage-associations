<?php

namespace App\Http\Requests\Associations;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateAssociationRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }


    public function rules()
    {
        $rules = [
            'name' => 'required|string|unique:associations,name', // Base rule for name
            'address' => 'required|string',
            'logo' => 'required|string', // Logo can be updated
            'city' => 'required|string', // City remains required
            'status' => 'in:active,inactive,suspended,deleted', // Status can be updated
            'illness_id' => 'required|exists:illnesses,id', // Illness ID can be updated
        ];


        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'The association name is required (on creation).',
            'name.string' => 'The association name must be a string.',
            'name.unique' => 'The association name must be unique.',
            'address.string' => 'The address must be a string.',
            'logo.string' => 'The association logo must be a string (URL or path).',
            'city.required' => 'The city is required.',
            'city.string' => 'The city must be a string.',
            'status.in' => 'The association status must be one of active, inactive, suspended, or deleted.',
            'illness_id.exists' => 'The selected illness does not exist.',
        ];
    }
}
