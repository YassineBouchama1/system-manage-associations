<?php

use App\Http\Controllers\ChartsController;
use App\Http\Controllers\StatisticsController;
use App\Models\Patient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'charts', 'middleware' => 'auth:api'], function () {
    // // Public routes (no role check)
    // Route::get('/', [ChartsController::class, 'index']);


    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:1,2'], function () {
        Route::get('/patients', [ChartsController::class, 'patientsChart']);
    });
    Route::group(['middleware' => 'role:1'], function () {
        Route::get('/cities', [ChartsController::class, 'CitiesChart']);
    });
});
