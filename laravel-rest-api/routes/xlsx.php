<?php

use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'xlsx', 'middleware' => 'auth:api'], function () {
  

    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:2,1'], function () {
        Route::get('/patients', [PatientController::class, 'fetchDataForXlsx']);


    });
});
