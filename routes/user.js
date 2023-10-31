const express = require("express");

const { loginUser, signUpUser } = require("../controller/userControllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

// SignUp
app.post("/signup", signUpUser);

module.exports = app;
