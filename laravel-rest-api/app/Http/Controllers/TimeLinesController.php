<?php

namespace App\Http\Controllers;

use App\Http\Requests\TimeLines\TimeLineRequest;
use App\Http\Resources\TimeLines\TimeLineResource;
use App\Models\Patient;
use App\Models\Timeline;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TimeLinesController extends Controller
{
    public function index(Request $request)
    {

        $idPatient = $request->query("idPatient");

        if ($idPatient) {

            $TimeLines = Timeline::where("patient_id", $idPatient);

            $TimeLines->join("users", "timelines.responsable_id", "=", "users.id")
                ->select('timelines.*', 'users.name AS responsable');

            return response()->json(TimeLineResource::collection($TimeLines->get()), 200);
        } else {
            return response()->json(['message' => __('id patient is required')], 404);
        }
    }

    public function store(TimeLineRequest $request)
    {

        $pateintId =  $request->patient_id;
        $userResponsable = Auth::user();
        $patientProfile = Patient::find($pateintId); // get patient by id

        // dd($patientProfile);

        //check if there is  a pateint under this id
        if (!$patientProfile) {
            return response()->json(['message' => 'patient not found'], 404);
        }

        // chsekc if asdmin who wnat create timeline for this patient they have same association
        if ($userResponsable->association_id != $patientProfile->association_id) {
            return response()->json(['message' => 'you dont have permsion for this Patient '], 422);
        }



        $file = $request->file('file');
        $validatedData = $request->validated();
        // dd($file);
        if ($file) {


            // validate file type (image or PDF)
            $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'pdf'];
            $extension = strtolower($file->getClientOriginalExtension());

            // Loop Throu ght
            if (!in_array($extension, $allowedExtensions)) {
                return response()->json(['message' => __('Invalid file type. Only images (JPG, JPEG, PNG, GIF) and PDFs are allowed')], 422); // Unprocessable Entity
            }

            $fileName = time() . '.' . $file->extension();
            $file->move(public_path('TimeLine/' . $pateintId), $fileName);
            $validatedData['file_url'] = $fileName;
        }



        // fill responsable_id with user that authed now
        $validatedData['responsable_id'] = $userResponsable->id;



        // Create and store timeline with file information
        $timeLines = Timeline::create($validatedData);

        if ($timeLines) {
            return response()->json(['message' => "timeLine created successfully"], 201);
        } else {
            return response()->json(['message' => __('Failed to create timeline')], 400);
        }
    }
}
