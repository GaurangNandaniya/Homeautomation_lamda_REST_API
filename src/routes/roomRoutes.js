const express = require("express");
const { authenticateUser } = require("../middleware/authMiddleware");
const {
  createNewRoom,
  removeRoom,
  updateRoomDetails,
  restoreRoom,
  getRoomByHomeId,
} = require("../controllers/roomController");

const router = express.Router();

router.post("/create", authenticateUser, async (req, res) => {
  try {
    const { roomDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await createNewRoom({ jwtUser, roomDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error ceate room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/update", authenticateUser, async (req, res) => {
  try {
    const { roomDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    const data = await updateRoomDetails({ jwtUser, roomDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error update room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/remove", authenticateUser, async (req, res) => {
  try {
    const { roomDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await removeRoom({ jwtUser, roomDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error remove room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/restore", authenticateUser, async (req, res) => {
  try {
    const { roomDetails } = req.body;
    const jwtUser = res.locals.jwtUser;

    await restoreRoom({ jwtUser, roomDetails });

    res.json({ success: true });
  } catch (error) {
    console.error("Error restore room:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

router.post("/homeRooms", authenticateUser, async (req, res) => {
  try {
    const jwtUser = res.locals.jwtUser;
    const { roomDetails } = req.body;

    const data = await getRoomByHomeId({ jwtUser, roomDetails });

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error home rooms:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
