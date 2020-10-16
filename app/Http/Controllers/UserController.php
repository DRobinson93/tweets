<?php

namespace App\Http\Controllers;

use App\Post;
use App\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    /**
     * return the main page for a user
     *
     * @param $username
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index(String $username)
    {
        $id = User::where(['username' => $username])->first()->id;
        return view('user_profile')->with('userId', $id);
    }


    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $postIds = $user->posts()->pluck('id')->toArray();
        $rePostIds = $user->reposts()->pluck('post_id')->toArray();
        $allIds= array_merge($postIds, $rePostIds);
        $allPosts =  Post::whereIn('id', $allIds)->latest()->get();
        return response($allPosts);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function showStats(User $user)
    {
        return response([
            'posts_count' => $user->posts()->count(),
            'followers_count' => $user->followers()->count(),
            'following_count' => $user->following()->count(),
        ]);
    }
}
