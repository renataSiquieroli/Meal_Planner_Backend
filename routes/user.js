const express = require("express");

const { loginUser, signUpUser } = require("../controller/user.controllers");

const app = express.Router();

//Login
app.post("/login", loginUser);

// SignUp
app.post("/signup", signUpUser);

module.exports = app;
