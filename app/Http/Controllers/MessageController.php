<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    // Méthode pour envoyer un message
    public function sendMessage(Request $request)
    {
        $request->validate([
            'sender_id' => 'required|integer',
            'receiver_id' => 'required|integer',
            'content' => 'required|string',
        ]);

        $message = Message::create([
            'sender_id' => $request->sender_id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
        ]);

        return response()->json($message, 201);
    }

    // Méthode pour récupérer les messages d'une conversation
    public function getMessages(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'partner_id' => 'required|integer',
        ]);

        $messages = Message::where(function ($query) use ($request) {
            $query->where('sender_id', $request->user_id)
                  ->where('receiver_id', $request->partner_id);
        })->orWhere(function ($query) use ($request) {
            $query->where('sender_id', $request->partner_id)
                  ->where('receiver_id', $request->user_id);
        })->get();

        return response()->json($messages);
    }
}
