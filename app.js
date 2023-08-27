require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const _ = require("lodash");
const cors = require("cors");
const { db } = require("./src/clients/KnexClient");

//routes
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const homeRoutes = require("./src/routes/homeRoutes");
const roomRoutes = require("./src/routes/roomRoutes");
const switchRoutes = require("./src/routes/switchRoutes");
const noAuthSwitchState = require("./src/routes/noAuthSwitchState");

//it will make available db to all files without importing
global.db = db;
global._ = _;

app.use(bodyParser.json());

const corsOptions = {
  origin: "*", // Replace with your frontend's URL
  methods: "GET,POST", // Specify allowed HTTP methods
  allowedHeaders: "content-type,authorization", // Specify allowed headers
};

app.use(cors(corsOptions));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/home", homeRoutes);
app.use("/room", roomRoutes);
app.use("/switch", switchRoutes);
app.use("/noauth", noAuthSwitchState);

module.exports = app;
