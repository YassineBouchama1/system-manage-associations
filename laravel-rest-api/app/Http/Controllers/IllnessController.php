<?php

namespace App\Http\Controllers;

use App\Http\Requests\IllnessRequest;
use App\Http\Resources\Illness\IllnessResource;
use App\Models\Illness;

use function PHPUnit\Framework\isEmpty;

class IllnessController extends Controller
{
    public function index()
    {

        // $this->authorize('viewAny', Illness::class); // Check authorization

        $illnesses = Illness::all();

        // Filter by search query


        if ($illnesses->isEmpty()) {
            return response()->json(['message' => 'No illnesses found'], 204); // No content
        }


        return response()->json(new IllnessResource($illnesses), 200);;
    }


    public function store(IllnessRequest $request) // Use validated request
    {
        $this->authorize('create', Illness::class); // Check authorization

        $illness = Illness::create($request->validated());

        return response()->json(new IllnessResource($illness), 201);
    }


    public function update(IllnessRequest $request, Illness $illness) // Use validated request
    {
        $this->authorize('update', $illness); // Check authorization

        //check if illness exist
        if (!$illness->exists()) {
            return response()->json(['message' => 'Illness not found'], 404);
        }

        $illness->update($request->validated());

        return response()->json(new IllnessResource($illness), 200);
    }


    public function destroy(Illness $illness)
    {
        $this->authorize('delete', $illness); // Check authorization


        //check if illness exist
        if (!$illness->exists()) {
            return response()->json(['message' => 'Illness not found'], 404);
        }


        $illness->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
