<?php


use App\Http\Controllers\TimeLinesController;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'timeLine', 'middleware' => 'auth:api'], function () {


    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:2'], function () {
        Route::get('/', [TimeLinesController::class, 'index']);


        Route::post('/', [TimeLinesController::class, 'store']);
    });
});
