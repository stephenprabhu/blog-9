@extends('layouts.front')

@section('content')
<div class="container mt-4">
    <div class="row">
        <div class="col-4">
            <img src="{{Auth::user()->image_url}}" style="width: 250px; height:250px" />
            <h2 class="mt-3">{{ucfirst(Auth::user()->name)}}</h2>
            <small class="text-muted">Username:</small>   <h6>{{ucfirst(Auth::user()->username)}} </h6>
            <small class="text-muted">Email:</small><h6> {{ucfirst(Auth::user()->email)}}</h6>
            <div class="mt-3 mb-5">
                <button class="contact-form__submit mb-2">Edit Profile</button>
                <a href="{{route('password.confirm')}}" class="contact-form__submit">Send Password Reset Email</a>
                <button class="contact-form__submit mt-2">Delete My Account</button>
            </div>
        </div>
        <div class="col-8">
            <h2>Your Comments </h2>
            <hr />
            @foreach (Auth::user()->comments as $comment)
                <div class="card py-2 px-3 mb-2">
                    <small>On <strong>{{$comment->post->title ?? ''}}</strong></small>
                    {{$comment->message}}
                    <small>{{$comment->created_at->format('Y-m-d')}}</small>
                    <div class="flex">
                        <a href="#">Edit</a> |
                        <form
                        style="display: inline"
                        action="{{ route('comments.delete', ['post'=>$comment->post, 'comment'=> $comment]) }}"
                        method="POST"
                        onsubmit="return confirm('Are You Sure You Wish To Delete This Comment? This Cannot be undone.')"
                        >
                                @csrf @method('DELETE')
                                <button type="submit" style="color:#E74C3C; background:none; border:none">Delete</button>
                        </form>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
