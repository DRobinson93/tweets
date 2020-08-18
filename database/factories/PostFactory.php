<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Post;
use Faker\Generator as Faker;

$factory->define(post::class, function (Faker $faker) {
    return [
        'value' => $faker->text
    ];
});
