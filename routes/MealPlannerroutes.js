const express = require("express");

const { createMealPlanner,
    getAllMealPlanners,
    getMealPlannerById,
    updateMealPlanner,
    deleteMealPlanner } = require("../controller/MealPlannerController");

const app = express.Router();


app.post('/create-meal-planners', createMealPlanner);
app.get('/getall-meal-planners', getAllMealPlanners);
app.get('/getbyid-meal-planners/:id',getMealPlannerById);
app.put('/update-meal-planners/:id', updateMealPlanner);
app.delete('/delete-meal-planners/:id', deleteMealPlanner);


module.exports = app;
