<?php

namespace App\Http\Controllers;

use App\Http\Requests\Illnesses\CreateIllnessRequest;

use App\Http\Requests\Illnesses\UpdateIllnessRequest;
use App\Http\Resources\Illness\IllnessResource;
use App\Models\Illness;
use Illuminate\Http\Request;


class IllnessController extends Controller
{
    public function index(Request $request)
    {
        // Default to 10 per page
        $perPage = $request->query('per_page', 10);

        // Limit maximum per page
        $perPage = min($perPage, 30);

        $illnesses = Illness::withTrashed()->latest()->paginate($perPage);
        $totalPages = $illnesses->lastPage();
        $currentPage = $illnesses->currentPage();

        // Filter by search query (if applicable)
        // ... (your filtering logic here)

        return response()->json([
            'data' => IllnessResource::collection($illnesses),
            'total_pages' => $totalPages,
            'current_page' => $currentPage,
        ], 200);
    }

    public function indexForSelectors()
    {

        $illnesses = Illness::latest()->get();

        // dd($illnesses);
        return response()->json([
            "data" => IllnessResource::collection($illnesses)
        ], 200);
    }

    public function store(CreateIllnessRequest $request)
    {
        // $this->authorize('create', Illness::class); // Check authorization


        //chekc if name already exist in trached
        // $isExistInDeleted = Illness::where('name', $request->name)->withTrashed()->first();

        // if ($isExistInDeleted) {
        //     return response()->json(['message' => 'name should be uniqe'], 404);
        // }


        $illness = Illness::create($request->validated());



        return response()->json(new IllnessResource($illness), 201);
    }


    public function update(UpdateIllnessRequest $request, $id) // Use validated request
    {

        //check if this illness exist
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
        // $this->authorize('delete',); // Check authorization

        //check if this illness exist
        $illness = Illness::find($id);

        //check if illness exist
        if (!$illness) {
            return response()->json(['message' => 'Illness not found'], 404);
        }

        //soft delete
        $illness->delete();

        return response()->json(null, 204); // No content on successful deletion
    }

    public function restore($id)
    {


        // $this->authorize('delete', $illness); // Check authorization

        //check if this illness exist
        $illness = Illness::withTrashed()->find($id);
        // dd($illness);


        //check if illness exist
        if (!$illness) {
            return response()->json(['message' => 'Illness not found'], 404);
        }

        //soft delete
        $illness->restore();

        return response()->json(null, 204); // No content on successful deletion
    }

    public function forceDelete($id)
    {


        // $this->authorize('delete', $illness); // Check authorization

        //check if this illness exist
        $illness = Illness::withTrashed()->find($id);
        // dd($illness);


        //check if illness exist
        if (!$illness) {
            return response()->json(['message' => 'Illness not found'], 404);
        }

        //soft delete
        $illness->forceDelete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
