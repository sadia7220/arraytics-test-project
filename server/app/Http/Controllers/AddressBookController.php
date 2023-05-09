<?php

namespace App\Http\Controllers;

use App\Models\AddressBook;
use Illuminate\Http\Request;
use Carbon\Carbon;
use Validator;
use Log;

class AddressBookController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $addressBook = AddressBook::where('created_by', auth()->user()->name)->get();
        if(!$addressBook)
            return $this->getResponse(404, 'Address not found!');
        return $this->getResponse(200, 'addressBook', $addressBook);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [                     
            'name' => 'required|string|max:255',
            'phone' => 'required|string|unique:address_book,phone',
            'email' => 'required|email|unique:address_book,email',
            'website' => 'nullable|string',
            'gender' => 'required|string',
            'age' => 'required|string',
            'nationality' => 'required|string'
        ]); 

        if($validator->fails()){
            return $this->getErrorResponse(400, null, $validator->errors());
        }
    
        $addressBook = new AddressBook;
        $addressBook->name = $request->name;
        $addressBook->phone = $request->phone;
        $addressBook->email = $request->email;
        $addressBook->website = $request->website;
        $addressBook->gender = $request->gender;
        $addressBook->age = $request->age;
        $addressBook->nationality = $request->nationality;
        $addressBook->created_by = auth()->user()->name;
        $addressBook->created_at = Carbon::now();

        if(!$addressBook->save())
            return $this->getResponse(500, 'Something went wrong!');
  
        return $this->getResponse(201, 'Address has been created successfully!', $addressBook);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AddressBook  $addressBook
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $addressBook = AddressBook::where('id', $id)->where('created_by', auth()->user()->name)->first();
        if(!$addressBook)
            return $this->getResponse(404, 'Address not found!');
        return $this->getResponse(200, 'Address has been shown!', $addressBook); 
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\AddressBook  $addressBook
     * @return \Illuminate\Http\Response
     */
    public function edit(AddressBook $addressBook)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AddressBook  $addressBook
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $addressBook = AddressBook::where('id', $id)->where('created_by', auth()->user()->name)->first();
        if(!$addressBook)
            return $this->getResponse(404, 'Address not found!');

        $validator = Validator::make($request->all(), [                     
            'name' => 'string',
            'phone' => 'string|unique:address_book,phone,'.$addressBook->id,
            'email' => 'email|unique:address_book,email,'.$addressBook->id
        ]); 

        if($validator->fails()){
            return $this->getErrorResponse(400, null, $validator->errors());
        }

        $request->filled('name')? $addressBook->name = $request->name : '';
        $request->filled('phone')? $addressBook->phone = $request->phone : '';
        $request->filled('email')? $addressBook->email = $request->email : '';

        $request->filled('website')? $addressBook->website = $request->website : '';
        $request->filled('gender')? $addressBook->gender = $request->gender : '';
        $request->filled('age')? $addressBook->age = $request->age : '';

        $request->filled('nationality')? $addressBook->nationality = $request->nationality : '';
        $request->filled('created_by')? $addressBook->created_by = $request->created_by : '';
        $request->filled('created_at')? $addressBook->created_at = $request->created_at : '';

        if(!$addressBook->save())
            return $this->getResponse(500, 'Something went wrong!');

        return $this->getResponse(201, 'Address has been updated successfully!', $addressBook);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AddressBook  $addressBook
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $addressBook = AddressBook::where('id', $id)->where('created_by', auth()->user()->name)->first();
        if(!$addressBook)
            return $this->getResponse(404, 'Address not found!');
        if(!$addressBook->delete())
            return $this->getResponse(500, 'Something went wrong!');
        return $this->getResponse(200, 'Address has been deleted successfully!');   
    }
}
