<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Follower extends Model
{
    public function followingUser()
    {
        return $this->belongsTo('App\User', 'follower_user_id');
    }

    public function followerUser()
    {
        return $this->belongsTo('App\User');
    }
}
