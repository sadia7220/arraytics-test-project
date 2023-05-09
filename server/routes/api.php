<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\AddressBookController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });


Route::post('/registration', [AuthenticationController::class, 'registration']);
Route::post('/login', [AuthenticationController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function(Request $request) {
        return auth()->user();
    });
    Route::post('/logout', [AuthenticationController::class, 'logout']);

    Route::controller(AddressBookController::class)->group(function () {
        Route::get('/addresses', 'index');
        Route::post('/addresses', 'store');
        Route::get('/addresses/{id}', 'show');
        Route::put('/addresses/{id}', 'update');
        Route::delete('/addresses/{id}', 'destroy');
        Route::get('/addresses/search/{param}', 'searchAddress');
    });
});