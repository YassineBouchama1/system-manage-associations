<?php

namespace App\Http\Controllers;

use App\Http\Requests\Operators\UpdateOperatorRequest;
use Illuminate\Http\Request;

use App\Http\Resources\Operators\OperatorResource;
use App\Models\User;

use Illuminate\Support\Facades\Auth;

class OperatorController extends Controller
{



    public function index(Request $request)
    {

        $user = Auth::user();

        $operators = User::query();

        //if user authed is admin bring all operators <users>
        if ($user->role_id == 1) {
            $operators->where('id', '!=', $user->id);
        } else {

            //if user authd is admin assosiation bring all operators belong his assosiation
            if ($user->association_id) {
                $operators->where('association_id', $user->association_id);
            }
        }

        //pagination
        // Default to 10 patients per page
        $perPage = $request->query('per_page', 10);

        // Limit maximum per page
        $perPage = min($perPage, 50);
        $operators = $operators->withTrashed()->paginate($perPage);
        $totalPages = $operators->lastPage();
        $currentPage = $operators->currentPage();

        return response()->json(
            [
                'data' => OperatorResource::collection($operators),
                'total_pages' => $totalPages,
                'current_page' => $currentPage,
            ],
            200
        );
    }



    public function store()
    {
    }

    public function show($id)
    {
        $user = Auth::user();

        $operator = User::find($id);


        // i will change it to policy


        if (!$operator) {
            return response()->json(['message' => 'operator not found'], 404);
        }

        // $this->authorize('create', Illness::class); // Check authorization



        // if try Access super admin return error
        if ($operator->role_id === 1) {
            return response()->json(['message' => 'Unauthorized to show super admin'], 404);
        }

        // if try access operator not same assosiation id return error
        if (!$user->role_id === 2 && $operator->association_id !== $user->association_id) {
            return response()->json(['message' => 'Unauthorized to show this operator'], 404);
        }

        return response()->json(new OperatorResource($operator), 200);
    }


    public function update(UpdateOperatorRequest $request, $id) // Use validated request
    {
        $user = Auth::user();

        //check if this illness exist
        if (!$id) {
            return response()->json(['message' => 'id not found'], 404);
        }

        //check if illness exist
        $operator = User::find($id);

        // $this->authorize('update', $operator); // Check authorization


        // i will change it to policy


        if (!$operator) {
            return response()->json(['message' => 'operator not found'], 404);
        }

        // $this->authorize('create', Illness::class); // Check authorization



        // if try Access super admin return error
        if ($operator->role_id === 1) {
            return response()->json(['message' => 'Unauthorized to show super admin'], 404);
        }

        // if try access operator not same assosiation id return error
        if (!$user->role_id === 2 && $operator->association_id !== $user->association_id) {
            return response()->json(['message' => 'Unauthorized to show this operator'], 404);
        }
        $operator->update($request->validated());

        return response()->json(new operatorResource($operator), 200);
    }


    public function destroy($id)
    {
        // $this->authorize('delete', $illness); // Check authorization

        //check if this illness exist
        $operator = User::find($id);

        //check if operator exist
        if (!$operator) {
            return response()->json(['message' => 'operator not found'], 404);
        }

        //soft delete
        $operator->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
