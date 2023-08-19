const getAWSIotPublishTopic = ({ microcontrollerId }) => {
  return `devices/microcontroller/${microcontrollerId}/sub`;
};

const getAWSIotSubscribeTopic = () => {
  return "devices/microcontroller/+/pub";
};

module.exports = {
  getAWSIotPublishTopic,
  getAWSIotSubscribeTopic,
};
