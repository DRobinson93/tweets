<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        factory(App\User::class, 10)->create()->each(function ($user) {
            // give the user a random amount of posts
            $posts = factory(App\Post::class, rand(0,10))->make();
            $user->posts()->saveMany($posts);
            $user->posts()->each(function($post){
                //foreach post, give it comments ..reqs a user to comment
                $comments = factory(App\Comment::class, rand(1,10))->make();
                foreach($comments as &$comment){
                    $comment['user_id'] = factory(App\User::class)->create()->id;
                }
                $post->likes()->saveMany($comments);
                //foreach post, give it likes ..this requires a user to like it
                $postlikes = factory(App\PostLike::class, rand(1,10))->make();
                foreach($postlikes as &$postlike){
                    $postlike['user_id'] = factory(App\User::class)->create()->id;
                }
                $post->likes()->saveMany($postlikes);
            });
        });
    }
}
