import React, { useState } from "react";
import API from "../api";

const Recommendations = () => {
  const [nights, setNights] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  const handleFetch = () => {
    API.get(`/recommendations?nights=${nights}`)
      .then((response) => setRecommendations(response.data))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h2>Get Recommendations</h2>
      <label>
        Nights:
        <input
          type="number"
          value={nights}
          onChange={(e) => setNights(e.target.value)}
        />
      </label>
      <button onClick={handleFetch}>Fetch</button>
      <ul>
        {recommendations.map((itinerary) => (
          <li key={itinerary._id}>
            <strong>{itinerary.name}</strong> - {itinerary.nights} nights
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;