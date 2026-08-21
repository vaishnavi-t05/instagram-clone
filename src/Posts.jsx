import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <div className="posts-container">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>

          <div className="post-header">
            <img
              src={post.profilePic}
              alt={post.username}
              className="post-profile"
            />

            <span>{post.username}</span>
          </div>

          <img
            src={post.image}
            alt="Post"
            className="post-image"
          />

          <div className="post-actions">
            ❤️ 💬 📤
          </div>

          <p>
            <strong>{post.username}</strong> {post.caption}
          </p>

        </div>
      ))}
    </div>
  );
}

export default Posts;