<?php

namespace App\Http\Controllers;

use App\CommentLike;
use App\Post;
use Illuminate\Http\Request;

class CommentLikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Post $post
     * @return void
     */
    public function store(Request $request, Post $post)
    {
        $Commentlike = new CommentLike($request->all());

        $post->likes()->save($Commentlike);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param CommentLike $like
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(CommentLike $like)
    {
        return response($like->delete());
    }
}
