@extends('layouts.front')

@section('content')
    <section class="page-banner-section">
        <div class="container">
            <h1>All Articles</h1>
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
                                <a class="text-link" href="#">{{$post->category->name ?? '-'}}</a>
                                <h2><a href="{{route('front.post', $post->slug)}}">{{$post->title}}</a></h2>
                                <ul class="post-tags">
                                    <li>{{ $post->created_at->diffForHumans()}}</li>
                                    <li><a href="#">3 comments</a></li>
                                    <li>by <a href="#">{{$post->author->name ?? '-'}}</a></li>
                                </ul>
                                <p>{{ $post->snippet ?? '-'}}</p>
                            </div>
                        </div>
                    @endforeach

                </div>
                <div >
                    {{-- <ul class="pagination-list">
                        <li><a href="#" class="active">1</a></li>
                        <li><a href="#">2</a></li>
                        <li><a href="#">Next Page <i class="fa fa-angle-right"></i></a></li>
                    </ul> --}}
                    {{$posts->links("pagination::bootstrap-5")}}
                </div>
            </div>
        </div>
    </section>
@endsection
