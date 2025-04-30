import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api"; // Axios instance with the backend base URL
import "../style/AddDaysPage.css";

const AddDaysPage = () => {
  const { itineraryId } = useParams(); // Get itinerary ID from the URL
  const navigate = useNavigate();
  const [days, setDays] = useState([
    { day_number: 1, hotel: "", activities: "", transfers: "" },
  ]);
  const [error, setError] = useState(""); // Error message

  const handleDayChange = (index, field, value) => {
    const updatedDays = [...days];
    updatedDays[index][field] = value;
    setDays(updatedDays);
  };

  const addDay = () => {
    setDays([
      ...days,
      { day_number: days.length + 1, hotel: "", activities: "", transfers: "" },
    ]);
  };

  const removeDay = (index) => {
    const updatedDays = days.filter((_, i) => i !== index);
    setDays(updatedDays);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`/itineraries/${itineraryId}/days`, days);
      alert("Days added successfully!");
      navigate(`/itineraries`);
    } catch (err) {
      console.error("Error adding days:", err);
      setError("Failed to add days. Please try again.");
    }
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <h1>Add Days to Itinerary</h1>
        <p>Itinerary ID: {itineraryId}</p>
      </header>

      <form onSubmit={handleSubmit} className="days-form">
        {error && <p className="error">{error}</p>}
        {days.map((day, index) => (
          <div key={index} className="day-input">
            <h3>Day {day.day_number}</h3>
            <label>
              Hotel:
              <input
                type="text"
                value={day.hotel}
                onChange={(e) => handleDayChange(index, "hotel", e.target.value)}
                required
              />
            </label>
            <label>
              Activities:
              <input
                type="text"
                value={day.activities}
                onChange={(e) =>
                  handleDayChange(index, "activities", e.target.value)
                }
                required
              />
            </label>
            <label>
              Transfers:
              <input
                type="text"
                value={day.transfers}
                onChange={(e) =>
                  handleDayChange(index, "transfers", e.target.value)
                }
                required
              />
            </label>
            <button
              type="button"
              onClick={() => removeDay(index)}
              disabled={days.length === 1}
            >
              Remove Day
            </button>
          </div>
        ))}
        <button type="button" onClick={addDay}>
          Add Another Day
        </button>
        <button type="submit">Submit Days</button>
      </form>
    </div>
  );
};

export default AddDaysPage;