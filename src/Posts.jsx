import React, { useEffect, useRef, useState } from 'react'
import { posts as postsData } from './data'

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

  return (
    <div className="posts-container">

      {posts.length > 0 ? (

        <div>

          {posts.map((post) => (

            <div className="post" key={post.id}>

              {/* DP + USERNAME */}
              <div className="post-header d-flex align-items-center">

                <img
                  className="dp rounded-circle"
                  src={post.profilePic}
                  alt="Profile pic"
                />

                <h5>{post.username}</h5>

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
                </button>


                {/* COMMENT */}
                <i className="bi bi-chat"></i>


                {/* SHARE */}
                <i className="bi bi-send"></i>


                {/* LIKES */}
                <div>
                  <b>{post.likes} Likes</b>
                </div>


                {/* CAPTION */}
                <p>
                  <b>{post.username}</b> {post.caption}
                </p>

              </div>

            </div>

          ))}

        </div>

      ) : (

        <div>
          Loading Posts
        </div>

      )}

    </div>
  )
}

export default Posts