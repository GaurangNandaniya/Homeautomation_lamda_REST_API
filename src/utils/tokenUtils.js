const jwt = require("jsonwebtoken");

// Generate JWT token with 1 year expiration
function generateToken({ email, userId }) {
  return jwt.sign({ email, userId }, process.env.SECRET_KEY, {
    expiresIn: "1y",
  });
}

module.exports = {
  generateToken,
};
