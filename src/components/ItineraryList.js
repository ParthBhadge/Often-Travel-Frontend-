import React, { useEffect, useState } from "react";
import API from "../api";

const ItineraryList = () => {
  const [itineraries, setItineraries] = useState([]);

  useEffect(() => {
    API.get("/itineraries")
      .then((response) => setItineraries(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Itineraries</h1>
      <ul>
        {itineraries.map((itinerary) => (
          <li key={itinerary._id}>
            <strong>{itinerary.name}</strong> - {itinerary.nights} nights
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItineraryList;