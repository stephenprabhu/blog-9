<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('adminAccessOnly')->except(['block','unblock']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::filter(Request::only('search'))->latest()->paginate(10)->appends(Request::all());
        $filters = Request::all('search');
        return inertia('Users/Index',[
            'users'=> $users,
            'filters'=>$filters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return inertia('Users/UserForm');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserStoreRequest $request)
    {
        $validated = $request->validated();
        if($request->hasFile('image_url')){
            $path = $request->file('image_url')->store('public/users');
            $validated['image_url']=$path;
        }

        $validated['password']= Hash::make($validated['password']);
        User::create($validated);
        return redirect()->route('users.index')->with('success','User Successfully Created');
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
    public function edit(User $user)
    {
        return inertia('Users/UserForm',[
            'user'=>$user,
            'editing'=>true
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        if($user->image_url){
            Storage::disk('local')->delete($user->image_url);
        }
        $validated = $request->validated();

        if($request->hasFile('image_url')){
            $path = $request->file('image_url')->store('public/users');
            $validated['image_url']=$path;
        }

        $user->update($validated);
        return redirect()->route('users.index')->with('success','User Successfully Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('users.index')->with('success','User Successfully Deleted!');
    }

    public function block(User $user){
        $user->status=false;
        $user->save();
        return redirect()->back()->with('success','User Successfully Blocked!');
    }

    public function unblock(User $user){
        $user->status=true;
        $user->save();
        return redirect()->back()->with('success','User Successfully UnBlocked!');
    }
}
