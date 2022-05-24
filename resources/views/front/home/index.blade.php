@extends('layouts.front',[
    'page'=>'index'
])

@section('content')
    <!-- TOP FEATURED 3 ITEMS -->
    <section class="top-images-section">
        <div class="container">
            <div class="top-images-box">
                <div class="row">
                    @foreach ($featuredPosts as $post)
                        <div class="col-lg-4">
                            <div class="news-post image-post">
                                <a  href="{{route('front.post', $post->slug)}}"><img
                                    src="{{$post->featured_image ? $post->featured_image : asset('images/upload/blog/a1.jpg')}}"
                                    alt="{{$post->title}}"
                                    style="object-fit: cover; width:740px; height:490px"
                                ></a>
                                <div class="hover-post text-center">
                                    @if($post->category)
                                        <a
                                            class="category-link"
                                            href="/posts?category={{$post->category->slug ?? '' }}">
                                                {{ $post->category->name ?? '-'}}
                                        </a>
                                    @endif
                                    <h2><a href="{{route('front.post', $post->slug)}}">{{$post->title}}</a></h2>
                                    <ul class="post-tags">
                                        <li>by <a href="/posts?author={{$post->author->username}}">{{$post->author->name}}</a></li>
                                        <li>{{$post->created_at->diffForHumans()}}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>

    @if($recentPosts->count())
    <!-- RECENT STORIES SECTION -->
    <section class="fresh-section">
        <div class="container">
            <div class="title-section text-center">
                <h1>Recent Stories</h1>
            </div>
            <div class="fresh-box owl-wrapper">

                <div class="owl-carousel" data-num="4">
                    @foreach ($recentPosts as $post)
                        <div class="item">
                            @include('partials.smallPostCard',$post)

                        </div>
                    @endforeach





                </div>
            </div>
            <div class="border-bottom"></div>
        </div>
    </section>
    @else
            <h3 class="text-center mt-5 mb-5">
                No Posts Yet. Come back soon for amazing articles.
            </h3>
    @endif

    <!--SUBSCRIBE TO NEWSELTTER SECTION -->
    <section class="subscribe-section">
        <div class="container">
            <div class="subscribe-box">
                <div class="subscribe-title">
                    <h2>Join My Newsletter</h2>
                    <p>Sign up for our free newsletters to receive the latest news. Don't worry we won't do spam.</p>
                </div>
                <form class="subscribe-form">
                    <input type="text" name="email2" id="email2" placeholder="Enter your Email Address"/>
                    <button type="submit" id="submit-subscribe-form">Subscribe</button>
                </form>
            </div>
        </div>
    </section>


    @if($trendingPosts->count())
    <!-- Trending Posts -->
    <section class="top-home-section">
        <div class="container">
            <div class="title-section text-center">
                <h1>Trending Posts</h1>
            </div>
            <div class="top-home-box">
                <div class="row">

                    <div class="col-lg-6 col-md-12">
                        <div class="news-post image-post">
                            <a href="{{route('front.post', $trendingPosts->first()->slug)}}"><img
                                style="object-fit: cover; width:570px; height:610px"
                                src="{{
                                    $trendingPosts->first()->featured_image ?
                                    $trendingPosts->first()->featured_image :
                                    asset('images/upload/blog/home5/a1.jpg')}}"
                                alt="{{$trendingPosts->first()->title}}" /> </a>
                            <div class="hover-post">
                                @if($trendingPosts->first()->category)
                                    <a
                                        class="category-link"
                                        href="/posts?category={{$trendingPosts->first()->category_id}}">
                                            {{$trendingPosts->first()->category->name ?? ''}}
                                    </a>
                                @endif
                                <h2><a href="{{route('front.post', $trendingPosts->first()->slug)}}">{{$trendingPosts->first()->title}}</a></h2>
                                <ul class="post-tags">
                                    <li>{{$trendingPosts->first()->created_at->diffForHumans() }}</li>
                                    <li><a href="#">2 comments {{$trendingPosts->first()->category->name ?? ''}}</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-12">
                        <div class="row">
                            @foreach ($trendingPosts as $post)
                                @if($loop->first)
                                    @continue
                                @endif
                                <div class="col-md-6">
                                    @include('partials.smallPostCard',$post)
                                </div>
                            @endforeach
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>
    @endif


    <!--ABOUT ME SECTION -->





@endsection
