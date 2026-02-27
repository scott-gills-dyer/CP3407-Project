require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'feedme-db.cvo8guucol94.ap-southeast-2.rds.amazonaws.com',
  user: 'admin',
  password: 'qQSszXp2VZ3X4Wf',
  database: 'feedme'
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
