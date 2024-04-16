<?php

namespace App\Http\Controllers;


use App\Actions\Users\CreateUser;
use App\Http\Controllers\Controller;

use App\Http\Requests\Associations\CreateAssociationRequest;
use App\Http\Requests\Associations\UpdateAssociationRequest;
use App\Http\Resources\Association\AssociationResource;

use App\Models\Association;
use App\Models\Illness;
use App\Models\User;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssociationController extends Controller
{

    public function index(Request $request) // Use Request for potential filtering
    {


        // if ($request->user()->cannot('viewAny')) {
        //     return response()->json(['message' => 'no allowed to show all association   '], 403);
        // }

        // $associations = Association::query();
        $associations = Association::withTrashed()->latest();

        // Filter by search query (if applicable)
        $searchTerm = $request->query('q');
        $perPage = $request->query('per_page', 10); // Default per page results (optional)
        // Limit maximum per page
        $perPage = min($perPage, 30);

        if ($searchTerm) {
            $associations->where('name', 'like', "%{$searchTerm}%");
        }

        // Pagination
        $associations = $associations->paginate($perPage);
        $totalPages = $associations->lastPage();
        $currentPage = $associations->currentPage();


        //Chekc if there is no data send empty array
        // if ($associations->isEmpty()) {
        //     return response()->json([], 200); // No content
        // }


        return response()->json([
            'data' => AssociationResource::collection($associations),
            'total_pages' => $totalPages,
            'current_page' => $currentPage,
        ], 200);
    }


    public function store(CreateAssociationRequest $request, CreateUser $createUser): JsonResponse
    {





        // Check authorization
        if ($request->user()->cannot('create', Association::class)) {
            return response()->json(['message' => 'no allowed to create '], 403);
        }

        $illnessIsDeleted = Illness::find($request->illness_id);

        if (!$illnessIsDeleted) {
            return response()->json(['message' => 'illness You Fill is deleted '], 500);
        }

        // Handle image upload (before creating association)
        $image = $request->file('logo');

        $associationData = $request->validated();

        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('associations'), $imageName);



        $associationData['logo'] = $imageName; // Add logo data



        $association = Association::create($associationData);

        // Check if association creation was successful
        if (!$association) {
            return response()->json(['message' => 'Failed to create association'], 500);
        }

        // If email provided, create user
        if ($request->filled('email')) {

            // Validate email format if provided (optional)
            $validator = Validator::make($request->only('email', 'role_id', 'phone', 'password', 'nameAdmin'), [
                'email' => 'required|email|unique:users,email',
                'role_id' => 'required|exists:roles,id',
                'phone' => 'required|string',
                'password' => 'required|string',
                'nameAdmin' => 'required|string',


            ]);
            if ($validator->fails()) {
                // if user not created delete assosication
                $association->forceDelete();
                return response()->json([
                    'message' => $validator->errors()->first(),
                    $validator->errors()
                ], 422);
            }


            $user = $createUser(
                $request->input('nameAdmin'),
                $request->input('email'),
                $request->input('password'),
                $request->input('phone'),
                $request->input('role_id'),
                $association->id
            );

            // if user not created delete assosication
            if (!$user) {
                $association->forceDelete();
                return response()->json(['message' => 'Association created but user not provided. Association permanently deleted.'], 401);
            }
        }

        return response()->json(['message' => 'Created Successfully'], 201); // Created
    }



    public function update(UpdateAssociationRequest $request, $id)
    {
        // Validate ID and association existence
        if (!$id) {
            return response()->json(['message' => 'id not found'], 404);
        }

        $association = Association::find($id);

        if (!$association) {
            return response()->json(['message' => 'Association not found'], 404);
        }

        // Check authorization (assuming implemented)
        if ($request->user()->cannot('update', $association)) {
            return response()->json(['message' => 'You are not authorized to update this association'], 403);
        }


        $associationData = $request->validated();


        // validate if he is a admin
        if ($associationData->status && $associationData->status != 'active') {
            // block admin
            User::where('association_id', $id)->update(['status' => "inactive"]);
        }

        // update logo if exist
        $image = $request->file('logo');

        if ($image) {
            // Image upload requested
            $validator = Validator::make(['logo' => $image], [
                'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust allowed types and size limits as needed
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first(),
                    $validator->errors()
                ], 422);
            }
            // store it
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('associations'), $imageName);
            // save path
            $associationData['logo'] = $imageName;
        }



        $updatedAssociation = $association->update($associationData);

        if ($updatedAssociation) {
            return response()->json(['message' => 'updated'], 200);
        } else {
            return response()->json(['message' => 'Error while updating association'], 400); // Use 400 for bad request
        }
    }



    public function show(Request $request, $id)
    {
        $association = Association::find($id);

        if (!$association) {
            return response()->json(['message' => 'Association not found'], 404);
        }
        if ($request->user()->cannot('view', $association)) {

            return response()->json(['message' => 'no allowed to show this association :  ' . $id], 403);
        }

        return response()->json(new AssociationResource($association), 200);
    }




    public function showAssociationDashboard(Request $request, $id)
    {
        $association = Association::find($id);

        if (!$association) {
            return response()->json(['message' => 'Association not found'], 404);
        }
        if ($request->user()->cannot('view', $association)) {

            return response()->json(['message' => 'no allowed to show this association :  ' . $id], 403);
        }
        return response()->json(['message' => 'succefully', "patients" =>  $association->patients, 'association' => new AssociationResource($association)], 200);

        return response()->json(new AssociationResource($association), 200);
    }



    public function destroy(Request $request, $id)
    {
        $association = Association::find($id);
        // $this->authorize('delete', $association); // Check authorization


        if (!$association) {
            return response()->json(['message' => 'Association not found or Already deleted'], 404);
        }

        if ($request->user()->cannot('delete', $association)) {
            return response()->json(['message' => 'no allowed to delete this id :  ' . $id], 403);
        }

        //change status all users belong assosition
        $association->users()->update(['status' => 'inactive']);
        $association->delete();

        return response()->json(null, 204); // No content on successful deletion
    }

    public function restore(Request $request, $id)
    {
        $association = Association::find($id);
        // $this->authorize('delete', $association); // Check authorization


        if (!$association) {
            return response()->json(['message' => 'Association not found or Already deleted'], 404);
        }

        if ($request->user()->cannot('delete', $association)) {
            return response()->json(['message' => 'no allowed to restore this id :  ' . $id], 403);
        }

        //change status all users belong assosition
        $association->users()->update(['status' => 'active']);
        $association->restore();

        return response()->json(null, 204); // No content on successful deletion
    }



}
