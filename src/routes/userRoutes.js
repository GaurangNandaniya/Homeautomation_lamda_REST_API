const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  updateUserDetails,
  removeUser,
  restoreUser,
} = require("../controllers/userController");
const {
  addUserFavoriteEntity,
  removeUserFavoriteEntityMap,
} = require("../controllers/userFavoriteEntityMapController");
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
    res.json({ success: true, message: "User info updated successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/add-favorite-entity", authenticateUser, async (req, res) => {
  try {
    const { favoriteEntityDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await addUserFavoriteEntity({
      favoriteEntityDetails,
      jwtUser,
    });
    res.json({ success: true, message: "Added favorite item" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/remove-favorite-entity", authenticateUser, async (req, res) => {
  try {
    const { favoriteEntityDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await removeUserFavoriteEntityMap({
      favoriteEntityDetails,
      jwtUser,
    });
    res.json({ success: true, message: "Removed favorite item" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/remove", authenticateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { userId } = userDetails;

    await removeUser({
      userId,
    });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { userDetails } = req.body;
    const { userId } = userDetails;

    await restoreUser({
      userId,
    });
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error in user route:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
