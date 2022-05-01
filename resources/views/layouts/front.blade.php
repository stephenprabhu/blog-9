<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Laravel Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <meta name="description" content="{{$meta_description ?? 'Stephens Blog. A Cool Blog'}}">
    <meta name="keywords" content="{{$meta_keywords ?? 'Personal Blog'}}">
    <!-- Theme fonts -->

	<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,400i,500,500i,700,700i,900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <!-- Styles -->
    {{-- <link href="{{ asset('css/app.css') }}" rel="stylesheet"> --}}
	<link rel="stylesheet" href="{{ asset('css/mite-assets.min.css') }}">
	<link rel="stylesheet" type="text/css" href="{{ asset('css/style.css') }}">

</head>
<body>
        <header class="clearfix">

			<nav class="navbar navbar-expand-lg navbar-light bg-light">
				<div class="container">

					<a class="navbar-brand" href="index.html">
						<img src="images/logo.png" alt="">
					</a>

					<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>

					<div class="collapse navbar-collapse" id="navbarSupportedContent">
						<ul class="navbar-nav m-auto">
							<li class="drop-link">
								<a class="{{Request::is('/*')? 'active': ''}}"  href="/">Home</a>
							</li>
							<li class="drop-link">
								<a class="{{Request::is('archive')? 'active': ''}}" href="{{ route('front.archive')}}">Archive</a>
							</li>
							<li class="drop-link">
								<a class="{{Request::is('about')? 'active': ''}}" href="/">About</a>
							</li>
							<li>
                                <a class="{{Request::is('contact')? 'active': ''}}" href="{{ route('front.contact')}}">Contact</a>
                            </li>
						</ul>
					</div>
                    @if (Route::has('login'))
                        <div class="hidden fixed top-0 right-0 px-6 sm:block">
                            <ul class="navbar-nav m-auto">
                                @auth
                                    <li class="drop-link">
                                        <a>{{Auth::user()->name}} <i class="fa fa-angle-down" aria-hidden="true"></i></a>
                                        <ul class="dropdown">
                                            @if(Auth::user()->role == 1 || Auth::user()->role ==2)
                                                <li><a href="{{ route('dashboard') }}">Dashboard</a></li>
                                            @endif
                                            <li><a href="/profile">My Profile</a></li>
                                            <li>
                                                <form action="/logout" method="POST">
                                                    @csrf
                                                    <button style="background: none; border:none">Logout</button>
                                                </form>
                                            </li>
                                        </ul>
                                    </li>
                                @else
                                    <li class="drop-link">
                                        <a href="{{ route('login') }}">Log in</a>
                                    </li>

                                    @if (Route::has('register'))
                                        <li class="drop-link">
                                            <a href="{{ route('register') }}">Register</a>
                                        </li>
                                    @endif
                                @endauth
                            </ul>
                        </div>
                    @endif
				</div>
			</nav>
		</header>
        <main>
            @yield('content')
        </main>

        <div class="preloader">
            <img alt="" src="/images/loader.gif">
        </div>

            <!-- footer -->

    <footer>
        <div class="container">

            <h3>stephenprabhu.com</h3>
            <p class="copyright-line">© Copyright {{\Carbon\Carbon::now()->format('Y')}} - All rights reserved.</p>
            <ul class="social-list">
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin"></i></a></li>
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-instagram"></i></a></li>
            </ul>

        </div>

    </footer>


    <script src="{{ asset('js/mite-plugins.min.js') }}"></script>
	<script src="{{ asset('js/bootstrap.min.js') }}"></script>
	<script src="{{ asset('js/script.js') }}"></script>
</body>
</html>
