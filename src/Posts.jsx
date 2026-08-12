import React, { useEffect, useState } from 'react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://instagram-clone-x2e2.onrender.com/posts')
      .then((data) => data.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(posts);

  return (
    <div className="post d-flex justify-content-center">
      {posts.length > 0 ? (
        <div>
          {posts.map((post) => (
            <div className="my-3" key={post.id}>
              <div className="d-flex">
                <img
                  className="dp rounded-circle"
                  src={post.profilePic}
                  alt="Profile pic"
                />
                <h5>{post.username}</h5>
              </div>

              <img className="image" src={post.image} alt="" />

              <div>
                <i className="bi bi-heart"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>

                <div>
                  <p className="my-1">{post.likes} Likes</p>
                </div>

                <p>{post.caption}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading Posts</div>
      )}
    </div>
  );
};

export default Posts;