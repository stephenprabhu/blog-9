<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostSubmitRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Tags\Tag;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::filter(Request::only('search','status'))->latest()->paginate(10)->appends(Request::all());
        $filters = Request::all('search','status');
        return inertia('Posts/Index',[
            'posts'=>$posts,
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
        return inertia('Posts/Create',[
            'categories' => Category::all(),
            'tags'=>Tag::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostSubmitRequest $request)
    {
        $validated = $request->validated();

        if($request->hasFile('featured_image')){
            $path = $request->file('featured_image')->store('public/posts/featured_images');
            $validated['featured_image']=$path;
        }

       // eslint-disable-next-line
        $post = Auth::user()->posts()->create($validated);

        $post->attachTags($request->tags);

        return redirect()->route('posts.index')->with('success','Post Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
         return inertia('Posts/Create',[
             'editing'=>true,
            'article'=>$post->load('tags'),
            'categories' => Category::all(),
            'tags'=>Tag::all()
         ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostUpdateRequest $request, Post $post)
    {
        $validated = $request->validated();
        $post->update($validated);

        $post->syncTags($request->tags);

        return redirect()->route('posts.index')->with('success','Post Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $post->delete();
        return redirect()->route('posts.index')->with('success','Post Deleted');
    }
}
