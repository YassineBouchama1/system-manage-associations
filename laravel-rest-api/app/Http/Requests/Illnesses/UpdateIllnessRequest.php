<?php

namespace App\Http\Requests\Illnesses;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateIllnessRequest extends FormRequest
{
    public function authorize()
    {
        return Auth::check();
    }


    public function rules()
    {
        $illnessId = $this->route('illness');

        $rules = [
            // Exclude the soft-deleted record for uniqueness check
            'name' => 'nullable|string|unique:associations,name,' . $illnessId . ',id,deleted_at,NULL',
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
