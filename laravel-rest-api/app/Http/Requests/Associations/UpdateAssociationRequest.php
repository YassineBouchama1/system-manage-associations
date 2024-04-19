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
        $associationsId = $this->route('association');
        // $association = Association::find($associationsId)->first();

        $rules = [
            'name' => 'nullable|string|unique:associations,name,' . $associationsId . ',id,deleted_at,NULL',
            // 'name' => 'nullable|string|unique:associations,name',
            'address' => 'nullable|string',
            'city' => 'nullable:method,PUT|string',
            'status' => 'nullable|in:active,inactive,suspended,deleted',
            'illness_id' => 'nullable|exists:illnesses,id',
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
            'logo.required' => 'The association logo is required if uploading a new image.',
            'logo.image' => 'The association logo must be a image.',
            'city.required_if' => 'The city is required when updating the association.',
            'city.string' => 'The city must be a string.',
            'status.in' => 'The association status must be one of active, inactive, suspended, or deleted.',
            'illness_id.exists' => 'The selected illness does not exist.',
        ];
    }
}
