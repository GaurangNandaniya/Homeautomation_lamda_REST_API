const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./constants");

const getAWSIotPublishTopic = () => {
  return "devices/switch/switch1/sub";
};

const getAWSIotSubscribeTopic = () => {
  return "devices/switch/+/pub";
};

// Generate JWT token with 1 year expiration
function generateToken({ username }) {
  return jwt.sign({ username }, SECRET_KEY, { expiresIn: "1y" });
}

module.exports = {
  getAWSIotPublishTopic,
  getAWSIotSubscribeTopic,
  generateToken,
};
