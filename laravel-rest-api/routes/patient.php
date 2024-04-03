<?php

use App\Http\Controllers\AssociationController;
use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'patients', 'middleware' => 'auth:api'], function () {
    // Public routes (no role check)
    Route::get('/', [PatientController::class, 'index']);
    Route::get('/{patient}', [PatientController::class, 'show']);

    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:2'], function () {
        Route::put('/{patient}', [PatientController::class, 'update']);
        Route::post('/', [PatientController::class, 'store']);
        Route::delete('/{patient}', [PatientController::class, 'destroy']); // Added delete route
    });
});
