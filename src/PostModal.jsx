import React, { useState } from "react";
import { posts as postsData, suggestions as suggestionsData } from "./data";
import "./PostModal.css";

const avatarFor = (username) => {
  const all = [...postsData, ...suggestionsData];
  const found = all.find(
    (u) => u.username.toLowerCase() === String(username).toLowerCase()
  );
  return found ? found.profilePic : `https://i.pravatar.cc/100?u=${username}`;
};

const PostModal = ({
  post,
  comments,
  seedCount,
  myName,
  onClose,
  onToggleLike,
  onAddComment,
}) => {
  const [draft, setDraft] = useState("");
  const [likedComments, setLikedComments] = useState({});

  const submit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    onAddComment(post.id, text);
    setDraft("");
  };

  const toggleCommentLike = (i) =>
    setLikedComments((l) => ({ ...l, [i]: !l[i] }));

  return (
    <div className="pm-overlay" onClick={onClose}>
      <button className="pm-close" onClick={onClose} aria-label="Close">
        ✕
      </button>

      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        {/* LEFT: media */}
        <div className="pm-media">
          {post.video ? (
            <video
              src={post.video}
              poster={post.image}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img src={post.image} alt="" />
          )}
        </div>

        {/* RIGHT: comments panel */}
        <div className="pm-side">
          <div className="pm-head">
            <img src={post.profilePic} alt="" />
            <b>{post.username}</b>
            <span className="pm-more">•••</span>
          </div>

          <div className="pm-comments">
            <div className="pm-row">
              <img src={post.profilePic} alt="" />
              <div>
                <p>
                  <b>{post.username}</b> {post.caption}
                </p>
                <span className="pm-time">1w</span>
              </div>
            </div>

            {(comments || []).map((c, i) => (
              <div className="pm-row" key={i}>
                <img src={avatarFor(c.user)} alt="" />
                <div>
                  <p>
                    <b>{c.user}</b> {c.text}
                  </p>
                  <span className="pm-time">
                    {c.time || "1w"}
                    {likedComments[i] ? " · 1 like" : ""} ·{" "}
                    <span className="pm-reply">Reply</span>
                  </span>
                </div>
                <button
                  className={`pm-heart ${likedComments[i] ? "liked" : ""}`}
                  onClick={() => toggleCommentLike(i)}
                  aria-label="Like comment"
                >
                  <i
                    className={`bi ${
                      likedComments[i] ? "bi-heart-fill" : "bi-heart"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>

          <div className="pm-actions">
            <button
              className={`like-button ${post.isLiked ? "liked" : ""}`}
              onClick={() => onToggleLike(post.id)}
              aria-label="Like"
            >
              <i
                className={
                  post.isLiked ? "bi bi-heart-fill liked" : "bi bi-heart"
                }
              />
            </button>
            <button
              className="like-button"
              onClick={() =>
                document.querySelector(".pm-add input")?.focus()
              }
              aria-label="Comment"
            >
              <i className="bi bi-chat" />
            </button>
            <button className="like-button" aria-label="Share">
              <i className="bi bi-send" />
            </button>
            <button className="like-button pm-save" aria-label="Save">
              <i className="bi bi-bookmark" />
            </button>
          </div>

          <div className="pm-likes">
            <b>{post.likes} likes</b>
            <span>September 11</span>
          </div>

          <form className="pm-add" onSubmit={submit}>
            <i className="bi bi-emoji-smile" />
            <input
              placeholder="Add a comment..."
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
            />
            <button type="submit" disabled={!draft.trim()}>
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
