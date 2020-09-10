<?php

namespace Tests\Feature;

use App\Events\AvatarUploaded;
use App\Listeners\ResizeAvatar;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Mockery;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Storage;
use App\User;

class UserTest extends TestCase
{

    const FAKE_PWD = 'password123123';
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     * @throws \Exception
     */
    public function testRegister()
    {
        //todo clean this up, sep into smaller functions
        $this->withoutExceptionHandling();
        Event::fake();
        $user = factory('App\User')->make()->setAppends([]); //make does not persist to the db
        $user->avatar = UploadedFile::fake()->image('avatar.jpg');
        $arrUsersData = $user->toArray();
        $arrUsersData['password'] = self::FAKE_PWD;
        $arrUsersData['password_confirmation'] = self::FAKE_PWD;
        $response = $this->call('POST', '/register', $arrUsersData);
        $response->assertRedirect('/home');
        //asert without these to make data match what will be in the db
        foreach(['avatar', 'password', 'password_confirmation', 'email_verified_at'] as $unsetMe){
            unset($arrUsersData[$unsetMe]);
        }
        $this->assertDatabaseHas('users', $arrUsersData);
        //get user
        $user = User::where($arrUsersData)->first();
        $uncroppedImg = $user->avatar;
        Storage::disk('avatars')->assertExists($uncroppedImg);
        Event::assertDispatched(function (AvatarUploaded $event) use ($user) {
            return $event->user->id === $user->id;
        });

        $event = Mockery::mock(AvatarUploaded::class);
        $event->user = $user;

        $listener = app()->make(ResizeAvatar::class);
        $listener->handle($event);

        //this event removed the uncropped img, verify that
        Storage::disk('avatars')->assertMissing($uncroppedImg);
        $userAfterEvent = User::where('id', $user->id)->first();
        //assert the cropped img exists
        $croppedImg = $userAfterEvent->avatar;
        Storage::disk('avatars')->assertExists($croppedImg);
        //remove the cropped avatar from storage since this is a test
        Storage::disk('avatars')->delete($croppedImg);
    }
}
