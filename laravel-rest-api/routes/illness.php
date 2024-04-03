<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IllnessController;





Route::group(['prefix' => 'illnesses', 'middleware' => 'auth:api'], function () {
    // Public routes (no role check)
    Route::get('/', [IllnessController::class, 'index']);
    Route::get('/{illness}', [IllnessController::class, 'show']);

    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:1'], function () {
        Route::put('/{illness}', [IllnessController::class, 'update']);
        Route::post('/', [IllnessController::class, 'store']);
        Route::delete('/{illness}', [IllnessController::class, 'destroy']); 
    });
});
