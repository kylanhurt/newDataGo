<?php

use Faker\Factory as Faker;

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

