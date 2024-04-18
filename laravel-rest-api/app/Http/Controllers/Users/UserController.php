<?php

namespace App\Http\Controllers\Users;

use Illuminate\Support\Facades\Hash;

use App\Actions\Users\ChangePassword;
use App\Actions\Users\UpdateUser;
use App\Http\Controllers\Controller;
use App\Http\Requests\Users\ChangePasswordRequest;
use App\Http\Requests\Users\UpdateUserRequest;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function show(): UserResource
    {
        return new UserResource(Auth::user());
    }


    public function update(UpdateUserRequest $request, UpdateUser $updateUser): UserResource
    {
        $updateUser(
            user: $request->user(),
            name: $request->input('name'),
            email: $request->input('email'),
        );

        return new UserResource(Auth::user()->fresh());
    }


    public function changePassword(ChangePasswordRequest $request, ChangePassword $changePassword): JsonResponse
    {



        // check if old password is correct
        // $oldPassword = Auth::user()->password;
        // $oldPassword = Hash::make($request->input('Oldpassword'));
        // $newPassword = Hash::make($request->input('password'));

        // if (Auth::user()->password != $oldPassword) {
        //     return response()->json(['message' => 'the old password uncorrect try again'], 404);
        // }

        $changePassword(
            user: $request->user(),
            password: $request->input('password')
        );

        return response()->json([
            'status' => 'password-changed',
            'message' => 'password-changed',
        ]);
    }
}
