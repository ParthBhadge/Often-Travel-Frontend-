import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ItineraryPage from "./pages/ItineraryPage";
import AddDaysPage from "./pages/AddDaysPage"; // Import the Add Days Page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/itineraries" element={<ItineraryPage />} />
        <Route path="/itineraries/:itineraryId/add-days" element={<AddDaysPage />} /> {/* Add this */}
      </Routes>
    </Router>
  );
};

export default App;