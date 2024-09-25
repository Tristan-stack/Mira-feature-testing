import React, { useState, useEffect } from 'react';

const ChatWindow = ({ selectedUser, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {
        // Ici, tu peux récupérer les messages de l'API
        // getMessages(currentUser.id, selectedUser.id).then(setMessages);
    }, [currentUser, selectedUser]);

    const sendMessage = () => {
        // Ici, tu peux envoyer le message à l'API
        // sendMessageAPI(currentUser.id, selectedUser.id, messageContent);
        setMessageContent('');
    };

    if (!selectedUser) return <div>Sélectionnez un utilisateur pour chatter.</div>;

    return (
        <div className="chat-window">
            <h2>Discussion avec {selectedUser.name}</h2>
            <div className="messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={msg.sender_id === currentUser.id ? 'my-message' : 'their-message'}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <input
                type="text"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Écrivez un message..."
            />
            <button onClick={sendMessage}>Envoyer</button>
        </div>
    );
};

export default ChatWindow;
