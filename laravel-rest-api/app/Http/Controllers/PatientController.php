<?php

namespace App\Http\Controllers;

use App\Http\Requests\Patients\CreatePatientRequest;
use App\Http\Requests\Patients\UpdatePatientRequest;
use App\Http\Resources\Patient\PatientResource;
use App\Http\Resources\Patient\PatientXlsxResource;
use App\Models\Patient;
use Carbon\Carbon;
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
        $patients = Patient::latest();

        // Filter by search query (if applicable)
        $searchTerm = $request->query('q');
        $deleted = $request->query('deleted', null);
        $perPage = $request->query('per_page', 10);

        // Get the association ID of the authenticated user
        $user = Auth::user();


        // Filter by search query for first & last name (optional)
        if ($searchTerm) {
            $patients->where(function ($query) use ($searchTerm) {
                $query->where('first_name', 'like', "%$searchTerm%")
                    ->orWhere('last_name', 'like', "%$searchTerm%");
                // ->orWhere('id', 'like', "%$searchTerm%");
            });
        }



        if ($user->role_id != 1) {

            $userAssociation = $user->association_id;
            $patients = $patients->where('association_id', $userAssociation);
        }


        // if user passed deleted treu bring all deleted associations
        if ($deleted) {
            $patients->withTrashed();
        }


        // Filter by association
        $association = $request->query('association', null);
        if ($association) {
            $patients->where("association_id", "=", $association);
        }



        // Retrieve patients associated with the authenticated user's association, including soft deleted patients
        $patients = $patients
            ->join('associations', 'patients.association_id', '=', 'associations.id')
            ->join('illnesses', 'associations.illness_id', '=', 'illnesses.id')
            ->orderBy('patients.created_at', 'desc')
            ->select('patients.*', "associations.name AS association", "illnesses.name AS illness");



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



        // add filter chekc if they wants add same patients


        // Handle image upload (before creating patients)
        $image = $request->file('avatar');

        $validatedData = $request->validated();

        $imageName = time() . '.' . $image->extension();
        $image->move(public_path('patients'), $imageName);



        $validatedData['avatar'] = $imageName; // Add logo data
        $validatedData['association_id'] = Auth::user()->association_id; // Add logo data




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
            $validatedData['avatar'] = $imageName;
        }

        $patientUpdated =    $patient->update($validatedData);

        if ($patientUpdated) {
            return response()->json(['message' => 'updated'], 200);
        } else {
            return response()->json(['message' => 'Error while updating association'], 400); // Use 400 for bad request
        }
    }

    /**
     * Remove the specified resource from storage (soft delete).
     *
     * @param  Patient  $patient
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {

        $patient = Patient::withTrashed()->find($id);

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }
        $patient->status = 'deleted';
        $patient->save();


        $patient->delete();

        return response()->json(null, 204); // No content on successful deletion
    }

    public function restore($id)
    {

        $patient = Patient::withTrashed()->find($id);

        if (!$patient) {
            return response()->json(['message' => 'patient not found'], 404);
        }
        $patient->status = 'active';
        $patient->save();


        $patient->restore();

        return response()->json(null, 204); // No content on successful deletion
    }



    // function for export data for xlsx
    public function fetchDataForXlsx(Request $request)
    {
        $patients = Patient::latest();

        // Filter by search query
        $deleted = $request->query('deleted', null);
        $perPage = $request->query('per_page', 10);
        $now = Carbon::now();
        $startDate = $request->query('startDate', '1000-01-01');
        $endDate = $request->query('endDate', strval($now->format('Y-m-d')));

        // Get the association ID of the authed user
        $user = Auth::user();

        if ($user->role_id != 1) {
            $userAssociation = $user->association_id;
            $patients = $patients->where('association_id', $userAssociation);
        }

        // Apply soft deletes if requested
        if ($deleted) {
            $patients = $patients->withTrashed();
        }


        // Filter by date range with validation
        $startDate = Carbon::parse($startDate);
        $endDate = Carbon::parse($endDate);
        $patients = $patients->whereBetween('patients.created_at', [$startDate, $endDate]);



        // join with associations table
        $patients = $patients
            ->join('associations', 'patients.association_id', '=', 'associations.id')
            ->join('illnesses', 'associations.illness_id', '=', 'illnesses.id')
            ->orderBy('patients.created_at', 'desc')
            ->select('patients.*', "associations.name AS association", "illnesses.name AS illness");


        // Consider pagination if needed
        $patients = $patients->paginate($perPage);

        return response()->json(PatientXlsxResource::collection($patients), 200);
    }
}
