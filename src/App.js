import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import SortFilter from './components/SortFilter';
import './styles/styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null); 
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1); 
  const [selectedUser, setSelectedUser] = useState(null); 
  
  const sortUsers = (sortType) => {
    const sortedUsers = [...users];
    if (sortType === 'name-asc') {
      sortedUsers.sort((a, b) => a.login.localeCompare(b.login));
    } else if (sortType === 'name-desc') {
      sortedUsers.sort((a, b) => b.login.localeCompare(a.login));
    }
    setUsers(sortedUsers);
  };


  const showUserDetails = (username) => {
    setSelectedUser(username);
  };

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePreviousPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

  return (
    <div className="app-container">
      <div className="header">
        <SortFilter sortUsers={sortUsers} />
        <SearchBar 
          setUsers={setUsers} 
          setPagination={setPagination} 
          query={query} 
          setQuery={setQuery} 
          page={page} 
        />
      </div>
      <UserList users={users} showUserDetails={showUserDetails} />
      {pagination && pagination.total_count > 0 && (
        <div className="pagination-controls">
          <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
      {selectedUser && <UserDetail username={selectedUser} />}
    </div>
  );
};

export default App;
