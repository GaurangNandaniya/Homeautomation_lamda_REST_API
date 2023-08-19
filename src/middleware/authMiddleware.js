require("dotenv").config(); // Load environment variables from .env file
const jwt = require("jsonwebtoken");
const { SECRET_KEY, ADMIN_USERS } = process.env;
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

    if (
      !user &&
      !_.includes(JSON.parse(process.env.ADMIN_USERS), decoded.email)
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    //https://bobbyhadz.com/blog/pass-variables-to-the-next-middleware-in-express-js
    res.locals.jwtUser = decoded;
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
