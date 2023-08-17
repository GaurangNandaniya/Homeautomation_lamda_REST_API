const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  updateUserDetails,
  removeUser,
  restoreUser,
} = require("../controllers/userController");

const router = express.Router();

router.post("/update", authenticateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { firstName, lastName, userId } = userDetails;

    await updateUserDetails({
      firstName,
      lastName,
      userId,
    });
    res.json({ message: "User info updated successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/remove", authenticateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { userId } = userDetails;

    await removeUser({
      userId,
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { userId } = userDetails;

    await restoreUser({
      userId,
    });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
