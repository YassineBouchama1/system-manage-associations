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



class AssociationController extends Controller
{

    public function index(Request $request) // Use Request for potential filtering
    {
        $associations = Association::query();

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
        if ($associations->isEmpty()) {
            return response()->json([], 200); // No content
        }


        return response()->json([
            'data' => AssociationResource::collection($associations),
            'total_pages' => $totalPages,
            'current_page' => $currentPage,
        ], 200);
    }


    public function store(CreateAssociationRequest $request, CreateUser $createUser): JsonResponse
    {

        // //chekc if name already exist in trached
        // $isExistInDeleted = Association::where('name', $request->name)->withTrashed()->first();

        // if ($isExistInDeleted) {
        //     return response()->json(['message' => 'name should be uniqe'], 404);
        // }



        // $this->authorize('create', Association::class); // Check authorization

        $association = Association::create($request->validated());
        //chekc if association created



        // chheck if email is provided
        //create admin association for association
        if ($request->has('email') && $association) {
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

        return response()->json(['message' =>  'Created Successfully'], 201);
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

        $association->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
