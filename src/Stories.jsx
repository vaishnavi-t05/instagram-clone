import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Stories() {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/story`)
      .then((response) => {
        setStories(response.data);
      })
      .catch((error) => {
        console.error("Error fetching stories:", error);
      });
  }, []);

  return (
    <div className="stories-container">
      {stories.map((story) => (
        <div className="story" key={story.id}>
          <img src={story.image} alt={story.username} />
          <p>{story.username}</p>
        </div>
      ))}
    </div>
  );
}

export default Stories;