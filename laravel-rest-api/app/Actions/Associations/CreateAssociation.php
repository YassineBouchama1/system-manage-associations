<?php

namespace App\Actions\Associations;

use App\Models\Association;


class CreateAssociation
{
    public function __invoke(
        string $name,
        ?string $address,
        string $logo,
        string $city,
        int $illness_id,
        string $status = 'active'
    ): Association {
        $association = Association::create([
            'name' => $name,
            'address' => $address,
            'logo' => $logo,
            'city' => $city,
            'illness_id' => $illness_id,
            'status' => $status,
        ]);



        return $association;
    }
}
