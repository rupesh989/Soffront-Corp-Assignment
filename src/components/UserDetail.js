import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserDetail.css'; 

const UserDetail = ({ username }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`https://api.github.com/users/${username}`);
        const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
        setUserDetails(userResponse.data);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  if (!userDetails) {
    return <div className="user-detail-container">Loading...</div>;
  }

  return (
    <div className="user-detail-container">
      <div className="user-detail-header">
        <img src={userDetails.avatar_url} alt={`${userDetails.login}'s avatar`} className="user-avatar" />
        <div className="user-info">
          <h1 className="user-name">{userDetails.name || userDetails.login}</h1>
          <p className="user-bio">{userDetails.bio || 'No bio available'}</p>
          <a href={userDetails.html_url} target="_blank" rel="noopener noreferrer" className="user-profile-link">
            View Profile
          </a>
        </div>
      </div>
      <div className="repos-section">
        <h2>Repositories</h2>
        {repos.length > 0 ? (
          <ul className="repo-list">
            {repos.map((repo) => (
              <li key={repo.id} className="repo-item">
                <h3 className="repo-name">{repo.name}</h3>
                <p className="repo-language">Language: {repo.language || 'Not specified'}</p>
                <div className="repo-stats">
                  <span className="repo-stars">⭐ {repo.stargazers_count}</span>
                  <span className="repo-forks">🍴 {repo.forks_count}</span>
                  <span className="repo-issues">📝 {repo.open_issues_count}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No repositories found.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetail;
