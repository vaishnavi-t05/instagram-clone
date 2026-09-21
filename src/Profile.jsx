import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Sidebar from "./Sidebar";
import { profile as profileData, posts as postsData } from "./data";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setProfile(profileData);

    // IMPORTANT:
    // Show only Edward's posts
    const myPosts = postsData.filter(
      (post) => post.username === profileData.username
    );

    setPosts(myPosts);
  }, []);

  if (!profile) {
    return (
      <div className="profile-layout">
        <Sidebar />
        <div className="profile-loading">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="profile-layout">
      <Sidebar />
    <div className="profile-page">

      {/* ================= HEADER ================= */}

      <div className="profile-header">

        <button
          className="back-btn"
          onClick={() => navigate("/home")}
        >
          ←
        </button>

        <h5>{profile.username}</h5>

        <span className="profile-head-actions">
          <span className="three-dots">
            ⋮
          </span>
          {/* <button
            className="profile-logout"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <i className="bi bi-box-arrow-right"></i>
          </button> */}
        </span>

      </div>


      {/* ================= PROFILE INFO ================= */}

      <div className="profile-info">

        <div className="profile-top">

          {/* PROFILE IMAGE */}

          <img
            src={profile.profilePic}
            alt={profile.username}
            className="profile-picture"
          />


          {/* COUNTS */}

          <div className="profile-counts">

            <div>
              <strong>{posts.length}</strong>
              <span>Posts</span>
            </div>

            <div>
              <strong>120</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>98</strong>
              <span>Following</span>
            </div>

          </div>

        </div>


        {/* ================= BIO ================= */}

        <div className="profile-bio">

          <strong>
            {profile.username}
          </strong>

          <p>
            Welcome to my profile ✨
          </p>

          <div className="banner">
          <small>
            +Add banners
          </small>
          </div>

        </div>


        {/* ================= BUTTONS ================= */}

        <div className="profile-buttons">

          <button className="follow-btn">
            Edit profile
          </button>

          <button className="message-btn">
            Share profile
          </button>

          <button className="person-btn">
            ♙+
          </button>

        </div>

      </div>


      {/* ================= HIGHLIGHTS ================= */}

      

      <div className="highlights">

        {/* Highlight 1 */}

        <div className="highlight">

          <div className="highlight-circle">

            <img
              src="/assets/150.jpg"
              alt="Travel"
            />

          </div>

          <span>Travel</span>

        </div>


        {/* Highlight 2 */}

        {/* <div className="highlight">

          <div className="highlight-circle">

            <img
              src="/assets/150.jpg"
              alt="Friends"
            />

          </div>

          <span>Friends</span> */}

        {/* </div> */}


        {/* Highlight 3 */}

        <div className="highlight">

          <div className="highlight-circle">

            <img
              src="/assets/150.jpg"
              alt="Life"
            />

          </div>

          <span>Life</span>

        </div>


        {/* Add Highlight */}

        <div className="highlight">

          <div className="highlight-circle add-highlight">
            +
          </div>

          <span>New</span>

        </div>

      </div>


      {/* ================= TABS ================= */}

      <div className="profile-tabs">

        <div className="active-tab">
          ▦
        </div>

        <div>
          ▶
        </div>

        <div>
          ♙
        </div>

      </div>


      {/* ================= POSTS ================= */}

      {posts.length === 0 ? (

        <div className="no-posts">

          <div className="camera-icon">
            ◎
          </div>

          <h4>
            No Posts Yet
          </h4>

        </div>

      ) : (

        <div className="profile-posts">

          {posts.map((post) => (

            <img
              key={post.id}
              src={post.image}
              alt={post.caption}
            />

          ))}

        </div>

      )}

    </div>
    </div>
  );
};

export default Profile;