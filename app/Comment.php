<?php

namespace App;

use Carbon\Carbon;
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

    public function getCreatedAtAttribute($dateStr){
        $date = Carbon::parse($dateStr);
        return $date->diffForHumans(null, true, true);
    }
}
