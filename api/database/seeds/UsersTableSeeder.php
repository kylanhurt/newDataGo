<?php

use Faker\Factory as Faker;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class UsersTableSeeder extends Seeder {
    public function run() {
        $faker = Faker::create();
        foreach(range(1,10) as $index) {
            User:: create([
                'email'=> $faker->email(),
                'username'=> $faker->word(),
                'password'=> $faker->password()
            ]);
        }
    }
}

