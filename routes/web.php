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
