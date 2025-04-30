import React, { useState } from "react";
import axios from "../api"; // Axios instance with the backend base URL
import "../style/HomePage.css";
import { Link } from "react-router-dom"; // Import Link
import API from "../api"; // Import the Axios instance

const HomePage = () => {
  const [nights, setNights] = useState(""); // Input for number of nights
  const [region, setRegion] = useState(""); // Input for region
  const [recommendations, setRecommendations] = useState([]); // Recommended itineraries
  const [error, setError] = useState(""); // Error message

  const fetchRecommendations = async () => {
    try {
      setError(""); // Clear previous errors
      // Simulate fetching recommendations (replace with API call)
      const mockData = [
        {
          id: 1,
          name: "Phuket Adventure",
          region: "Phuket",
          nights: 3,
          days: [
            { day_number: 1, hotel: "Phuket Beach Resort", activities: ["Visit Patong Beach", "Explore Bangla Road"], transfers: ["Airport to Hotel"] },
            { day_number: 2, hotel: "Phuket Beach Resort", activities: ["Phi Phi Islands Tour", "Snorkeling"], transfers: ["Hotel to Pier", "Pier to Hotel"] },
          ],
        },
      ];
      setRecommendations(mockData); // Replace with response data
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError("Failed to fetch recommendations. Please try again.");
    }
  };

  const fetchItineraries2 = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await API.get(`/itineraries`, {
        params: { region: region.trim(), nights: parseInt(nights) }, // Pass region and nights as query parameters
      });
      setRecommendations(response.data); // Update recommendations
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to fetch itineraries. Please try again.");
    }
  };

  const fetchItineraries = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await API.get(`/itineraries`);
      setRecommendations(response.data); // Update recommendations
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to fetch itineraries. Please try again.");
    }
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Welcome to Often Travel</h1>
        <p>Find the best itineraries tailored to your travel duration and region.</p>
        <Link to="/itineraries">Manage Itineraries</Link> {/* Add this */}
      </header>

      <div className="search-container">
        <div className="search-box">
          <label htmlFor="region">Enter Region:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="e.g., Phuket"
          />
        </div>
        <div className="search-box">
          <label htmlFor="nights">Enter Number of Nights:</label>
          <input
            type="number"
            id="nights"
            value={nights}
            onChange={(e) => setNights(e.target.value)}
            placeholder="e.g., 3"
          />
        </div>
        <button className="search-button" onClick={fetchItineraries2}>
          Get Recommendations
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="recommendations-container">
        <h2>Recommended Itineraries</h2>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((itinerary) => (
              <li key={itinerary.id}>
                <h3>{itinerary.name}</h3>
                <p><strong>Region:</strong> {itinerary.region}</p>
                <p><strong>Nights:</strong> {itinerary.nights}</p>
                <p><strong>Days:</strong></p>
                <ul>
                  {itinerary.days.map((day, index) => (
                    <li key={index}>
                      <strong>Day {day.day_number}:</strong> {day.hotel} -{" "}
                      {day.activities.join(", ")} - Transfers: {day.transfers.join(", ")}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recommendations available. Try entering a different region or number of nights.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
