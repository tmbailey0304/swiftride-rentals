// File: backend/app.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Pool } = require("pg");
const fs = require("fs");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Auth Middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid token" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

// Routes

// Sign Up
app.post("/api/signup", async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userCheck.rows.length > 0)
      return res.status(400).json({ error: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3)",
      [email, hashedPassword, role || "customer"]
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Sign In
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Get All Vehicles
app.get("/api/vehicles", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vehicles WHERE available = true"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Create Vehicle (Protected)
app.post("/api/vehicles", verifyToken, isAdmin, async (req, res) => {
  const { make, model, year, available } = req.body;
  try {
    await pool.query(
      "INSERT INTO vehicles (make, model, year, available) VALUES ($1, $2, $3, $4)",
      [make, model, year, available !== undefined ? available : true]
    );
    res.status(201).json({ message: "Vehicle added" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update Vehicle (Protected)
app.put("/api/vehicles/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { make, model, year, available } = req.body;
  try {
    await pool.query(
      "UPDATE vehicles SET make = $1, model = $2, year = $3, available = $4 WHERE id = $5",
      [make, model, year, available, id]
    );
    res.json({ message: "Vehicle updated" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete Vehicle (Protected)
app.delete("/api/vehicles/:id", verifyToken, isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM vehicles WHERE id = $1", [id]);
    res.json({ message: "Vehicle deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Book a Vehicle (Protected)
app.post("/api/rentals", verifyToken, async (req, res) => {
  const { vehicleId, startDate, endDate } = req.body;
  const userId = req.user.userId;

  try {
    const vehicle = await pool.query(
      "SELECT * FROM vehicles WHERE id = $1 AND available = true",
      [vehicleId]
    );
    if (vehicle.rows.length === 0)
      return res.status(400).json({ error: "Vehicle not available" });

    await pool.query(
      "INSERT INTO rentals (user_id, vehicle_id, start_date, end_date) VALUES ($1, $2, $3, $4)",
      [userId, vehicleId, startDate, endDate]
    );
    await pool.query("UPDATE vehicles SET available = false WHERE id = $1", [
      vehicleId,
    ]);

    res.status(201).json({ message: "Vehicle booked successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
