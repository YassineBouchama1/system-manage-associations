<?php

use App\Http\Controllers\OperatorController;
use Illuminate\Support\Facades\Route;







Route::group(['prefix' => 'operators', 'middleware' => 'auth:api'], function () {
    // Public routes (no role check)


    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:1,2'], function () {
        Route::get('/', [OperatorController::class, 'index']);
        Route::get('/{operator}', [OperatorController::class, 'show']);
        Route::put('/{operator}', [OperatorController::class, 'update']);
        Route::post('/', [OperatorController::class, 'store']);
        Route::delete('/{operator}', [OperatorController::class, 'destroy']); // Added delete route
    });
});
