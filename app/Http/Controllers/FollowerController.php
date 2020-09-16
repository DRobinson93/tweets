<?php

namespace App\Http\Controllers;

use App\Follower;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FollowerController extends Controller
{
    const FOLLOWER_COL_NAME = 'follower_user_id';
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function store(User $user)
    {
        //follower_user_id is the user signed in
        $result = $user->followers()->create([self::FOLLOWER_COL_NAME, Auth::id()]);
        return response($result);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function showFollowers(User $user)
    {
        $userIds =  $user->followers()->pluck(self::FOLLOWER_COL_NAME);
        $followers =  User::whereIn('id', $userIds)->latest()->get();
        return response($followers);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return \Illuminate\Http\Response
     */
    public function showFollowing(User $user)
    {
        return response($user->following()->get());
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Follower  $followers
     * @return \Illuminate\Http\Response
     */
    public function edit(Follower $follower)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Follower  $followers
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Follower $follower)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Follower  $followers
     * @return \Illuminate\Http\Response
     */
    public function destroy(Follower $follower)
    {
        //
    }
}
