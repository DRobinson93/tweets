<?php

namespace App\Http\Controllers;

use App\Post;
use App\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{

    /**
     * Display the specified resource.
     *
     * @param  \App\post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response($post->comments()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param Post $post
     * @return \Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Request $request, Post $post)
    {
        $comment = new Comment(['user_id' => Auth::user()->id, 'value'=>$request->value]);

        $post->comments()->save($comment);
        return response($comment);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Comment $comment
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Comment $comment)
    {
        return response($comment->delete());
    }
}
