<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SendEmailVerificationNotificationController extends Controller
{
    public function __invoke(): JsonResponse
    {
        if (Auth::user()->hasVerifiedEmail()) {
            return response()->json([
                'status' => 'email-already-verified',
                'message' => 'email-already-verified',
            ], 200);
        }

        Auth::user()->sendEmailVerificationNotification();

        return response()->json([
            'status' => 'verification-link-sent',
            'message' => 'verification-link-sent',
        ], 200);
    }
}
