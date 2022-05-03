<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Auth::routes();

Route::get('/dashboard', [DashboardController::class, 'testDeleteLater'])->name('home');
//Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');

Route::get('/',[HomeController::class,'index'])->name('index');
Route::get('/posts',[HomeController::class,'archive'])->name('front.archive');
Route::get('/contact',[HomeController::class,'contact'])->name('front.contact');
Route::get('/posts/{post:slug}',[HomeController::class,'post'])->name('front.post');


Route::middleware('auth')->group(function(){
    Route::post('/posts/{post:slug}/comments/create',[CommentController::class,'store'])->name('comments.store');
    Route::put('/posts/{post:slug}/comments/update/{comment}',[CommentController::class,'update'])->name('comments.update');
    Route::delete('/posts/{post:slug}/comments/delete/{comment}',[CommentController::class,'delete'])->name('comments.delete');
    Route::get('/profile',[HomeController::class,'profile'])->name('front.profile');
});


Route::prefix('admin')->middleware('auth')->middleware('dashboardAccess')->group(function () {
    Route::get('/home', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('categories',CategoryController::class);
    Route::resource('posts',PostController::class);
    Route::resource('tags',TagController::class);
    Route::resource('users', UserController::class);
    Route::post('/users/{user}/block', [UserController::class,'block'])->name('users.block');
    Route::post('/users/{user}/unblock', [UserController::class,'unblock'])->name('users.unblock');
    Route::get('/comments',[CommentController::class,'index'])->name('comments.index');
    Route::delete('/comments/{comment}/delete',[CommentController::class,'adminDelete'])->name('comments.destroy');
});
