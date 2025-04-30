import React, { useState } from "react";
import API from "../api";

const CreateItinerary = () => {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    nights: 0,
    days: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    API.post("/itineraries", formData)
      .then((response) => {
        alert("Itinerary created successfully!");
        setFormData({ name: "", region: "", nights: 0, days: [] });
      })
      .catch((error) => console.error(error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Itinerary</h2>
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
      <br />
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
      <br />
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
      <br />
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateItinerary;