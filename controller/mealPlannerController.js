const MealPlanner = require("../schemas/MealPlanner");
const User = require("../schemas/User");

// Create a new meal planner
const createMealPlanner = async (req, res) => {
  try {
    console.log("REQ BODY", req.body);

    console.log("USER ID from controller: ", req.body.user);

    const user = await User.findById(req.body.user);

    console.log("USER: ", user);

    // if (!user) {
    //   return res.status(404).json({ error: `User  not found.` });
    // }

    const createdPlan = await MealPlanner.create({
      user: req.body.user,
      weeks: req.body.weeks,
    });

    res.status(201).json(createdPlan);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the meal planner." });
  }
};

// Get all meal planners with associated user data
const getAllMealPlanners = async (req, res) => {
  try {
    const mealPlanners = await MealPlanner.find().populate("user");
    res.status(200).json(mealPlanners);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching meal planners." });
  }
};

// Get a specific meal planner by ID with associated user data
const getMealPlannerById = async (req, res) => {
  const mealPlannerId = req.params.id;
  try {
    const mealPlanner = await MealPlanner.findById(mealPlannerId).populate(
      "user"
    );
    if (!mealPlanner) {
      return res.status(404).json({ error: "Meal planner not found." });
    }
    res.status(200).json(mealPlanner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching the meal planner." });
  }
};

// Update a meal planner by ID with the option to update user data
const updateMealPlanner = async (req, res) => {
  const mealPlannerId = req.params.id;
  const updatedData = req.body;

  // If you have the option to update the user, use populate to fetch user data
  if (updatedData.user) {
    const user = await User.findById(updatedData.user);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    updatedData.user = user;
  }

  try {
    const mealPlanner = await MealPlanner.findByIdAndUpdate(
      mealPlannerId,
      updatedData,
      { new: true }
    ).populate("user");
    if (!mealPlanner) {
      return res.status(404).json({ error: "Meal planner not found." });
    }
    res.status(200).json(mealPlanner);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the meal planner." });
  }
};

// Delete a meal planner by ID
const deleteMealPlanner = async (req, res) => {
  const mealPlannerId = req.params.id;
  try {
    const mealPlanner = await MealPlanner.findByIdAndRemove(
      mealPlannerId
    ).populate("user");
    if (!mealPlanner) {
      return res.status(404).json({ error: "Meal planner not found." });
    }
    res.status(204).send(); // No content - successful deletion
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the meal planner." });
  }
};

module.exports = {
  createMealPlanner,
  getAllMealPlanners,
  getMealPlannerById,
  updateMealPlanner,
  deleteMealPlanner,
};
