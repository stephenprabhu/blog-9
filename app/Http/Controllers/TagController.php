<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Spatie\Tags\Tag;
use Illuminate\Support\Facades\Request as LaravelRequest;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $filters = LaravelRequest::all('search');
        $tags = Tag::latest();
        if($request->has('search')){
            $tags = $tags->containing($request->get('search'));
        }

        return inertia('Tags/Index',[
            'tags'=> $tags->paginate(10)->appends(LaravelRequest::all()),
            'filters'=>$filters
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(!$request->name)
            abort(400);

        Tag::create(['name' => $request->name]);

        return redirect()->back()->with('success','Tag Successfully Created');
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
        return inertia('Tags/Index',[
            'tags'=>Tag::paginate(10),
            'editing'=>true,
            'curTag'=>Tag::find($id)
        ]);
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
        $tag = Tag::find($id);
        if(!$tag)
            abort(404);
        if(!$request->name)
            abort(400);

        $tag->name = $request->name;
        $tag->save();
        return redirect()->route('tags.index')->with('success','Tag Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $tag = Tag::find($id);
        if(!$tag){
            abort(404);
        }
        $tag->delete();
        return redirect()->route('tags.index')->with('success','Tag Deleted');
    }
}
