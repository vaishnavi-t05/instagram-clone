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
  const [expanded, setExpanded] = useState(false);

  // hovering ONLY the Instagram logo expands the rail and reveals every name
  const expBar = expanded ? { width: 220 } : undefined;
  const expItem = expanded
    ? { width: "100%", justifyContent: "flex-start" }
    : undefined;
  const labelStyle = expanded
    ? {
        position: "static",
        opacity: 1,
        visibility: "visible",
        transform: "none",
        background: "none",
        color: "#262626",
        boxShadow: "none",
        padding: 0,
        marginLeft: 12,
        whiteSpace: "nowrap",
      }
    : undefined;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="sidebar m-3 position-fixed sidebar-section"
      style={expBar}
      onMouseLeave={() => setExpanded(false)}
    >

      {/* TOP SIDEBAR */}
      <div className="sidebar-top d-flex flex-column gap-3">

        {/* INSTAGRAM LOGO */}
        <img
          className="logo-text m-2"
          src="/assets/images.png"
          alt=""
          onMouseEnter={() => setExpanded(true)}
          style={{ cursor: "pointer" }}
        />

        {/* HOME */}
        <div
          className="sidebar-item"
          style={expItem}
          onClick={() => navigate("/home")}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-house-door-fill"></i>
          </span>
          <span className="sidebar-label" style={labelStyle}>Home</span>
        </div>

        {/* REELS */}
        <div className="sidebar-item" onClick={() => navigate("/reels")} style={expItem}>
          <span className="sidebar-icon-wrap">
            <i className="bi bi-file-play"></i>
          </span>
          <span className="sidebar-label" style={labelStyle}>Reels</span>
        </div>

        {/* MESSAGES */}
        <div
          className="sidebar-item"
          onClick={() => { setUnreadMessages(0); navigate("/messages"); }}
          style={expItem}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-send"></i>
            {unreadMessages > 0 && (
              <span className="sidebar-badge">{unreadMessages}</span>
            )}
          </span>
          <span className="sidebar-label" style={labelStyle}>Messages</span>
        </div>

        {/* SEARCH */}
        <div className="sidebar-item" onClick={() => navigate("/search")} style={expItem}>
          <span className="sidebar-icon-wrap">
            <i className="bi bi-search"></i>
          </span>
          <span className="sidebar-label" style={labelStyle}>Search</span>
        </div>

        {/* NOTIFICATIONS */}
        <div
          className="sidebar-item"
          onClick={() => { setShowNotif((v) => !v); setUnreadNotifs(0); }}
          style={expItem}
        >
          <span className="sidebar-icon-wrap">
            <i className="bi bi-heart"></i>
            {unreadNotifs > 0 && (
              <span className="sidebar-dot" />
            )}
          </span>
          <span className="sidebar-label" style={labelStyle}>Notifications</span>
        </div>

        {/* CREATE */}
        <div className="sidebar-item" style={expItem}>
          <span className="sidebar-icon-wrap">
            <i className="bi bi-plus-square"></i>
          </span>
          <span className="sidebar-label" style={labelStyle}>Create</span>
        </div>

        {/* PROFILE */}
        <div
          className="sidebar-item "
          onClick={() => navigate("/profile")}
          style={expItem}
        >
          <img
            src="/assets/150.jpg"
            className="rounded-circle sidebar-profile"
            alt="Profile"
          />
          <span className="sidebar-label" style={labelStyle}>Profile</span>
        </div>

      </div>

      {/* BOTTOM SIDEBAR */}
      <div className="sidebar-bottom position-fixed bottom-0 d-flex flex-column gap-3 mb-3">

        {/* THREADS */}
        <div className="sidebar-item" style={expItem}>
          <i className="bi bi-threads"></i>
          <span className="sidebar-label" style={labelStyle}>Threads</span>
        </div>

        {/* MORE */}
        <div className="sidebar-item" style={expItem}>
          <i className="bi bi-list"></i>
          <span className="sidebar-label" style={labelStyle}>More</span>
        </div>

        {/* LOGOUT */}
        <div
          className="sidebar-item"
          onClick={handleLogout}
          style={expItem}
        >
          <i className="bi bi-box-arrow-right"></i>
          <span className="sidebar-label" style={labelStyle}>Logout</span>
        </div>

      </div>

      {showNotif && <Notifications onClose={() => setShowNotif(false)} />}

    </div>
  );
};

export default Sidebar;
