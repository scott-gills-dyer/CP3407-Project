import React from "react";
import { Link } from "react-router-dom";

export default function Restaurants() {
  return (
    <div style={{ textAlign: "center", padding: "50px", fontFamily: "Arial, sans-serif" }}>
      <h1>Restaurants Page</h1>
      <p>This will show all restaurants.</p>
      <Link to="/">
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}>
          Back to Home
        </button>
      </Link>
    </div>
  );
}