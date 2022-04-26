@extends('layouts.front')

@section('content')
<section class="page-banner-section">
    <div class="container">
        <h1>Login</h1>
    </div>
</section>

<section class="my-3">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <form method="POST" action="{{ route('login') }}">
                    @csrf

                    <div class="mb-3">
                        <label
                            for="email"
                            class=" col-form-label text-md-end">
                            {{ __('Email Address') }}
                        </label>
                        <input
                            id="email"
                            type="email"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="email"
                            value="{{ old('email') }}"
                            required
                            placeholder="john@email.com"
                            autocomplete="email"
                            autofocus />

                        @error('email')
                            <span class="invalid-feedback" style="display: block" role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                            <label for="password" class=" col-form-label text-md-end">{{ __('Password') }}</label>
                            <input
                                id="password"
                                type="password"
                                style="margin:0"
                                class="custom-form-control-text"
                                name="password"
                                required
                                placeholder="secret"
                                autocomplete="current-password">

                            @error('password')
                                <span class="invalid-feedback" style="display: block"  role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6 offset-md-4">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" name="remember" id="remember" {{ old('remember') ? 'checked' : '' }}>

                                <label class="form-check-label" for="remember">
                                    {{ __('Remember Me') }}
                                </label>
                            </div>
                        </div>
                    </div>

                        <div class="text-center">
                            <button type="submit" class="contact-form__submit">
                                {{ __('Login') }}
                            </button>

                            @if (Route::has('password.request'))
                                <a class="btn btn-link" href="{{ route('password.request') }}">
                                    {{ __('Forgot Your Password?') }}
                                </a>
                            @endif
                        </div>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection
