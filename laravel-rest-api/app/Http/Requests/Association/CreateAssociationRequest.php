<?php

namespace App\Http\Requests\Associations;

use Illuminate\Foundation\Http\FormRequest;

class CreateAssociationRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'address' => ['nullable', 'string'],
            'logo' => ['required', 'string'],
            'city' => ['required', 'string'],
            'illness_id' => ['required', 'exists:illnesses,id'],
            'status' => ['nullable', 'string', 'in:active,inactive,suspended,deleted'],
        ];
    }
}
