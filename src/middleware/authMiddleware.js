// src/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { getUserByEmail } = require("../controllers/userController");

function validateUser(req, res, next) {
  const { userDetails } = req.body;
  const { email, password } = userDetails;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  next();
}

async function authenticateUser(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await getUserByEmail(decoded.email);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.error("Error in authentication:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  validateUser,
  authenticateUser,
};
