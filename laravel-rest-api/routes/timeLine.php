<?php


use App\Http\Controllers\TimeLinesController;
use Illuminate\Support\Facades\Route;





Route::group(['prefix' => 'timeLine', 'middleware' => 'auth:api'], function () {


    Route::get('/', [TimeLinesController::class, 'index']);
    // Admin routes (require admin role)
    Route::group(['middleware' => 'role:2'], function () {


        Route::post('/', [TimeLinesController::class, 'store']);
    });
});
