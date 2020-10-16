<?php

namespace App\Http\Controllers;

use App\Post;
use App\Repost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        $request->request->add(['user_id' => $user->id]);
        $child = $request->all();
        $child = new Post($child);
        $child->save();
        return response(Post::where(['id' => $child->id])->with('user')->first());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Post $post
     * @return \Illuminate\Http\Response
     */
    public function storeRepost(Post $post)
    {
        if($post->user->id === Auth::id()){
            abort(401, Post::REPOST_OWN_POST_ERROR);
        }
        $Repost = new Repost(['user_id' => Auth::id()]);
        $post->reposts()->save($Repost);
        return response($Repost);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        return response(
            Post::orderBy("created_at", 'desc')->get()->toJson()
        );
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Repost $repost
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroyRepost(Repost $repost)
    {
        return response($repost->delete());
    }
}
