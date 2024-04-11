<?php
// handle if front requst route dosn't exist

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::fallback(function (Request $request) {
    return response()->json(['message' => 'The route ' . $request->url() . ' could not be found'], 404);
});
