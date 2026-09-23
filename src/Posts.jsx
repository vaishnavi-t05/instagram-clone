import React, { useEffect, useRef, useState } from 'react'
import { posts as postsData } from './data'
import { auth } from './firebase'
import PostModal from './PostModal'
import ProfilePreview from './ProfilePreview'

const myName = () =>
  auth.currentUser?.displayName ||
  auth.currentUser?.email?.split("@")[0] ||
  "you";

// Autoplay muted when scrolled into view, no controls shown.
// Tap toggles sound.
const PostVideo = ({ post }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const setRef = (el) => {
    videoRef.current = el;
    if (el) el.muted = true;
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = muted;
  }, [muted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.muted = videoRef.current?.muted ?? true;
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="post-video-wrap"
      onClick={() => setMuted((m) => !m)}
    >
      <video
        ref={setRef}
        className="image"
        src={post.video}
        poster={post.image}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      <span className="post-mute">
        <i className={`bi ${muted ? "bi-volume-mute-fill" : "bi-volume-up-fill"}`} />
      </span>
    </div>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([])
  // start with seeded comments so every post looks alive
  const [comments, setComments] = useState(() =>
    Object.fromEntries(postsData.map((p) => [p.id, [...(p.seedComments || [])]]))
  )
  const [drafts, setDrafts] = useState({})
  const [modalId, setModalId] = useState(null)
  const [previewUser, setPreviewUser] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [saved, setSaved] = useState({})

  const fmt = (n) =>
    n >= 1000 ? `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K` : `${n}`;

  const sharesFor = (post) => Math.round((post.comments || 0) / 7) + post.id;

  const othersFor = (post) => ((post.id * 3) % 4) + 2;

  const timeAgo = (ts) => {
    const days = Math.max(
      0,
      Math.floor((Date.now() - new Date(ts).getTime()) / 86400000)
    );
    if (days < 1) return "now";
    if (days < 7) return `${days}d`;
    if (days < 35) return `${Math.floor(days / 7)}w`;
    return `${Math.floor(days / 30)}mo`;
  };

  const likerFor = (post) =>
    (comments[post.id] && comments[post.id][0]?.user) || "all__players_official";

  // lock background scroll while the comments modal is open
  useEffect(() => {
    if (modalId) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [modalId])

  const seedCount = (id) =>
    (postsData.find((p) => p.id === id)?.seedComments || []).length;

  useEffect(() => {
    // fresh shuffled order on every refresh (local data, no server needed)
    const shuffled = [...postsData];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setPosts(shuffled);
  }, [])

  // LIKE / UNLIKE
  const handleLike = (id) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {

        if (post.id === id) {

          return {
            ...post,

            // change true to false or false to true
            isLiked: !post.isLiked,

            // increase or decrease likes
            likes: post.isLiked
              ? post.likes - 1
              : post.likes + 1
          }

        }

        return post
      })
    )
  }

  // ADD COMMENT (used by inline form + modal)
  const addComment = (id, textArg) => {
    const text = (textArg !== undefined ? textArg : drafts[id] || "").trim();
    if (!text) return;
    setComments((c) => ({
      ...c,
      [id]: [...(c[id] || []), { user: myName(), text, time: "Just now" }],
    }));
    setDrafts((d) => ({ ...d, [id]: "" }));
  }

  const modalPost = posts.find((p) => p.id === modalId) || null;

  return (
    <div className="posts-container">

      {posts.length > 0 ? (

        <div>

          {posts.map((post) => (

            <div className="post" key={post.id}>

              {/* DP + USERNAME */}
              <div
                className="post-header d-flex align-items-center"
                onClick={() => setPreviewUser(post.username)}
                style={{ cursor: "pointer" }}
              >

                <img
                  className="dp rounded-circle"
                  src={post.profilePic}
                  alt="Profile pic"
                />

                <div className="post-header-text">
                  <h5>
                    {post.username}{" "}
                    <span className="post-others">and {othersFor(post)} others</span>{" "}
                    <span className="post-time">• {timeAgo(post.timestamp)}</span>
                  </h5>
                  <small className="post-loc">{post.location}</small>
                </div>

                <span className="post-more">•••</span>

              </div>


              {/* POST IMAGE OR VIDEO */}
              {post.video ? (
                <PostVideo post={post} />
              ) : (
                <img
                  className="image"
                  src={post.image}
                  alt=""
                />
              )}


              {/* ACTIONS */}
              <div className="post-actions">

                {/* LIKE BUTTON */}
                <button
                  className="like-button"
                  onClick={() => handleLike(post.id)}
                >
                  <i
                    className={
                      post.isLiked
                        ? "bi bi-heart-fill liked"
                        : "bi bi-heart"
                    }
                  ></i>
                  <span className="post-count">{fmt(post.likes)}</span>
                </button>


                {/* COMMENT */}
                <button
                  className="like-button"
                  onClick={() => setModalId(post.id)}
                  aria-label="Comments"
                >
                  <i className="bi bi-chat"></i>
                  <span className="post-count">{fmt(post.comments || 0)}</span>
                </button>

                {/* REPOST */}
                <button className="like-button" aria-label="Repost">
                  <i className="bi bi-repeat"></i>
                  <span className="post-count">{fmt(sharesFor(post))}</span>
                </button>


                {/* SHARE */}
                <button className="like-button" aria-label="Share">
                  <i className="bi bi-send"></i>
                </button>

                {/* SAVE */}
                <button
                  className="like-button post-save"
                  onClick={() => setSaved((s) => ({ ...s, [post.id]: !s[post.id] }))}
                  aria-label="Save"
                >
                  <i className={`bi ${saved[post.id] ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
                </button>


                {/* LIKES */}
                <div className="post-likes-line">
                  <b>{post.likes} Likes</b>
                </div>

                {/* LIKED BY (mobile app style) */}
                <div className="post-likedby">
                  Liked by <b>{likerFor(post)}</b> and <b>{fmt(post.likes - 1)} others</b>
                </div>


                {/* CAPTION */}
                <p className="post-caption">
                  <b>{post.username}</b>{" "}
                  {expanded[post.id] || post.caption.length <= 60
                    ? post.caption
                    : <>{post.caption.slice(0, 60)}... </>}
                  {!expanded[post.id] && post.caption.length > 60 && (
                    <span
                      className="post-more-text"
                      onClick={() => setExpanded((e) => ({ ...e, [post.id]: true }))}
                    >
                      more
                    </span>
                  )}
                </p>
                <p className="post-translate">See translation</p>

                {/* COMMENTS */}
                <button
                  className="view-comments"
                  onClick={() => setModalId(post.id)}
                >
                  View all {(post.comments || 0) + ((comments[post.id] || []).length - seedCount(post.id))} comments
                </button>

                <form
                  className="comment-form"
                  onSubmit={(e) => { e.preventDefault(); addComment(post.id); }}
                >
                  <input
                    placeholder="Add a comment..."
                    value={drafts[post.id] || ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [post.id]: e.target.value }))}
                  />
                  <button type="submit" disabled={!(drafts[post.id] || "").trim()}>
                    Post
                  </button>
                </form>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div>
          Loading Posts
        </div>

      )}

      {modalPost && (
        <PostModal
          post={modalPost}
          comments={comments[modalPost.id] || []}
          seedCount={seedCount(modalPost.id)}
          myName={myName()}
          onClose={() => setModalId(null)}
          onToggleLike={handleLike}
          onAddComment={addComment}
        />
      )}

      {previewUser && (
        <ProfilePreview
          username={previewUser}
          onClose={() => setPreviewUser(null)}
        />
      )}

    </div>
  )
}

export default Posts