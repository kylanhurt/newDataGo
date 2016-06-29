<?php
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class SampleUsersDbSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        DB::table('users')->delete();

        $users = array(
                ['username' => 'RyanChenkie', 'email' => 'ryanchenkie@gmail.com', 'password' => Hash::make('secret')],
                ['username' => 'ChrisSevilleja', 'email' => 'chris@scotch.io', 'password' => Hash::make('secret')],
                ['username' => 'HollyLloyd', 'email' => 'holly@scotch.io', 'password' => Hash::make('secret')],
                ['username' => 'AdnanKukic', 'email' => 'adnan@scotch.io', 'password' => Hash::make('secret')],
        );
            
        // Loop through each user above and create the record for them in the database
        foreach ($users as $user)
        {
            User::create($user);
        }
        Model::reguard();
    }
}
