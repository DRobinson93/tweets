<?php

namespace App\Http\Controllers;

use App\User;

class UserController extends Controller
{
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
        $posts = $user->posts()->get();
        return response($posts);
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
