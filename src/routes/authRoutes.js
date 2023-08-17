// src/routes/userRoutes.js
// ... (previous imports)
const { validateUser } = require("../middleware/authMiddleware");
const { createNewUser } = require("../controllers/authController");
const { getUserByEmail } = require("../controllers/userController");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenUtils");
const express = require("express");

const router = express.Router();

// Sign-up endpoint
router.post("/signup", validateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { email, password, firstName, lastName } = userDetails;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    };

    await createNewUser(newUser);

    res.json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Login endpoint
router.post("/login", validateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { email, password } = userDetails;

    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken({ email, userId: user.user_id });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
