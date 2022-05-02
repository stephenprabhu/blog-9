@extends('layouts.front')

@section('content')
<section class="page-banner-section">
    <div class="container">
        <h1>Create Account</h1>
    </div>
</section>
<section class="my-3">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">
                <form method="POST" action="{{ route('register') }}">
                    @csrf

                    <div class="mb-3">
                        <label for="name" class="col-form-label text-md-end">{{ __('Name') }}</label>
                        <input id="name"
                            type="text"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="name"
                            value="{{ old('name') }}"
                            required autocomplete="name" autofocus>

                        @error('name')
                            <span class="invalid-feedback" style="display: block"  role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>


                    <div class="mb-3">
                        <label for="username" class="col-form-label text-md-end">{{ __('Username') }}</label>
                        <input id="username"
                            type="text"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="username"
                            value="{{ old('username') }}"
                            required autocomplete="username" autofocus>

                        @error('username')
                            <span class="invalid-feedback" style="display: block"  role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="email" class="col-form-label text-md-end">{{ __('Email Address') }}</label>
                        <input
                            id="email"
                            type="email"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="email" value="{{ old('email') }}"
                            required autocomplete="email">
                        @error('email')
                            <span class="invalid-feedback" style="display: block"  role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="password" class="col-form-label text-md-end">{{ __('Password') }}</label>
                        <input
                            id="password"
                            type="password"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="password"
                            required autocomplete="new-password">
                        @error('password')
                            <span class="invalid-feedback" style="display: block"  role="alert">
                                <strong>{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>

                    <div class="mb-3">
                        <label for="password-confirm" class="col-form-label text-md-end">{{ __('Confirm Password') }}</label>
                        <input
                            id="password-confirm"
                            type="password"
                            class="custom-form-control-text"
                            style="margin:0"
                            name="password_confirmation"
                            required autocomplete="new-password">
                    </div>

                    <div class="row mb-0">
                        <div class="col-md-6 offset-md-4">
                            <button type="submit" class="contact-form__submit">
                                {{ __('Register') }}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
@endsection
