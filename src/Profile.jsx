import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Get your profile
    fetch("http://localhost:3000/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      })
      .catch((err) => console.log(err));

    // Get posts
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!profile) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="profile-page">

      {/* TOP HEADER */}
      <div className="profile-header">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ←
        </button>

        <h5>{profile.username}</h5>

        <span className="three-dots">⋮</span>

      </div>


      {/* PROFILE DETAILS */}
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
              <strong>{profile.followers || 0}</strong>
              <span>Followers</span>
            </div>

            <div>
              <strong>{profile.following || 0}</strong>
              <span>Following</span>
            </div>

          </div>

        </div>


        {/* NAME + BIO */}
        <div className="profile-bio">

          <strong>
            {profile.name || profile.username}
          </strong>

          <p>
            {profile.bio || "Welcome to my profile ✨"}
          </p>

          <small>
            @{profile.username}
          </small>

        </div>


        {/* BUTTONS */}
        <div className="profile-buttons">

          <button className="follow-btn">
            Follow
          </button>

          <button className="message-btn">
            Message
          </button>

          <button className="person-btn">
            ♙+
          </button>

        </div>

      </div>


      {/* HIGHLIGHTS */}
      <div className="highlights">

        <div className="highlight">

          <div className="highlight-circle">
            <img
              src={profile.profilePic}
              alt="Travel"
            />
          </div>

          <span>Travel</span>

        </div>


        <div className="highlight">

          <div className="highlight-circle">
            <img
              src={profile.profilePic}
              alt="Friends"
            />
          </div>

          <span>Friends</span>

        </div>


        <div className="highlight">

          <div className="highlight-circle">
            <img
              src={profile.profilePic}
              alt="Life"
            />
          </div>

          <span>Life</span>

        </div>


        {/* ADD HIGHLIGHT */}
        <div className="highlight">

          <div className="highlight-circle add-highlight">
            +
          </div>

          <span>New</span>

        </div>

      </div>


      {/* PROFILE TABS */}
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


      {/* POSTS */}
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
              alt="post"
            />

          ))}

        </div>

      )}

    </div>
  );
};

export default Profile;