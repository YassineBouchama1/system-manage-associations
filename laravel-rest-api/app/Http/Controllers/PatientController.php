<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patients\CreatePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;
use App\Http\Resources\Patient\PatientResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Default to 10 patients per page
        $perPage = $request->query('per_page', 10);

        // Limit maximum per page
        $perPage = min($perPage, 50);


        $patients = Patient::withTrashed(); // include soft deleted patients

        // Filter by search query   first & last name| optional
        $search = $request->query('search');
        if ($search) {
            $patients = $patients->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%");
            });
        }

        

        //pagination
        $patients = $patients->paginate($perPage);
        $totalPages = $patients->lastPage();
        $currentPage = $patients->currentPage();

        return response()->json([
            'data' => PatientResource::collection($patients),
            'total_pages' => $totalPages,
            'current_page' => $currentPage,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  CreatePatientRequest  $request
     * @return \Illuminate\Http\Response
     */

    public function store(CreatePatientRequest $request)
    {
        $validatedData = $request->validated();

        $patient = Patient::create($validatedData);

        return response()->json(new PatientResource($patient), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }

        return response()->json(new PatientResource($patient), 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdatePatientRequest  $request
     * @param  Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePatientRequest $request,  $id)
    {


        if (!$id) {
            return response()->json(['message' => 'id not found'], 404);
        }

        $patient = Patient::find($id);
        // $this->authorize('update', $illness); // Check authorization

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }

        $validatedData = $request->validated();

        $patient->update($validatedData);

        return response()->json(new PatientResource($patient), 200);
    }

    /**
     * Remove the specified resource from storage (soft delete).
     *
     * @param  Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $patient = Patient::find($id);

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }

        $patient->delete();

        return response()->json(null, 204); // No content on successful deletion
    }
}
