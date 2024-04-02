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
        // creating the association
        $association = $createAssociation(
            $request->input('name'),
            $request->input('address'),
            $request->input('logo'),
            $request->input('city'),
            $request->input('illness_id'),
            $request->input('status', 'active') // default status is 'active' if not provided
        );

        //chekc if association created



        // chheck if email is provided
        //create admin association for association
        if ($request->has('email') & $association) {
            // Creating the user
            $user = $createUser(
                $request->input('name'),
                $request->input('email'),
                $request->input('password'),
                $request->input('phone'),
                'admin association',
                $association->id
            );

            //chekc if user created
        }

        return response()->json(['association' => new AssociationResource($association)], 201);
    }
}
