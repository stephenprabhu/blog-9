<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    public function store(Request $request, Post $post){
        $validated = $request->validate([
            'message'=> ['required','string','min:2']
        ]);
        $validated['post_id'] = $post->id;
        $validated['user_id'] = Auth::user()->id;

        Comment::create($validated);

        return redirect()->back();
    }

    public function update(Request $request, Post $post, Comment $comment){
        if( Auth::user()->id != $comment->user_id ){
            abort(403);
        }
        $validated = $request->validate([
            'message'=> ['required','string','min:2']
        ]);

        $comment->update($validated);
        return redirect()->route('front.post', $post);

    }

    public function delete(Post $post, Comment $comment){
        if( Auth::user()->id != $comment->user_id ){
            abort(403);
        }

        $comment->delete();
        return redirect()->route('front.post', $post);
    }
}
