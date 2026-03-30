require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("../src/config/db");
const habitRoutes = require("../src/routes/habit.routes");
const authRoutes = require("../src/routes/auth.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando en Vercel");
});

module.exports = app;