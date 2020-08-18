<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'value', 'user_id'
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:00',
    ];
}
