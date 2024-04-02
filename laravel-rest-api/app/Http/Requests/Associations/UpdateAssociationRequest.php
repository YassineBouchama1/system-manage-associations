<?php

namespace App\Http\Requests\Associations;

use App\Models\Association;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UpdateAssociationRequest extends FormRequest
{


    public function authorize()
    {
        return Auth::check();
    }
    public function rules()
    {
        $rules = [
            'name' => 'nullable|string|unique:associations,name', // Optional name with unique check
            'address' => 'nullable|string',  // Address can be updated
            'logo' => 'nullable|string', // Logo can be updated
            'city' => 'required_if:method,PUT|string', // Required only on PUT (update)
            'status' => 'nullable|in:active,inactive,suspended,deleted', // Status can be updated
            'illness_id' => 'nullable|exists:illnesses,id', // Illness ID can be updated
        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'name.required' => 'The association name is required on update.', // Adjusted message
            'name.string' => 'The association name must be a string.',
            'name.unique' => 'The association name must be unique.',
            'address.string' => 'The address must be a string.',
            'logo.string' => 'The association logo must be a string (URL or path).',
            'city.required_if' => 'The city is required when updating the association.',
            'city.string' => 'The city must be a string.',
            'status.in' => 'The association status must be one of active, inactive, suspended, or deleted.',
            'illness_id.exists' => 'The selected illness does not exist.',
        ];
    }

    // protected function prepareForValidation()
    // {
    //     if ($this->method() === 'PUT') {
    //         // Retrieve the association being updated (if possible)
    //         $this->association = Association::find($this->route('id'));

    //         // Check if association was found
    //         if (!$this->association) {
    //             // Handle case where association is not found (optional)
    //         }
    //     }

    //     return parent::prepareForValidation();
    // }
}
