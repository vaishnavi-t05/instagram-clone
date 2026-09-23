import React from 'react'
import { useNavigate } from 'react-router-dom'
import Stories from './Stories'
import Posts from './Posts'
import './Feed.css'

const MobileTopBar = () => {
  const navigate = useNavigate();
  return (
    <div className="m-topbar">
      <span className="m-logo">
        <img src="/assets/instagram-images.png" alt="Instagram" />
        <i className="bi bi-chevron-down" />
      </span>
      <div className="m-search" onClick={() => navigate("/search")}>
        <i className="bi bi-search" />
        <span>Search</span>
      </div>
    </div>
  );
};


const Feed = () => {
  return (
    <div>
        <MobileTopBar />
        <div><Stories/></div>
        <div><Posts/></div>

    </div>
  )
}

export default Feed
