const express = require("express");
// import require middleware
const {
  createMealPlanner,
  getAllMealPlanners,
  getMealPlannerById,
  updateMealPlanner,
  deleteMealPlanner,
} = require("../controller/mealPlannerController");

const app = express.Router();
//use auth here
const requireAuth = require("../middlewares/requireAuth");
app.use(requireAuth);

app.post("/create-meal-planners", createMealPlanner);
app.get("/getall-meal-planners", getAllMealPlanners);
app.get("/getbyid-meal-planners/:id", getMealPlannerById);
app.put("/update-meal-planners/:id", updateMealPlanner);
app.delete("/delete-meal-planners/:id", deleteMealPlanner);

module.exports = app;
