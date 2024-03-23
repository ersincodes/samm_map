require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const locationRoutes = require("./routes/location");

connectDB();

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/location", locationRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
