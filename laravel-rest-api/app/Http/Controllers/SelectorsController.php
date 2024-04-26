<?php

namespace App\Http\Controllers;

use App\Http\Resources\Selectors\SelectorsResource;
use App\Models\Association;
use App\Models\Illness;
use Illuminate\Http\Request;

class SelectorsController extends Controller
{

    public function indexForSelectors()
    {

        $Associations = Association::latest()->get();
        $illnesses = Illness::latest()->get();

        return response()->json([
            "illnesses" => SelectorsResource::collection($illnesses),
            "associations" => SelectorsResource::collection($Associations)
        ], 200);
    }
}
