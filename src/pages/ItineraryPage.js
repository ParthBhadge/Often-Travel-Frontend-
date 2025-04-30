import React, { useState, useEffect } from "react";
import API from "../api"; // Axios instance with the backend base URL
import "../style/HomePage.css"; // Reuse existing styles
import "../style/ItineraryPage.css";
import { Link } from "react-router-dom"; // Import Link
import "../style/global.css";

const ItineraryPage = () => {
  const [itineraries, setItineraries] = useState([]); // List of itineraries
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    nights: 0,
  }); // Form data for creating a new itinerary
  const [error, setError] = useState(""); // Error message

  // Fetch itineraries from the backend
  useEffect(() => {
    fetchItineraries();
  }, []);

  const fetchItineraries = async () => {
    try {
      setError(""); // Clear previous errors
      const response = await API.get("/itineraries");
      setItineraries(response.data);
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Failed to fetch itineraries. Please try again.");
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/itineraries", formData);
      alert("Itinerary created successfully!");
      setFormData({ name: "", region: "", nights: 0 });
      fetchItineraries(); // Refresh the list of itineraries
    } catch (err) {
      console.error("Error creating itinerary:", err);
      setError("Failed to create itinerary. Please try again.");
    }
  };

  return (
    <div className="homepage">
      <Link to="/" className="link">Home</Link>
      <header className="homepage-header">
        <h1 id="miHead">Manage Itineraries</h1>
        <p id="miHead">View and manage your itineraries.</p>
      </header>

      <div className="itinerary-container">
        <h2>Existing Itineraries</h2>
        {error && <p className="error">{error}</p>}
        <ul>
          {itineraries.map((itinerary) => (
            <li key={itinerary.id}>
              <h3>{itinerary.name}</h3>
              <p><strong>Region:</strong> {itinerary.region}</p>
              <p><strong>Nights:</strong> {itinerary.nights}</p>
              <Link to={`/itineraries/${itinerary.id}/add-days`} className="add-days-link">
                Add Days
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="create-itinerary-container">
        <h2>Create New Itinerary</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Region:
            <input
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Nights:
            <input
              type="number"
              name="nights"
              value={formData.nights}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Create Itinerary</button>
        </form>
      </div>
    </div>
  );
};

export default ItineraryPage;