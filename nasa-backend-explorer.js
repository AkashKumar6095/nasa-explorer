const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const NASA_API_KEY = process.env.NASA_API_KEY;
const NASA_API_URL = "https://images-api.nasa.gov/search";

app.get("/api/nasa", async (req, res) => {
  try {
    const query = req.query.query || "mars";
    const response = await axios.get(`${NASA_API_URL}?q=${query}`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching data from NASA API:", error);
    res.status(500).json({ error: "Failed to fetch data from NASA API" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
