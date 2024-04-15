<?php

namespace App\Http\Controllers;

use App\Models\Association;
use App\Models\Illness;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatisticsController extends Controller
{



    public function getStatistics()
    {
        $user = Auth::user();

        if ($user->role_id === 1) {
            return $this->isSuperAdmin();
        } else {
            return $this->isAssociationAdmin();
        }
    }


    public function isSuperAdmin()
    {

        $patients = Patient::count();
        $illnesses = Illness::count();
        $associations = Association::count();

        return response()->json(['message' => 'succefully', "patients" => $patients, "illnesses" => $illnesses, "associations" => $associations, 'role' => 1], 200);
    }

    public function isAssociationAdmin()
    {

        $user = Auth::user();
        $patients =  count(Patient::where('association_id', $user->association_id)->get());


        return response()->json(['message' => 'succefully', "patients" => $patients, 'role' => 2], 200);
    }
}
