const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createNewSwitches,
  removeRoom,
  updateSwitchDetails,
  restoreRoom,
  getRoomByHomeId,
} = require("../controllers/switchController");

const router = express.Router();

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await createNewSwitches({ jwtUser, switchDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error ceate switch:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/update", authenticateUser, async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await updateSwitchDetails({ jwtUser, switchDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error update switch:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/remove", authenticateUser, async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await removeRoom({ jwtUser, switchDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error remove room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await restoreRoom({ jwtUser, switchDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error restore room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/homeRooms", authenticateUser, async (req, res) => {
  try {
    const jwtUser = res.locals.jwtUser;
    const { switchDetails } = req.body;

    const data = await getRoomByHomeId({ jwtUser, switchDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error home rooms:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
