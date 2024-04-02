<?php

namespace App\Http\Controllers;

use App\Http\Requests\Associations\CreateIllnessRequest;

use App\Http\Requests\Illnesses\UpdateIllnessRequest;
use App\Http\Resources\Illness\IllnessResource;
use App\Models\Illness;

use function PHPUnit\Framework\isEmpty;

class IllnessController extends Controller
{
    public function index()
    {




        $illnesses = Illness::all();

        // Filter by search query


        if (isEmpty($illnesses)) {
            return response()->json([], 200); // No content
        }



        return response()->json(new IllnessResource($illnesses), 200);;
    }


    public function store(CreateIllnessRequest $request)
    {
        // $this->authorize('create', Illness::class); // Check authorization

        $illness = Illness::create($request->validated());



        return response()->json(new IllnessResource($illness), 201);
    }


    public function update(UpdateIllnessRequest $request, $id) // Use validated request
    {

        if (!$id) {
            return response()->json(['message' => 'id not found'], 404);
        }

        //check if illness exist
        $illness = Illness::find($id);

        // $this->authorize('update', $illness); // Check authorization

        //check if illness exist
        if (!$illness) {
            return response()->json(['message' => 'Illness not found'], 404);
        }

        $illness->update($request->validated());

        return response()->json(new IllnessResource($illness), 200);
    }


    public function destroy($id)
    {
        // $this->authorize('delete', $illness); // Check authorization


        $illness = Illness::find($id);

        //check if illness exist
        if (!$illness) {
            return response()->json(['message' => 'Illness not found'], 404);
        }


        $illness->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
