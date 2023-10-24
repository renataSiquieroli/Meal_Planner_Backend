const MealPlanner = require('../schemas/MealPlanner');
const User = require("../schemas/User");

// Create a new meal planner
const createMealPlanner = async (req, res) => {
  try {
    const mealPlannerData = req.body;
    
   
    // const userId = req.body.userId;
    
    // const user_id = req.user_.id;
    // Use populate to fetch the user data
    const userId = req.body.userId;
    // const user = await User.findById({ _id:user_id });
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: `User  not found.` });
    }



   
    const newMealPlanner = await MealPlanner.create({
      user: user,
      weeks: mealPlannerData.weeks,
    });
  

    res.status(201).json(newMealPlanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the meal planner.' });
  }
};

// Get all meal planners with associated user data
const getAllMealPlanners = async (req, res) => {
  try {
    const mealPlanners = await MealPlanner.find().populate('user');
    res.status(200).json(mealPlanners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching meal planners.' });
  }
};

// Get a specific meal planner by ID with associated user data
const getMealPlannerById = async (req, res) => {
  const mealPlannerId = req.params.id;
  try {
    const mealPlanner = await MealPlanner.findById(mealPlannerId).populate('user');
    if (!mealPlanner) {
      return res.status(404).json({ error: 'Meal planner not found.' });
    }
    res.status(200).json(mealPlanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the meal planner.' });
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
      return res.status(404).json({ error: 'User not found.' });
    }
    updatedData.user = user;
  }

  try {
    const mealPlanner = await MealPlanner.findByIdAndUpdate(mealPlannerId, updatedData, { new: true }).populate('user');
    if (!mealPlanner) {
      return res.status(404).json({ error: 'Meal planner not found.' });
    }
    res.status(200).json(mealPlanner);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the meal planner.' });
  }
};

// Delete a meal planner by ID
const deleteMealPlanner = async (req, res) => {
  const mealPlannerId = req.params.id;
  try {
    const mealPlanner = await MealPlanner.findByIdAndRemove(mealPlannerId).populate('user');
    if (!mealPlanner) {
      return res.status(404).json({ error: 'Meal planner not found.' });
    }
    res.status(204).send(); // No content - successful deletion
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the meal planner.' });
  }
};

module.exports = {
  createMealPlanner,
  getAllMealPlanners,
  getMealPlannerById,
  updateMealPlanner,
  deleteMealPlanner,
};
