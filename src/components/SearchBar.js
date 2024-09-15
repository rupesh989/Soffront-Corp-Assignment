import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchBar = ({ setUsers, setPagination, query, setQuery, page }) => {
  const searchUsers = async () => {
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}&page=${page}&per_page=10`);
      setUsers(response.data.items);
      setPagination(response.data); 
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    if (query.length > 2) {
      searchUsers();
    }
  }, [query, page]);

  return (
   <div className="search-bar">
      <input
        type="text"
        placeholder="Search GitHub Users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
    
  
   
  );
};

export default SearchBar;
