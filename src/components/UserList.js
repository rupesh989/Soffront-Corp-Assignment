import React from 'react';

const UserList = ({ users, showUserDetails }) => {
  return (
    <ul className="user-list">
      {users.map((user) => (
        <li key={user.id} className="user-item">
          <img src={user.avatar_url} alt={user.login} width="50" />
          <span>{user.login}</span>
          <button onClick={() => showUserDetails(user.login)}>Details</button>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
