import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="sidebar m-3 position-fixed sidebar-section">

      {/* TOP SIDEBAR */}
      <div className="sidebar-top d-flex flex-column gap-3">

        <img
          className="logo-text"
          src="/assets/instagram-images.png"
          alt=""
        />

        <div className="sidebar-item">
          <i className="bi bi-house-door-fill"></i>
          <span className="sidebar-label">Home</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-search"></i>
          <span className="sidebar-label">Search</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-compass"></i>
          <span className="sidebar-label">Explore</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-play-btn"></i>
          <span className="sidebar-label">Reels</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-chat"></i>
          <span className="sidebar-label">Messages</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-heart"></i>
          <span className="sidebar-label">Notifications</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-plus-square"></i>
          <span className="sidebar-label">Create</span>
        </div>
        <div className="sidebar-item">
  <img
  src="/assets/profile.jpg"
  className="rounded-circle sidebar-profile"
  onClick={() => navigate("/profile")}
  style={{ cursor: "pointer" }}
/>
  <span className="sidebar-label">Profile</span>
</div>

      </div>


      {/* BOTTOM SIDEBAR */}
      <div className="sidebar-bottom position-fixed bottom-0 d-flex flex-column gap-3 mb-3">

        <div className="sidebar-item">
          <i className="bi bi-threads"></i>
          <span className="sidebar-label">Threads</span>
        </div>

        <div className="sidebar-item">
          <i className="bi bi-list"></i>
          <span className="sidebar-label">More</span>
        </div>

        {/* LOGOUT */}
        <div
          className="sidebar-item"
          onClick={handleLogout}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="sidebar-label">Logout</span>
        </div>

      </div>

    </div>
  )
}

export default Sidebar