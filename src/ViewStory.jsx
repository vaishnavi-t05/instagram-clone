import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000";

function ViewStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/story/${id}`)
      .then((response) => {
        setStory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching story:", error);
      });
  }, [id]);

  if (!story) {
    return <p>Loading...</p>;
  }

  return (
    <div className="view-story">

      <button onClick={() => navigate("/home")}>
        ←
      </button>

      <img
        src={story.image}
        alt={story.username}
      />

    </div>
  );
}

export default ViewStory;