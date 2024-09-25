<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Team;
use App\Models\User;

class TeamUserTableSeeder extends Seeder
{
    public function run()
    {
        // Récupérer toutes les équipes
        $teams = Team::all();

        // Récupérer tous les utilisateurs
        $users = User::all();

        // S'assurer qu'il y a suffisamment d'utilisateurs
        if ($users->count() < 10) {
            return; // Arrête le seeder s'il n'y a pas assez d'utilisateurs
        }

        // Répartir les utilisateurs dans les équipes
        foreach ($teams as $team) {
            // Choisir un utilisateur aléatoire pour le rôle admin
            $admin = $users->random();
            $team->users()->attach($admin->id, ['role' => 'admin']);
            
            // Retirer l'admin choisi de la liste des utilisateurs restants
            $users = $users->where('id', '!=', $admin->id)->values();

            // Choisir d'autres utilisateurs pour le rôle membre (1 à 3 membres)
            foreach ($users->random(rand(1, 3)) as $member) {
                $team->users()->attach($member->id, ['role' => 'member']);
            }
        }
    }
}
