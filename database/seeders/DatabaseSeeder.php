<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
{
    $this->call([
        TeamsTableSeeder::class,
        UsersTableSeeder::class,
        TeamUserTableSeeder::class,
        // Ajoute d'autres seeders ici si nécessaire
    ]);
}

}
