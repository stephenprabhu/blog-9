<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use App\Models\Category;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('dashboard');
Route::get('/dashboard', [App\Http\Controllers\HomeController::class, 'testDeleteLater'])->name('home');
//Route::get('users/{user}/edit')->name('users.edit')->uses('UsersController@edit')->middleware('auth');

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::resource('categories',CategoryController::class);
    Route::resource('posts',PostController::class);
    Route::resource('tags',TagController::class);
    Route::resource('users', UserController::class);
});
