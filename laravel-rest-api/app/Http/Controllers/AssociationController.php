<?php

namespace App\Http\Controllers;


use App\Actions\Users\CreateUser;
use App\Http\Controllers\Controller;

use App\Http\Requests\Associations\CreateAssociationRequest;
use App\Http\Requests\Associations\UpdateAssociationRequest;
use App\Http\Resources\Association\AssociationResource;

use App\Models\Association;
use Illuminate\Http\JsonResponse;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AssociationController extends Controller
{

    public function index(Request $request) // Use Request for potential filtering
    {
        // $associations = Association::query();
        $associations = Association::withTrashed();

        // Filter by search query (if applicable)
        $searchTerm = $request->query('q');
        $perPage = $request->query('per_page', 10); // Default per page results (optional)


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
        // Validate email format if provided (optional)
        $validator = Validator::make($request->only('email', 'role_id', 'phone', 'password', 'nameAdmin'), [
            'email' => 'required|email|unique:users,email',
            'role_id' => 'required|exists:roles,id',
            'phone' => 'required|string',
            'password' => 'required|string',
            'nameAdmin' => 'required|string',


        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422); // Unprocessable Entity
        }


        // Check authorization (assuming authorization logic is elsewhere)
        // $this->authorize('create', Association::class);

        $association = Association::create($request->validated());

        // Check if association creation was successful
        if (!$association) {
            return response()->json(['message' => 'Failed to create association'], 500);
        }

        // If email provided, create user
        if ($request->filled('email')) {
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
                $association->forceDelete(); // Permanent deletion
                return response()->json(['message' => 'Association created but user not provided. Association permanently deleted.'], 201);
            }
        }

        return response()->json(['message' => 'Created Successfully'], 201); // Created
    }



    public function update(UpdateAssociationRequest $request, $id)
    {



        if (!$id) {
            return response()->json(['message' => 'id not found'], 404);
        }

        $association = Association::find($id);
        // $this->authorize('update', $illness); // Check authorization

        if (!$association) {
            return response()->json(['message' => 'Association not found'], 404);
        }

        $association->update($request->validated());

        return response()->json(new AssociationResource($association), 200);
    }



    public function show($id)
    {
        $Association = Association::find($id);

        if (!$Association) {
            return response()->json(['message' => 'Association not found'], 404);
        }

        return response()->json(new AssociationResource($Association), 200);
    }




    public function destroy($id)
    {
        $association = Association::find($id);
        // $this->authorize('delete', $association); // Check authorization


        if (!$association) {
            return response()->json(['message' => 'Association not found'], 404);
        }

        //change status all users belong assosition
        $association->users()->update(['status' => 'inactive']);
        $association->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
