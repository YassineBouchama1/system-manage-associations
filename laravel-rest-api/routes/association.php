<?php

use App\Http\Controllers\AssociationController;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'associations', 'middleware' => 'auth:api'], function () {
    // Public routes (no role check)
    Route::get('/', [AssociationController::class, 'index']);
    Route::get('/{association}', [AssociationController::class, 'show']);

    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:1'], function () {
        Route::put('/{association}', [AssociationController::class, 'update']);
        Route::post('/', [AssociationController::class, 'store']);
        Route::delete('/{association}', [AssociationController::class, 'destroy']); // Added delete route
    });
});
