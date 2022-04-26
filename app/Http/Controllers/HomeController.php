<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

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

    public function archive(){
        $posts = Post::latest()
                        ->with('category')
                        ->with('author')
                        ->select(array_merge($this->simplePostItems,array('snippet')))
                        ->paginate(9);
        return view('front.home.archive',compact('posts'));
    }

    public function contact(){
        return view('front.home.contact');
    }

    public function post(Post $post){
        return view('front.home.post', compact('post'));
    }
}
