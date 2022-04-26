@extends('layouts.front')

@section('content')
    <section class="blog-section">
        <div class="container">
            <div class="single-post no-sidebar">
                <div class="title-single-post">
                    <a class="text-link" href="#">{{$post->category->name ?? '-'}}</a>
                    <h1>{{$post->title}}</h1>
                    <ul class="post-tags">
                        <li> {{ \Carbon\Carbon::parse($post->published_date)->diffForHumans() }}</li>
                        <li><a href="#">3 comments</a></li>
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
                        2 Comments
                    </h2>
                    <ul class="comments__list">
                        <li class="comments__list-item">
                            <img class="comments__list-item-image" src="{{ asset('images/upload/single/th1.jpg')}}" alt="">
                            <div class="comments__list-item-content">
                                <h3 class="comments__list-item-title">
                                    Philip W
                                </h3>
                                <span class="comments__list-item-date">
                                    Posted October 7, 2018
                                </span>
                                <a class="comments__list-item-reply" href="#">
                                    <i class="la la-mail-forward"></i>
                                    Reply
                                </a>
                                <p class="comments__list-item-description">
                                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
                                </p>
                            </div>
                        </li>
                        <li class="comments__list-item">
                            <img class="comments__list-item-image" src="{{ asset('images/upload/single/th2.jpg')}}" alt="">
                            <div class="comments__list-item-content">
                                <h3 class="comments__list-item-title">
                                    Philip W
                                </h3>
                                <span class="comments__list-item-date">
                                    Posted October 7, 2018
                                </span>
                                <a class="comments__list-item-reply" href="#">
                                    <i class="la la-mail-forward"></i>
                                    Reply
                                </a>
                                <p class="comments__list-item-description">
                                    Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti.
                                </p>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- end comments -->

                <!-- Contact form module -->
                <form class="contact-form" id="comment-form">
                    <h2 class="contact-form__title">
                        Write a Comment
                    </h2>
                    <textarea class="contact-form__textarea" name="comment" id="comment" placeholder="Comment"></textarea>
                    <input class="contact-form__submit" type="submit" name="submit-contact" id="submit_contact" value="Post Comment" />
                </form>
                <!-- End Contact form module -->

            </div>
        </div>
    </section>
@endsection
