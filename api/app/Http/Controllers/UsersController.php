<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;
use Hash;

class UsersController extends Controller
{   
    protected $request;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

   public function __construct(\Illuminate\Http\Request $request)
   {
       $this->request = $request;
   }    
    
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //we will want to create a record and send back JSON object of user's details with success indicator
        $password = $this->request->input('password');
        $email = $this->request->input('email');
        $found = User::where('email',$email)->get();
        $num = count($found);
        if($num >= 1) {
            $resp['code'] = 0;
            $resp['message'] = "We're sorry but that email address is already registered.";
        } elseif($num === 0) {
            $new_user = new User;
            $new_user->email = $email;
            $new_user->password = Hash::make($password);
            $new_user->save();
            if(count(User::where('email',$email)->get() === 1)) {
                $resp['code'] = 1;
                $resp['message'] = "User successfully registered.";
            }
        }
        
        return $resp;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
