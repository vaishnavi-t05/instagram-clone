import React, { useEffect, useState } from 'react'

const Posts = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((data) => data.json())
      .then(data => setPosts(data))
      .catch(err => console.log(err))
  }, [])

  console.log(posts)

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

              {/* POST IMAGE */}
              <img
                className="image"
                src={post.image}
                alt=""
              />

              {/* ACTIONS */}
              <div className="post-actions">

                <i className="bi bi-heart"></i>
                <i className="bi bi-chat"></i>
                <i className="bi bi-send"></i>

                <div>
                  <b>{post.likes} Likes</b>
                </div>

                <p>{post.caption}</p>

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