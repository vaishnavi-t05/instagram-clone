import React, { useState } from "react";
import { posts as postsData } from "./data";
import "./ProfilePreview.css";

const fmt = (n) =>
  n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : `${n}`;

const titleName = (username) =>
  String(username)
    .replace(/[_.]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim() || username;

const ProfilePreview = ({ username, onClose }) => {
  const [following, setFollowing] = useState(false);

  const userPosts = postsData.filter((p) => p.username === username);
  const seed = [...username].reduce((a, c) => a + c.charCodeAt(0), 0);
  const followers = 800 + ((seed * 137) % 9000);
  const followingCount = 150 + ((seed * 29) % 900);
  const avatar =
    userPosts[0]?.profilePic || `https://i.pravatar.cc/100?u=${username}`;

  const thumbs = userPosts.map((p) => p.image).slice(0, 3);
  const filler = postsData.map((p) => p.image);
  let fi = 0;
  while (thumbs.length < 3 && fi < filler.length) {
    if (!thumbs.includes(filler[fi])) thumbs.push(filler[fi]);
    fi++;
  }

  return (
    <div className="pp-overlay" onClick={onClose}>
      <div className="pp-card" onClick={(e) => e.stopPropagation()}>
        <div className="pp-top">
          <img src={avatar} alt="" />
          <div>
            <b>{username}</b>
            <span>{titleName(username)}</span>
          </div>
        </div>

        <div className="pp-counts">
          <div>
            <b>{userPosts.length}</b>
            <span>posts</span>
          </div>
          <div>
            <b>{fmt(followers)}</b>
            <span>followers</span>
          </div>
          <div>
            <b>{fmt(followingCount)}</b>
            <span>following</span>
          </div>
        </div>

        <div className="pp-grid">
          {thumbs.map((src, i) => (
            <img key={i} src={src} alt="" />
          ))}
        </div>

        <button
          className={`pp-follow ${following ? "following" : ""}`}
          onClick={() => setFollowing((f) => !f)}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default ProfilePreview;
