const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createNewHome,
  removeHome,
  updateHomeDetails,
  restoreHome,
  getHomeByUserId,
} = require("../controllers/homeController");

const router = express.Router();

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const { homeDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await createNewHome({ jwtUser, homeDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error ceate home:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/update", authenticateUser, async (req, res) => {
  try {
    const { homeDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await updateHomeDetails({ jwtUser, homeDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error update home:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/remove", authenticateUser, async (req, res) => {
  try {
    const { homeDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await removeHome({ jwtUser, homeDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error remove home:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { homeDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await restoreHome({ jwtUser, homeDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error restore home:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/userHomes", authenticateUser, async (req, res) => {
  try {
    const jwtUser = res.locals.jwtUser;

    const data = await getHomeByUserId({ jwtUser });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error user homes:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
