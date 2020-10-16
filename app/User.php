<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    public $timestamps = true;

    protected $appends = ['avatar_public_url', 'first_name'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'username', 'avatar', 'created_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    public function following()
    {
        return $this->hasMany('App\Follower', 'follower_user_id');
    }

    public function followers()
    {
        return $this->hasMany('App\Follower');
    }

    public function getAvatarPublicUrlAttribute()
    {
        return url('avatars/'.$this->avatar);
    }

    public function getFirstNameAttribute()
    {
        $parts = explode(" ", $this->attributes['name']);
        return $parts[0];
    }

    public function getCreatedAtAttribute($dateStr){
        $date = Carbon::parse($dateStr);
        return $date->diffForHumans(null, true, true);
    }

    public function reposts()
    {
        return $this->hasMany('App\Repost');
    }
}
