<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
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
}
