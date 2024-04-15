<?php

namespace App\Http\Requests\Patients;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class CreatePatientRequest extends FormRequest
{
    public function authorize()
    {
        // Adjust authorization logic as needed for patient creation
        // (e.g., check user roles or permissions)
        return Auth::check(); // Placeholder for authorization checks
    }

    public function rules()
    {
        $rules = [
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust allowed types and size limits as needed
            // 'association_id' => 'required|exists:associations,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'city' => 'nullable|string', // City is optional
            'current_address' => 'required|string',
            // 'birth_address' => 'nullable|string',
            'phone' => 'nullable|string', // Phone number is optional
            'status' => 'in:active,inactive,deleted', 'dead', // Same status options as associations
            'date_of_birth' => 'required|date',

        ];

        return $rules;
    }

    public function messages()
    {
        return [
            'avatar.required' => 'The association avatar is required if uploading a new image.',
            'avatar.image' => 'The association avatar must be a image.',
            'association_id.exists' => 'The selected association does not exist.',
            'first_name.required' => 'The patient\'s first name is required.',
            'first_name.string' => 'The first name must be a string.',
            'first_name.max' => 'The first name must be no more than 255 characters.',
            'last_name.required' => 'The patient\'s last name is required.',
            'last_name.string' => 'The last name must be a string.',
            'last_name.max' => 'The last name must be no more than 255 characters.',
            'city.string' => 'The city must be a string.',
            'current_address.required' => 'The patient\'s current address is required.',
            'current_address.string' => 'The current address must be a string.',
            'birth_address.string' => 'The birth address must be a string.',
            'phone.string' => 'The phone number must be a string.',
            'status.in' => 'The patient status must be one of active, inactive, suspended, or deleted.',
            'date_of_birth.required' => 'The patient\'s date of birth is required.',
            'date_of_birth.date' => 'The date of birth must be a valid date.',
        ];
    }
}
