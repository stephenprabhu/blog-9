<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    public function index()
    {
        $postsCount = Post::count();
        $viewsCount = Post::sum('views');
        $usersCount = User::count();
        $commentsCount = Comment::count();
        $popularPosts = Post::orderBy('views','DESC')->get()->take(4);
        $recentComments = Comment::with('post')->with('user')->latest()->get()->take(4);

        return inertia('Dashboard/index',compact('postsCount','viewsCount','usersCount','commentsCount','popularPosts','recentComments'));
    }
}
