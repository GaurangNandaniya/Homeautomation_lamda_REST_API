const express = require("express");

const { publishMessage } = require("../controllers/awsIotController");

const router = express.Router();
router.post("/state", async (req, res) => {
  try {
    const { switchDetails } = req.body;
    const { switchId, state } = switchDetails;

    const data =
      (await publishMessage({
        microcontrollerId: 1,
        state,
        switchLocalId: switchId,
      })) || {};

    res.json({ success: true, data });
  } catch (error) {
    console.error("Error no auth swtch:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
