<?php

namespace App\Http\Requests\TimeLines;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class TimeLineRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'description' => 'required|string',
            // 'responsable_id' => 'required|exists:users,id',
            'patient_id' => 'required:exists:patients,id',
            'file' => 'nullable|file|max:2048',
        ];
    }

    public function messages()
    {
        return [
            'description.required' => 'The  description is required on update.',
            'description.string' => 'The  description must be a string.',
            'patient_id.exists' => 'The selected patient_id does not exist.',
            'responsable_id.exists' => 'The selected responsable_id does not exist.',
        ];
    }
}
