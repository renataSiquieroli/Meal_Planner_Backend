const mongoose = require("mongoose");

//external Recipes links
const externalRecipesSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

// day schema
const daySchema = new mongoose.Schema({
  date: {
    type: Date, // check it frontend **
  },
  meals: {
    breakfast: externalRecipesSchema,
    lunch: externalRecipesSchema,
    dinner: externalRecipesSchema,
  },
});

// week schema

const weekSchema = new mongoose.Schema({
  days: [daySchema],
});

// meal planner schema

const mealPlannerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  weeks: [weekSchema],
});

module.exports = mongoose.model(
  "MealPlanner",
  externalRecipesSchema,
  daySchema,
  weekSchema,
  mealPlannerSchema
);
