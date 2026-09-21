import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Sidebar = () => {
  const [showNotif, setShowNotif] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState(7);
  const [unreadNotifs, setUnreadNotifs] = useState(1);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sidebar m-3 position-fixed sidebar-section">

      {/* TOP SIDEBAR */}
      <div className="sidebar-top d-flex flex-column gap-3">

        {/* INSTAGRAM LOGO */}
        <img
          className="logo-text m-2"
          src="/assets/images.png"
          alt=""
        />

        {/* HOME */}
        <div
          className="sidebar-item"
          onClick={() => navigate("/home")}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-house-door-fill"></i>
          </span>
          <span className="sidebar-label">Home</span>
        </div>

        {/* REELS */}
        <div className="sidebar-item" onClick={() => navigate("/reels")} style={{ cursor: "pointer" }}>
          <span className="sidebar-icon-wrap">
            <i className="bi bi-file-play"></i>
          </span>
          <span className="sidebar-label">Reels</span>
        </div>

        {/* MESSAGES */}
        <div
          className="sidebar-item"
          onClick={() => { setUnreadMessages(0); navigate("/messages"); }}
          style={{ cursor: "pointer" }}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-send"></i>
            {unreadMessages > 0 && (
              <span className="sidebar-badge">{unreadMessages}</span>
            )}
          </span>
          <span className="sidebar-label">Messages</span>
        </div>

        {/* SEARCH */}
        <div className="sidebar-item" onClick={() => navigate("/search")} style={{ cursor: "pointer" }}>
          <span className="sidebar-icon-wrap">
            <i className="bi bi-search"></i>
          </span>
          <span className="sidebar-label">Search</span>
        </div>

        {/* NOTIFICATIONS */}
        <div
          className="sidebar-item"
          onClick={() => { setShowNotif((v) => !v); setUnreadNotifs(0); }}
          style={{ cursor: "pointer" }}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-heart"></i>
            {unreadNotifs > 0 && (
              <span className="sidebar-dot" />
            )}
          </span>
          <span className="sidebar-label">Notifications</span>
        </div>

        {/* CREATE */}
        <div className="sidebar-item">
          <span className="sidebar-icon-wrap">
            <i className="bi bi-plus-square"></i>
          </span>
          <span className="sidebar-label">Create</span>
        </div>

        {/* PROFILE */}
        <div
          className="sidebar-item "
          onClick={() => navigate("/profile")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="public/assets/150.jpg"
            className="rounded-circle sidebar-profile m-3"
            alt="Profile"
          />
          <span className="sidebar-label">Profile</span>
        </div>

      </div>

      {/* BOTTOM SIDEBAR */}
      <div className="sidebar-bottom position-fixed bottom-0 d-flex flex-column gap-3 mb-3">

        {/* THREADS */}
        <div className="sidebar-item">
          <i className="bi bi-threads"></i>
          <span className="sidebar-label">Threads</span>
        </div>

        {/* MORE */}
        <div className="sidebar-item">
          <i className="bi bi-list"></i>
          <span className="sidebar-label">More</span>
        </div>

        {/* LOGOUT */}
        <div
          className="sidebar-item"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="sidebar-label">Logout</span>
        </div>

      </div>

      {showNotif && <Notifications onClose={() => setShowNotif(false)} />}

    </div>
  );
};

export default Sidebar;
