<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Validator;
use Auth;

class AuthenticationController extends Controller
{
    public function registration(Request $request)
    {
        $validator = Validator::make($request->all(), [                     
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed'
        ]); 

        if($validator->fails()){
            return $this->getErrorResponse(400, null, $validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return $this->getResponse(201, 'User has registered successfully!', $user);
    }

    public function login(Request $request)
     {
        $validator = Validator::make($request->all(), [                     
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]); 

        if($validator->fails()){
            return $this->getErrorResponse(400, null, $validator->errors());
        }
        
        $credentials = request(['email', 'password']);

        if (!Auth::attempt($credentials)) {
            return $this->getResponse(401, 'You have provided wrong credentials!');
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        $response = [
            'user' => $user,
            'access_token' => $user->createToken('access_token')->plainTextToken
        ];

        return $this->getResponse(201, 'User has logged in successfully!', $response);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return $this->getResponse(200, 'User has logged out successfully!');
    }
}
