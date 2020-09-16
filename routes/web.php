<?php

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

Auth::routes();

Route::get('/', 'HomeController@index');

Route::get('posts/all', 'PostController@showAll');
Route::resource('posts', 'PostController');
Route::resource('postLikes', 'PostLikeController',  ['only' => ['destroy']]);
Route::post('postLikes/{post}', 'PostLikeController@store');
Route::resource('commentLikes', 'CommentLikeController',  ['only' => ['destroy']]);
Route::post('commentLikes/{post}', 'CommentLikeController@store');

Route::resource('comments', 'CommentController',  ['only' => ['destroy']]);
Route::post('comments/{post}', 'CommentController@store');
Route::get('comments/{post}', 'CommentController@show');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('users/{username}', 'UserController@index');
Route::get('users/posts/{user}', 'UserController@show');
Route::get('users/{user}/stats', 'UserController@showStats');

Route::post('following/{user}', 'FollowerController@store');
Route::get('following/{user}', 'FollowerController@showFollowing');
Route::get('followers/{user}', 'FollowerController@showFollowers');
