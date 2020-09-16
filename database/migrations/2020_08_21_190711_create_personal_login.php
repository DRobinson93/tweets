<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class CreatePersonalLogin extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    const NAME = 'Admin User';
    public function up()
    {
        DB::table('users')->insert([
            'name' => self::NAME,
            'email' => env('ADMIN_EMAIL'),
            'username' => env('ADMIN_USERNAME'),
            'password' => Hash::make(env('ADMIN_PASS')),
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::table('users')->where('name', self::NAME)->delete();
    }
}
