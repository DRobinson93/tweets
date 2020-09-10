<?php

namespace App\Listeners;

use App\Events\AvatarUploaded;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Storage;
use Image;

class ResizeAvatar implements ShouldQueue
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  AvatarUploaded  $event
     * @return void
     */
    public function handle(AvatarUploaded $event)
    {
        $fullPath = url('avatars/'.$event->user->avatar);
        $info = pathinfo($fullPath);
        $newName = $info['filename'].'.jpg';
        //resize img
        $resize = Image::make($fullPath)->fit(300);
        //delete uncompressed img
        Storage::disk('avatars')->delete($info['basename']);
        //save new compressed img locally
        $resize->save(storage_path('app/public/avatars/'.$newName));
        //update user obj avatar path and save it
        $event->user->avatar = $newName;
        $event->user->save();
    }
}
