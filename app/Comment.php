<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'value', 'user_id', 'post_id',
    ];

    protected $appends = ['user'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function getUserAttribute()
    {
        return $this->user()->first();
    }
}
