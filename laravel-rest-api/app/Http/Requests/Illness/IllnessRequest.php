<?php

namespace App\Http\Requests\Illness;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class IllnessRequest extends FormRequest
{

    public function authorize()
    {
        return Auth::check();
    }


    public function rules()
    {
        return [
            'name' => 'required|string|unique:illnesses,name' . ($this->method() === 'PUT' ? ',' . $this->illness->id : ''), // Unique rule with exception for update
        ];
    }


    public function messages()
    {
        return [
            'name.required' => 'The illness name is required.',
            'name.string' => 'The illness name must be a string.',
            'name.unique' => 'The illness name must be unique.',
        ];
    }
}
