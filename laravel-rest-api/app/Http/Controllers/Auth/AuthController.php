<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Users\CreateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, CreateUser $createUser): JsonResponse
    {
        //send data to action to create user
        $createUser(
            name: $request->input('name'),
            email: $request->input('email'),
            password: $request->input('password'),
            phone: $request->input('phone'),
            role_id: $request->input('role_id'),
            association_id: $request->input('association_id'),
        );

        return response()->json([
            'status' => 'user-created',
        ]);
    }

    public function login(LoginRequest $request): JsonResponse
    {
        $credentials = $request->only(['email', 'password']);

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'invalid-credentials',
                'message' => 'invalid credentials',
            ], 401);
        }

        return response()->json([
            'user'         => new UserResource(Auth::user()),
            'access_token' => $token,
        ]);
    }

    public function logout(): Response
    {
        Auth::logout();

        return response()->noContent();
    }

    public function refresh(): JsonResponse
    {
        $token = Auth::refresh();

        return response()->json([
            'access_token' => $token,
        ]);
    }
}
