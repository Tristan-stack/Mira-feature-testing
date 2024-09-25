<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();

        // Crée 10 utilisateurs
        for ($i = 0; $i < 10; $i++) {
            User::firstOrCreate([
                'email' => $faker->unique()->safeEmail, // Vérifie l'unicité par email
            ], [
                'name' => $faker->name,
                'password' => bcrypt('password'), // Utiliser un mot de passe par défaut
                'img_profile' => null, // Ou générer un lien d'image aléatoire
                'role' => 'user', // Par défaut, tous sont des utilisateurs
            ]);
        }
    }
}
