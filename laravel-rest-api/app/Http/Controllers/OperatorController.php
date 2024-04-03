<?php

namespace App\Http\Controllers;

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
        $operator = User::find($id);

        if (!$operator) {
            return response()->json(['message' => 'operator not found'], 404);
        }

        return response()->json(new OperatorResource($operator), 200);
    }

    
}
