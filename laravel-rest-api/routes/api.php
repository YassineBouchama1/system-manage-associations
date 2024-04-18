<?php

use App\Http\Controllers\IllnessController;
use App\Http\Controllers\StatisticsController;
use App\Http\Controllers\Users\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';
require __DIR__ . '/illness.php';
require __DIR__ . '/association.php';
require __DIR__ . '/patient.php';
require __DIR__ . '/operator.php';
require __DIR__ . '/charts.php';

//@descRoles ids
//  : 1- super admin
//  : 2- super assosocation
//  : 3- operator




// handle if front requst route dosn't exist
Route::fallback(function (Request $request) {
    return response()->json(['message' => 'The route ' . $request->url() . ' could not be found'], 404);
});


Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [UserController::class, 'show'])
        ->name('user.show');
});


Route::middleware(['auth:api'])->group(function () {
    Route::patch('/user', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/change-password', [UserController::class, 'changePassword'])
        ->name('user.change-password');
});


Route::middleware(['auth:api'])->group(function () {
    Route::get('/statistics', [StatisticsController::class, 'getStatistics']);
});
