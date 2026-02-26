require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME
});

db.connect(err => {
 if (err) console.error(err);
 else console.log("Connected to MySQL");
});

app.get("/api/restaurants", (req, res) => {
 db.query("SELECT * FROM Restaurants LIMIT 100", (err, results) => {
   if (err) return res.status(500).json(err);
   res.json(results);
 });
});

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

app.listen(5000, () => console.log("Server running on port 5000"));
