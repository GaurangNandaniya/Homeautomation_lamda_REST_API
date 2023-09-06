require("dotenv").config(); // Load environment variables from .env file
const jwt = require("jsonwebtoken");

// Generate JWT token with 1 year expiration
function generateToken({ email, userId }) {
  // eslint-disable-next-line no-undef
  return jwt.sign({ email, userId }, process.env.SECRET_KEY, {
    expiresIn: "1y",
  });
}

module.exports = {
  generateToken,
};
