@extends('layouts.front')

@section('content')
    <section class="page-banner-section">
        <div class="container">
            <h1>Contact Me</h1>
        </div>
    </section>

    <section class="contact-section">
        <div class="container">
            <div class="row">
                <div class="col-lg-8">
                    <div class="contact-box">
                        <div id="map"></div>
                        <p>Contact us to find out more or how we can help you better.</p>
                        <form id="contact-form">
                            <div class="row">
                                <div class="col-md-6">
                                    <input name="name" id="name" type="text" placeholder="Name*">
                                </div>
                                <div class="col-md-6">
                                    <input name="mail" id="mail" type="text" placeholder="Email*">
                                </div>
                            </div>
                            <input name="subject" id="subject" type="text" placeholder="Subject">
                            <textarea name="comment" id="comment" placeholder="Your Message*"></textarea>
                            <input type="submit" id="submit_contact" value="Submit">
                            <div id="msg" class="message"></div>
                        </form>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="sidebar">

                        <div class="widget social-widget">
                            <ul class="social-list">
                                <li>
                                    <a href="#">
                                        <i class="fa fa-facebook"></i>
                                        facebook
                                        <span>25k likes</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-twitter"></i>
                                        twitter
                                        <span>31k followers</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i class="fa fa-instagram"></i>
                                        instagram
                                        <span>31k followers</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div class="widget subscribe-widget2">
                            <h2>Join Our Newsletter</h2>
                            <p>Sign up for our free newsletters to receive the latest news. Don't worry we won't do spam.</p>
                            <form class="subscibe-form">
                                <input type="text" name="email" id="email" placeholder="Enter Your Email Address" />
                                <input type="submit" id="submit" value="Subscribe" />
                            </form>
                        </div>

                        <div class="widget instagram-widget">
                            <h2>Our Latest Instagram Posts</h2>
                            <ul class="insta-list">
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/1.jpg')}}" alt=""></a></li>
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/2.jpg')}}" alt=""></a></li>
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/3.jpg')}}" alt=""></a></li>
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/4.jpg')}}" alt=""></a></li>
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/5.jpg')}}" alt=""></a></li>
                                <li><a href="#"><img src="{{ asset('images/upload/instagram/6.jpg')}}" alt=""></a></li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
