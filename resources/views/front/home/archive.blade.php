@extends('layouts.front')

@section('content')
    @if($posts->count())
    <section class="page-banner-section">
        <div class="container">
            <h1>{{$title ?? 'All Articles'}}</h1>
        </div>
    </section>

    <section class="blog-section">
        <div class="container">
            <div class="blog-box grid-style text-center">
                <div class="row">
                    @foreach ($posts as $post)
                        <div class="col-lg-4 col-md-6">
                            <div class="news-post article-post">
                                <div class="image-holder">
                                    <a href="{{route('front.post', $post->slug)}}">
                                        <img
                                            style="object-fit: cover; width:740px; height:350px"
                                            src="{{$post->featured_image ? $post->featured_image : asset('images/upload/blog/c9.jpg')}}"
                                            alt="" />
                                    </a>
                                </div>
                                <a class="text-link" href="?category={{$post->category_id}}">{{$post->category->name ?? '-'}}</a>
                                <h2><a href="{{route('front.post', $post->slug)}}">{{$post->title}}</a></h2>
                                <ul class="post-tags">
                                    <li>{{ $post->created_at->diffForHumans()}}</li>
                                    <li><a href="{{route('front.post', $post->slug)}}">{{$post->comments->count()}} comments</a></li>
                                    <li>by <a href="?author={{$post->user_id}}">{{$post->author->name ?? '-'}}</a></li>
                                </ul>
                                <p>{{ $post->snippet ?? '-'}}</p>
                            </div>
                        </div>
                    @endforeach

                </div>
                <div >
                    {{$posts->links("pagination::bootstrap-5")}}
                </div>
            </div>
        </div>
    </section>
    @else
        <h3 class="text-center mt-5 mb-5">
            No Posts Yet. Come back soon for amazing articles.
        </h3>
    @endif
@endsection
