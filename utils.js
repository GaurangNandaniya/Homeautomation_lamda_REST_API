const getAWSIotPublishTopic = () => {
  return "devices/switch/switch1/sub";
};

const getAWSIotSubscribeTopic = () => {
  return "devices/switch/+/pub";
};

module.exports = {
  getAWSIotPublishTopic,
  getAWSIotSubscribeTopic,
};
