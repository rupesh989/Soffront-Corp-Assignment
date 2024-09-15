import React from 'react';

const SortFilter = ({ sortUsers }) => {
  return (
    <div className="sort-filter">
      <select onChange={(e) => sortUsers(e.target.value)}>
        <option value="name-asc">Name (A - Z)</option>
        <option value="name-desc">Name (Z - A)</option>
        <option value="rank-asc">Rank ↑</option>
        <option value="rank-desc">Rank ↓</option>
      </select>
    </div>
  );
};

export default SortFilter;
