// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const express = require("express");
const app = express();
const AWSIoT = require("aws-iot-device-sdk");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  HOST_URL,
  CLIENT_ID,
  CA_FILE_PATH,
  CERTIFICATE_FILE_PATH,
  PRIVATE_KEY_FILE_PATH,
  PORT,
  SECRET_KEY,
} = require("./constants");
const { generateToken } = require("./utils");
const { connectToAWSIOTCoreAndAddCallbacks } = require("./AwsIotConnect");

app.use(bodyParser.json());

// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//

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
    const { username, password } = req.body;

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
    res.json({ message: "Protected data accessed", user: decoded.username });
  } catch (error) {
    console.error("Error in protected route:", error);
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
