@extends('layouts.front')

@section('content')
<section class="page-banner-section">
    <div class="container">
        <h1>Reset Password</h1>
    </div>
</section>

<section class="my-3">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-5">

                        <form method="POST" action="{{ route('password.update') }}">
                            @csrf

                            <input type="hidden" name="token" value="{{ $token }}">

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
                                    value="{{ $email ?? old('email') }}"
                                    required
                                    autocomplete="email"
                                     />

                                @error('email')
                                    <span class="invalid-feedback" style="display: block" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label
                                    for="password"
                                    class=" col-form-label text-md-end">
                                    {{ __('Password') }}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    class="custom-form-control-text"
                                    style="margin:0"
                                    name="password"
                                    required
                                    autocomplete="new-password"
                                    autofocus />

                                @error('password')
                                    <span class="invalid-feedback" style="display: block" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label
                                    for="password-confirm"
                                    class=" col-form-label text-md-end">
                                    {{ __('Confirm Password') }}
                                </label>
                                <input
                                    id="password-confirm"
                                    type="password"
                                    class="custom-form-control-text"
                                    style="margin:0"
                                    name="password_confirmation"
                                    required
                                    autocomplete="new-password"
                                    autofocus />
                            </div>
                            <div class="text-center">
                                <button type="submit" class="contact-form__submit">
                                    {{ __('Reset Password') }}
                                </button>

                            </div>

                        </form>
            </div>
        </div>
    </div>
</section>
@endsection
