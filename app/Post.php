<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    const REPOST_OWN_POST_ERROR = 'You can not repost your own post';

    protected $appends = ['auth_user_like_id', 'auth_user_retweet_id', 'user', 'likes_count', 'comments_count', 'reposts_count', 'is_auth_users'];

    protected $fillable = [
        'value', 'user_id'
    ];

    public function getLikesCountAttribute()
    {
        return $this->likes()->count();
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments()->count();
    }

    public function getRepostsCountAttribute()
    {
        return $this->reposts()->count();
    }

    public function getUserAttribute()
    {
        return $this->user()->first();
    }

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function likes()
    {
        return $this->hasMany('App\PostLike');
    }
    public function reposts()
    {
        return $this->hasMany('App\Repost');
    }
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function getIsAuthUsersAttribute()
    {
        return $this->id === Auth::id();
    }

    public function getAuthUserLikeIdAttribute()
    {
        $like = $this->likes()->where('user_id',  Auth::user()->id)->first();
        return $like->id ?? null;
    }

    public function getAuthUserRetweetIdAttribute()
    {
        $reposts = $this->reposts()->where('user_id',  Auth::user()->id)->first();
        return $reposts->id ?? null;
    }

    public function getCreatedAtAttribute($dateStr){
        $date = Carbon::parse($dateStr);
        return $date->diffForHumans(null, true, true);
    }

    protected $dates = [
        'created_at'
    ];
}
