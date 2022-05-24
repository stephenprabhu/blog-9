@extends('layouts.front',[
    'meta_description'=>$post->meta_description,
    'meta_keywords'=>$post->meta_keywords
])

@section('content')
    <section class="blog-section">
        <div class="container">
            <div class="single-post no-sidebar">
                <div class="title-single-post">
                    <a class="text-link" href="#">{{$post->category->name ?? '-'}}</a>
                    <h1>{{$post->title}}</h1>
                    <ul class="post-tags">
                        <li> {{ \Carbon\Carbon::parse($post->published_date)->diffForHumans() }}</li>
                        <li><a href="#">{{$post->comments->count()}} comments</a></li>
                    </ul>
                </div>
                <div class="single-post-content">
                    <img
                        style="object-fit: cover; width:850px; height:400px"
                        src="{{$post->featured_image ? $post->featured_image : asset('images/upload/single/4.jpg')}}"
                        alt="">
                    <div class="post-content">
                        <div class="post-social">
                            <span>Share</span>
                            <ul class="share-post">
                                <li><a href="#" class="facebook"><i class="fa fa-facebook"></i></a></li>
                                <li><a href="#" class="twitter"><i class="fa fa-twitter"></i></a></li>
                                <li><a href="#" class="pinterest"><i class="fa fa-pinterest"></i></a></li>
                            </ul>
                        </div>
                        <div class="post-content-text">
                           {!! $post->body !!}
                            <div class="share-tags-box">
                                <ul class="tags">
                                    @foreach ($post->tags as $tag)
                                        <li><a href="#">{{$tag->name}}</a></li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="related-box">
                        <h2>Related Posts</h2>
                        <div class="row">
                            <div class="col-lg-4 col-md-4">
                                <div class="news-post standard-post text-left">
                                    <div class="image-holder">
                                        <a href="single-post.html"><img src="{{ asset('images/upload/blog/p1.jpg')}}" alt=""></a>
                                    </div>
                                    <a class="text-link" href="#">Food</a>
                                    <h2><a href="single-post.html">Fusce pellentesque suscipit.</a></h2>
                                    <ul class="post-tags">
                                        <li>by <a href="#">Stan Enemy</a></li>
                                        <li>3 days ago</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <div class="news-post standard-post text-left">
                                    <div class="image-holder">
                                        <a href="single-post.html"><img src="{{ asset('images/upload/blog/p2.jpg')}}" alt=""></a>
                                    </div>
                                    <a class="text-link" href="#">Lifestyle</a>
                                    <h2><a href="single-post.html">Quisque a lectus. </a></h2>
                                    <ul class="post-tags">
                                        <li>by <a href="#">Stan Enemy</a></li>
                                        <li>3 days ago</li>
                                    </ul>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-4">
                                <div class="news-post standard-post text-left">
                                    <div class="image-holder">
                                        <a href="single-post.html"><img src="{{ asset('images/upload/blog/p3.jpg')}}" alt=""></a>
                                    </div>
                                    <a class="text-link" href="#">Travel</a>
                                    <h2><a href="single-post.html">Vestibulum commodo tortor.</a></h2>
                                    <ul class="post-tags">
                                        <li>by <a href="#">Stan Enemy</a></li>
                                        <li>3 days ago</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- comments -->
                <div class="comments">
                    <h2 class="comments-title">
                        {{$post->comments->count()}} Comments
                    </h2>
                    @if($post->comments->count())
                        <ul class="comments__list">
                            @foreach ($post->comments as $comment)
                                <li class="comments__list-item">
                                    <img class="comments__list-item-image" src="{{ $comment->user->image_url ?? asset('images/upload/single/th1.jpg')}}" alt="">
                                    <div class="comments__list-item-content">
                                        <h3 class="comments__list-item-title">
                                            {{$comment->user->name}}
                                        </h3>
                                        <span class="comments__list-item-date">
                                           {{$comment->created_at->diffForHumans()}}
                                        </span>
                                        <p class="comments__list-item-description">
                                            {{$comment->message}}
                                        </p>
                                       @if (Auth::check() && Auth::user()->id == $comment->user_id)
                                            <div>
                                                <a href="?edit={{$comment->id}}#comment-form" style="color:#E74C3C" >Edit</a> |
                                                <form
                                                    style="display: inline"
                                                    action="{{ route('comments.delete', ['post'=>$post, 'comment'=> $comment]) }}"
                                                    method="POST"
                                                    onsubmit="return confirm('Are You Sure You Wish To Delete This Comment? This Cannot be undone.')"
                                                >
                                                        @csrf @method('DELETE')
                                                        <button type="submit" style="color:#E74C3C; background:none; border:none">Delete</button>
                                                </form>
                                            </div>
                                       @endif
                                    </div>
                                </li>
                            @endforeach
                        </ul>
                    @else
                        <p class="text-center">No Comments Yet. Be The First One.</p>
                    @endif
                </div>
                <!-- end comments -->

                <!-- Contact form module -->
                @auth
                    <form class="contact-form" action="{{$editComment ? route('comments.update',['post'=>$post, 'comment'=>$editComment]) : route('comments.store',$post) }}" id="comment-form" method="POST">
                        @csrf

                        @if($editComment)
                            @method('PUT')
                        @endif

                        <h2 class="contact-form__title">
                            Write a Comment
                        </h2>
                        <textarea class="contact-form__textarea" name="message" id="comment" placeholder="Comment">{{$editComment ? $editComment->message : ''}}</textarea>
                        <button class="contact-form__submit" type="submit" >Post Comment</button>
                    </form>
                @endauth

                @guest
                    <p>
                        <a href="{{route('login', ['redirectBack'=>route('front.post', $post)])}}">
                            Log In
                        </a> to post a comment</p>
                @endguest
                <!-- End Contact form module -->

            </div>
        </div>
    </section>
@endsection
