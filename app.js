require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const { db } = require("./src/clients/KnexClient");

//routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const homeRoutes = require("./src/routes/homeRoutes");

//it will make available db to all files without importing
global.db = db;
global._ = _;

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/home", homeRoutes);

module.exports = app;
