<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class VerifyEmailController extends Controller
{
    public function __invoke(EmailVerificationRequest $request): JsonResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return response()->json([
                'status' => 'email-already-verified',
                'message' => 'email-already-verified',
            ]);
        }

        if ($request->user()->markEmailAsVerified()) {
            event(new Verified($request->user()));
        }

        return response()->json([
            'status' => 'email-verified',
            'message' => 'email-verified',
            'verified_at' => Auth::user()->email_verified_at
        ]);
    }
}
