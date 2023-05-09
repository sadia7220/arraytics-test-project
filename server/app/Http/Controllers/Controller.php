<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function getResponse($code, $message=null, $data=null) {
        return response()->json([
            'response_code' => (int)$code,
            'message' => (string)$message,
            'data' => $data
        ], $code);
    }

    public function getErrorResponse($code, $message=null, $data=[]) {
        return response()->json([
            'response_code' => (int)$code,
            'message' => (string)$message,
            'errors' => $data
        ], $code);
    }
}
