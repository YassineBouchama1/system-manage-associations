<?php

namespace App\Http\Requests\Associations;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreateIllnessRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }


    public function rules()
    {
        $rules = [
            'name' => 'required|string|unique:associations,name', // Base rule for name
        ];


        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'The association name is required (on creation).',
            'name.string' => 'The association name must be a string.',
            'name.unique' => 'The association name must be unique.',

        ];
    }
}
