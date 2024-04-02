<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\IllnessController;





// Public routes (no role check)
Route::get('/illnesses', [IllnessController::class, 'index'])->name('illnesses.index');
Route::get('/illnesses/{illness}', [IllnessController::class, 'show'])->name('illnesses.show');

// Admin routes (require admin role)
Route::apiResource('illnesses', IllnessController::class)
    ->middleware('auth:api') // Authentication only
    ->except(['index', 'show']); // Exclude index and show methods from admin group
