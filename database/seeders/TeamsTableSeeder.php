<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;

class TeamsTableSeeder extends Seeder
{
    public function run()
    {
        Team::create([
            'name' => 'Équipe Alpha',
        ]);

        Team::create([
            'name' => 'Équipe Bêta',
        ]);

        Team::create([
            'name' => 'Équipe Gamma',
        ]);
    }
}

