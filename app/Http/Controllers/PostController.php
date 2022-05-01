<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostSubmitRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Models\Category;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request as HttpRequest;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Spatie\Tags\Tag;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::filter(Request::only('search','status'))->latest()->paginate(10)->appends(Request::all());
        $filters = Request::all('search','status');
        return inertia('Posts/Index',[
            'posts'=>$posts,
            'filters'=>$filters
        ]);
    }


    public function create()
    {
        return inertia('Posts/Create',[
            'categories' => Category::all(),
            'tags'=>Tag::all()
        ]);
    }


    public function store(PostSubmitRequest $request)
    {
        $validated = $request->validated();

        if($request->hasFile('featured_image')){
            $path = $request->file('featured_image')->store('public/posts/featured_images');
            $validated['featured_image']=$path;
        }

       // eslint-disable-next-line
        $post = Auth::user()->posts()->create($validated);

        if($request->tags){
            $post->attachTags($request->tags);
        }

        return redirect()->route('posts.index')->with('success','Post Created');
    }


    public function show(Post $post)
    {
        return inertia('Posts/Show',[
            'post'=>$post->load('tags','comments','comments.user')
        ]);
    }


    public function edit(Post $post)
    {
         return inertia('Posts/Create',[
            'editing'=>true,
            'article'=>$post->load('tags'),
            'categories' => Category::all(),
            'tags'=>Tag::all()
         ]);
    }



    public function update(PostUpdateRequest $request, Post $post)
    {
        if($post->featured_image){
            Storage::disk('local')->delete($post->featured_image);
        }

        $validated = $request->validated();

        if($request->hasFile('featured_image')){
            $path = $request->file('featured_image')->store('public/posts/featured_images');
            $validated['featured_image']=$path;
        }

        $post->update($validated);

        if($request->tags){
            $post->syncTags($request->tags);
        }

        return redirect()->route('posts.index')->with('success','Post Updated');
    }


    public function destroy(Post $post)
    {
        if($post->featured_image){
            Storage::disk('local')->delete($post->featured_image);
        }
        $post->delete();
        return redirect()->route('posts.index')->with('success','Post Deleted');
    }
}
