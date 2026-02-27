import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Welcome to Our Website!</h1>
      <p>Explore our restaurants:</p>
      <Link to="/restaurants">
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Go to Restaurants
        </button>
      </Link>
    </div>
  );
}