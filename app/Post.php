<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{
    protected $appends = ['auth_user_like_id'];

    protected $fillable = [
        'value', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function likes()
    {
        return $this->hasMany('App\PostLike');
    }
    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function getAuthUserLikeIdAttribute()
    {
        $like = $this->likes()->where('user_id',  Auth::user()->id)->first();
        return $like->id ?? null;
    }


    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:00',
    ];
}
