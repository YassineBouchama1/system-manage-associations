<?php

namespace App\Http\Controllers;

use App\Actions\Associations\CreateAssociation;
use App\Actions\Users\CreateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Associations\CreateAssociationRequest;
use App\Http\Resources\AssociationResource;
use Illuminate\Http\JsonResponse;

class AssociationController extends Controller
{
    public function store(CreateAssociationRequest $request, CreateAssociation $createAssociation, CreateUser $createUser): JsonResponse
    {
        // Creating the association
        $association = $createAssociation(
            $request->input('name'),
            $request->input('address'),
            $request->input('logo'),
            $request->input('city'),
            $request->input('illness_id'),
            $request->input('status', 'active') // default status is 'active' if not provided
        );

        // Check if email is provided
        if ($request->has('email') & $association) {
            // Creating the user
            $user = $createUser(
                $request->input('name'),
                $request->input('email'),
                $request->input('password'),
                $request->input('phone'),
                $role_id = 'operator',
                $association->id
            );

            // Additional logic if needed
        }

        return response()->json(['association' => new AssociationResource($association)], 201);
    }
}
