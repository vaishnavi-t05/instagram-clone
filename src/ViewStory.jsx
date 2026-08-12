import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewStory = () => {
  const { id, tot } = useParams();

  const [story, setStory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://instagram-clone-x2e2.onrender.com/story/${id}`)
      .then((data) => data.json())
      .then((data) => setStory(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (Number(id) > Number(tot) || Number(id) <= 0) {
    navigate('/home');
    return null;
  }

  return (
    <div>
      {story ? (
        <div className="d-flex justify-content-center align-items-center">

          <Link to={`/story/${Number(id) - 1}/${tot}`}>
            <i className="bi bi-arrow-left-circle-fill"></i>
          </Link>

          <img
            className="vh-100"
            src={story.image}
            alt="story"
          />

          <Link to={`/story/${Number(id) + 1}/${tot}`}>
            <i className="bi bi-arrow-right-circle-fill"></i>
          </Link>

        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default ViewStory;