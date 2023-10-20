const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const PORT = 8080;

connectDB();
// Necessary middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Meal Planner App");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.rainbow);
});
