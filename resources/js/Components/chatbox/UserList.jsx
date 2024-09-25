import React from 'react';

const UserList = ({ users, onSelectUser }) => {
    return (
        <div className="user-list">
            <h2>Utilisateurs</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id} onClick={() => onSelectUser(user)}>
                        {user.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;
