<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Request as IlluminateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public $simplePostItems = ['title', 'slug', 'featured_image','created_at', 'user_id','category_id'];

    public function index(){
        $query = Post::where('published', true)->with('category')->with('author');

        $featuredPosts = $query->get($this->simplePostItems)->take(3);
        $recentPosts = $query->latest()->get($this->simplePostItems)->take(8);
        $trendingPosts = $query->get($this->simplePostItems)->take(5);

        return view('front.home.index', compact('featuredPosts','recentPosts', 'trendingPosts'));
    }

    public function archive(Request $request){
        $posts = Post::latest()
                        ->where('published', true)
                        ->with('category')
                        ->with('author')
                        ->with('comments')
                        ->filter(IlluminateRequest::only('category','author'))
                        ->select(array_merge($this->simplePostItems,array('snippet')))
                        ->paginate(9);

        if(IlluminateRequest::has('category'))
            $title = 'Category : ' . IlluminateRequest::get('category');
        else if(IlluminateRequest::has('author')){
            $user = User::find(IlluminateRequest::get('author'));
            $title = 'Author : ' . $user?->name ;
        }
        else
            $title = 'All Articles';

        return view('front.home.archive',compact('posts','title'));
    }

    public function contact(){
        return view('front.home.contact');
    }

    public function post(Request $request, Post $post){
        $editCommentId = $request->get('edit');
        $editComment = null;
        if($editCommentId){
            $comment = Comment::find($editCommentId);
            if($comment){
                $editComment = $comment;
            }
        }
        $post->views += 1;
        $post->save();
        return view('front.home.post', compact('post','editComment'));
    }

    public function profile(){
        return view('front.home.profile');
    }

}
