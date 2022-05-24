@extends('layouts.front')

@section('content')
<section class="page-banner-section">
    <div class="container">
        <h1>Confirm Password</h1>
    </div>
</section>

<section class="my-3">
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-5">
                  @if($deleteConfirmation ?? false)
                    <h3>DELETING YOUR ACCOUNT WILL:</h3>
                    <ul>
                        <li>Delete your login credentials from the website and restrict you from logging into your account</li>
                        <li>Delete all comments posted using your account</li>
                    </ul>

                    <h3 style="color:#E74C3C"><strong>This is a premanent action and it cannot be reversed</strong></h3>
                  @endif


                    <h6 class="mb-3 text-center text-black">
                        {{ __('Please confirm your password before continuing.') }}
                    </h6>


                    <form method="POST" action="{{ route('password.confirm') }}">
                        @csrf

                        @if($deleteConfirmation ?? false)
                            <input type="hidden" name="delete_token"  value="{{auth()->user()->id}}" />
                        @endif

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
                                value="{{ old('password') }}"
                                required
                                autocomplete="current-password"
                                autofocus />

                            @error('password')
                                <span class="invalid-feedback" style="display: block" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                        </div>

                        <div class="text-center">
                            <button type="submit" class="contact-form__submit">
                                {{ __('Confirm Password') }}
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
