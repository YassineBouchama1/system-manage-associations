<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patients\CreatePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;
use App\Http\Resources\Patient\PatientResource;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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

        // Get the association ID of the authenticated user
        $userAssociation = Auth::user()->association_id;

        // Retrieve patients associated with the authenticated user's association, including soft deleted patients
        $patients = Patient::withTrashed()->where('association_id', $userAssociation);

        // Filter by search query for first & last name (optional)
        $search = $request->query('search');
        if ($search) {
            $patients->where(function ($query) use ($search) {
                $query->where('first_name', 'like', "%$search%")
                    ->orWhere('last_name', 'like', "%$search%");
            });
        }

        // Pagination
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




        // Handle image upload (before creating patients)
        $image = $request->file('avatar');

        $validatedData = $request->validated();

        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('patients'), $imageName);



        $validatedData['avatar'] = $imageName; // Add logo data




        $patient = Patient::create($validatedData);

        if ($patient) {
            return response()->json(['message' => "Patient created successfully"], 201);
        } else {
            return response()->json(['message' => "Failed to create patient"], 403);
        }
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

        $patient = Patient::withTrashed()->find($id);

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }


        $validatedData = $request->validated();

        // update logo if exist
        $image = $request->file('avatar');

        if ($image) {
            // Image upload requested
            $validator = Validator::make(['avatar' => $image], [
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Adjust allowed types and size limits as needed
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => $validator->errors()->first(),
                    $validator->errors()
                ], 422);
            }
            // store it
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('patients'), $imageName);
            // save path
            $associationData['avatar'] = $imageName;
        }

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
