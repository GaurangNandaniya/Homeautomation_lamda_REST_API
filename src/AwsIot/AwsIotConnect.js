const { getAWSIotPublishTopic, getAWSIotSubscribeTopic } = require("../utils");
const _ = require("lodash");

const connectToAWSIOTCoreAndAddCallbacks = ({ device }) => {
  const publishMessage = ({ payload }) => {
    // const payload = [{
    //   switchId: "SWITCH_6",
    //   state: "ON",
    // }];
    _.forEach(payload, (switchInfo) => {
      console.log(
        `publishing ${switchInfo.switchId}:${switchInfo.state} to IoT`
      );
      const params = {
        topic: getAWSIotPublishTopic(), // Replace with your IoT topic
        payload: JSON.stringify(switchInfo),
        qos: 0,
      };
      //https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/IotData.html#publish-property
      device.publish(params, (err) => {
        if (err) {
          console.error("Error publishing to IoT:", err);
          throw new Error("Failed to control switch");
        }
        console.log(
          `published ${switchInfo.switchId}:${switchInfo.state} to IoT`
        );
        return true;
      });
    });
  };

  return { publishMessage };
};

module.exports = {
  connectToAWSIOTCoreAndAddCallbacks,
};
