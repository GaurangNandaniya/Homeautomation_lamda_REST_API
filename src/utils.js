const jwt = require("jsonwebtoken");

const getAWSIotPublishTopic = () => {
  return "devices/switch/switch1/sub";
};

const getAWSIotSubscribeTopic = () => {
  return "devices/switch/+/pub";
};

// Generate JWT token with 1 year expiration
function generateToken({ username }) {
  return jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1y" });
}

module.exports = {
  getAWSIotPublishTopic,
  getAWSIotSubscribeTopic,
  generateToken,
};
