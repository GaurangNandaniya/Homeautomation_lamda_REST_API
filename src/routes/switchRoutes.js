const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createNewSwitches,
  removeSwitch,
  updateSwitchDetails,
  restoreSwitch,
  getSwitchesByRoomId,
  updateSwitchState,
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
    if (_.includes(error.message, "No switches for given Microcontroller id")) {
      return res.status(500).json({
        success: false,
        error: "No switches for given Microcontroller id",
      });
    }
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

    await removeSwitch({ jwtUser, switchDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error remove switch:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await restoreSwitch({ jwtUser, switchDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error restore switch:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/roomSwitches", authenticateUser, async (req, res) => {
  try {
    const jwtUser = res.locals.jwtUser;
    const { switchDetails } = req.body;

    const data = await getSwitchesByRoomId({ jwtUser, switchDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error home rooms:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/state", authenticateUser, async (req, res) => {
  try {
    const jwtUser = res.locals.jwtUser;
    const { switchDetails } = req.body;

    const data = (await updateSwitchState({ jwtUser, switchDetails })) || {};

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error home rooms:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
