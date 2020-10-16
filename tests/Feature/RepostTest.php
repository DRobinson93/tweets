<?php

namespace Tests\Feature;

use App\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\User;

class RepostTest extends TestCase
{
    use RefreshDatabase, WithFaker;
    protected static $user1, $postForUser1, $postForRandUser;
    const Repost_Route_Name = 'repost.store';

    public function setUp() :void
    {
        parent::setUp();
        self::$user1 = factory(User::class)->create();
        self::$postForUser1 = factory(Post::class)->create(['user_id' =>self::$user1->id]);
        self::$postForRandUser = factory(Post::class)->create(['user_id' =>factory(User::class)->create()->id]);
    }

    public function testCanNotRepostWithoutUser(){

        $response = $this
            ->postJson(route(self::Repost_Route_Name, self::$postForRandUser));
        $response->assertUnauthorized();
    }

    /**
     *
     * @return void
     */
    public function testUserCanNotRepostTheirOwnPost()
    {
        $response = $this
            ->actingAs(self::$user1)
            ->postJson(route(self::Repost_Route_Name, ['post'=>self::$postForUser1]));
        $response->assertUnauthorized();
        $this->assertEquals($response['message'], Post::REPOST_OWN_POST_ERROR);
    }

    /**
     *
     * @return void
     */
    public function testRepostAppearsInUsersPost()
    {
        //repost it.. then check its in the return from the users
    }
}
