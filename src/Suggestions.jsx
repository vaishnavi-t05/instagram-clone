import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/suggestions`)
      .then((response) => {
        setSuggestions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  }, []);

  return (
    <div className="suggestions">

      <h4>Suggestions for you</h4>

      {suggestions.map((user) => (
        <div className="suggestion" key={user.id}>

          <img
            src={user.profilePic}
            alt={user.username}
          />

          <div>
            <strong>{user.username}</strong>
            <p>{user.name}</p>
          </div>

          <button>Follow</button>

        </div>
      ))}

    </div>
  );
}

export default Suggestions;