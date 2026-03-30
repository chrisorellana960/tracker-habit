require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const habitRoutes = require("./routes/habit.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

// conectar DB
connectDB();

app.use(cors());
app.use(express.json());

// rutas
app.use("/api/habits", habitRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("API funcionando");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});