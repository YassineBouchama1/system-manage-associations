<?php

use App\Http\Controllers\IllnessController;
use App\Http\Controllers\Users\UserController;
use App\Http\Middleware\RoleMiddleware;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/auth.php';
require __DIR__ . '/illness.php';

//@descRoles ids
//  : 1- super admin
//  : 2- super assosocation
//  : 3- operator








Route::middleware(['auth:api'])->group(function () {
    Route::get('/user', [UserController::class, 'show'])
        ->name('user.show');
});


Route::middleware(['auth:api', 'verified'])->group(function () {
    Route::patch('/user', [UserController::class, 'update'])
        ->name('user.update');

    Route::patch('/user/change-password', [UserController::class, 'changePassword'])
        ->name('user.change-password');
});
