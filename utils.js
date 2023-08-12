const getAWSIotPublishTopic = () => {
  return "devices/switch/switch1/sub";
};

const getAWSIotSubcribeTopic = () => {
  return "devices/switch/+/pub";
};

module.exports = {
  getAWSIotPublishTopic,
  getAWSIotSubcribeTopic,
};
