<?php

namespace App\Observers;

use App\Models\Patient;
use App\Models\Timeline;
use Illuminate\Contracts\Events\ShouldHandleEventsAfterCommit;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PatientTimeLineObserver implements ShouldHandleEventsAfterCommit
{
    /**
     * Handle the Patient "created" event.
     */
    public function created(Patient $patient): void
    {

        try {
            $user = Auth::user();
            if ($user) {
                Timeline::create([
                    "patient_id" => $patient->id,
                    "responsable_id" => $user->id,
                    "description" => 'Create Profile'
                ]);
            }
        } catch (\Exception $e) {
            // Handle exceptions here
            Log::error("Error creating timeline entry: " . $e->getMessage());
        }

    }

    /**
     * Handle the Patient "updated" event.
     */
    public function updated(Patient $patient): void
    {
        //
    }

    /**
     * Handle the Patient "deleted" event.
     */
    public function deleted(Patient $patient): void
    {
        //
    }

    /**
     * Handle the Patient "restored" event.
     */
    public function restored(Patient $patient): void
    {
        //
    }

    /**
     * Handle the Patient "force deleted" event.
     */
    public function forceDeleted(Patient $patient): void
    {
        //
    }
}
