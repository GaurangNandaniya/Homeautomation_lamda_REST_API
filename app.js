require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const app = express();
const AWSIoT = require("aws-iot-device-sdk");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const {
  HOST_URL,
  CLIENT_ID,
  CA_FILE_PATH,
  CERTIFICATE_FILE_PATH,
  PRIVATE_KEY_FILE_PATH,
  PORT,
} = require("./src/constants");
const { generateToken } = require("./src/utils");
const {
  connectToAWSIOTCoreAndAddCallbacks,
} = require("./src/AwsIot/AwsIotConnect");

const { SECRET_KEY } = process.env;

app.use(bodyParser.json());

const device = AWSIoT.device({
  keyPath: PRIVATE_KEY_FILE_PATH,
  certPath: CERTIFICATE_FILE_PATH,
  caPath: CA_FILE_PATH,
  clientId: CLIENT_ID,
  host: HOST_URL,
});

const { publishMessage } = connectToAWSIOTCoreAndAddCallbacks({ device });

const users = [];
// Sign-up endpoint
app.post("/signup", async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { username, password } = userDetails;

    // Check if user already exists
    const existingUser = users.find((user) => user.username === username);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = {
      username,
      password: hashedPassword,
    };
    users.push(newUser);

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { username, password } = userDetails;

    // Find the user by username
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = generateToken({ username });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Protected route (requires authentication)
app.post("/switch", (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET_KEY);

    const { switchesStates } = req.body;
    publishMessage({ payload: switchesStates });

    console.log({
      user: decoded,
      switchesStates,
    });

    res.json({ message: "Successfully changed the state" });
  } catch (error) {
    if (_.includes(error, "invalid signature")) {
      console.error("Error in jwt", error);
      return res.status(401).json({ error: "Unauthorized" });
    } else if (_.includes(error, "jwt expired")) {
      console.error("Error in jwt", error);
      return res.status(402).json({ error: "jwt expire login again" });
    }

    console.error("Error in switch state change:", error);
    res.status(501).json({ error: "Server error couldn't do action" });
  }
});

// //for development
// if (process.env.NODE_ENV == "development") {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// }
module.exports = app;
