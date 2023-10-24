const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("colors");
const connectDB = require("./dbinit");

const userRoutes = require("./routes/user");
const mealPlannerRoutes = require("./routes/mealPlannerRoutes");

const PORT = 8080;

connectDB();

// Necessary middleware
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.path, req.method);
//   next();
// });

app.get("/", (req, res) => {
  res.send("Meal Planner App");
});

//Routes
app.use("/user", userRoutes);
app.use("/meal-planner", mealPlannerRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`.rainbow);
});
