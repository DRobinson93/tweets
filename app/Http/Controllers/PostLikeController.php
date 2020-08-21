<?php

namespace App\Http\Controllers;

use App\Post;
use App\PostLike;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostLikeController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param Post $post
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Post $post)
    {
        $postlike = new PostLike(['user_id' => Auth::user()->id]);

        $post->likes()->save($postlike);
        return response($postlike);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param PostLike $like
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(PostLike $like)
    {
        return response($like->delete());
    }
}
