import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import ChatWindow from './ChatWindow';

const ChatApp = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const currentUser = { id: 1, name: 'Vous' }; // Remplacez cela par l'utilisateur connecté

    useEffect(() => {
        // Ici, tu peux récupérer la liste des utilisateurs de l'API
        // getUsers().then(setUsers);
    }, []);

    return (
        <div className="chat-app">
            <UserList users={users} onSelectUser={setSelectedUser} />
            <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
        </div>
    );
};

export default ChatApp;
