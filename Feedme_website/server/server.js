require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");

const app = express();

// You no longer need CORS if everything runs from same server
app.use(express.json());

const PORT = process.env.PORT || 80;

//  Connect to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL");
  }
});


// ================= API ROUTES =================

// Get restaurants with pagination
app.get("/api/restaurants", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 50;
  const offset = (page - 1) * limit;

  db.query("SELECT COUNT(*) as count FROM Restaurants", (err, countResult) => {
    if (err) return res.status(500).json(err);
    const total = countResult[0].count;

    db.query(
      "SELECT * FROM Restaurants LIMIT ? OFFSET ?",
      [limit, offset],
      (err, results) => {
        if (err) return res.status(500).json(err);

        res.json({
          page,
          totalPages: Math.ceil(total / limit),
          totalRestaurants: total,
          restaurants: results,
        });
      }
    );
  });
});

// Search restaurants
app.get("/api/restaurants/search", (req, res) => {
  const q = `%${req.query.q}%`;
  db.query(
    "SELECT * FROM Restaurants WHERE name LIKE ? OR category LIKE ?",
    [q, q],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});


// ================= SERVE REACT =================

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client/dist")));

// React Router fix (must be LAST)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// ================= START SERVER =================

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});