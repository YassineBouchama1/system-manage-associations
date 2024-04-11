<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IllnessController;





Route::group(['prefix' => 'illnesses', 'middleware' => 'auth:api'], function () {
    // Public routes (no role check)
    Route::get('/', [IllnessController::class, 'index']);
    // Route::get('/{illness}', [IllnessController::class, 'show']);

    //this is for display illnesses in selectors frontend
    Route::get('/selectors', [IllnessController::class, 'indexForSelectors']);

    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:1'], function () {
        Route::put('/{illness}', [IllnessController::class, 'update']);
        Route::post('/', [IllnessController::class, 'store']);
        Route::delete('/{illness}', [IllnessController::class, 'destroy']);
        Route::delete('/force/{illness}', [IllnessController::class, 'forceDelete']);
        Route::patch('/{illness}', [IllnessController::class, 'restore']);
    });
});
