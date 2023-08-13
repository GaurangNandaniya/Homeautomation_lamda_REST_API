const { getAWSIotPublishTopic, getAWSIotSubscribeTopic } = require("./utils");

const connectToAWSIOTCoreAndAddCallbacks = ({ device }) => {
  device.on("connect", function () {
    console.log("Server connected to IOT");
    device.subscribe(getAWSIotSubscribeTopic());
  });

  device.on("message", function (topic, payload) {
    console.log("message", topic, payload.toString());
  });

  device.on("error", function (topic, payload) {
    console.log("error", topic, payload.toString());
  });

  const publishMessage = ({ payload }) => {
    // const payload = [{
    //   switchId: "SWITCH_6",
    //   state: "ON",
    // }];
    payload.forEach((switchInfo) => {
      device.publish(
        getAWSIotPublishTopic(),
        JSON.stringify(switchInfo),
        (err) => {
          if (err) {
            console.error("Error publishing to IoT:", err);
            throw new Error("Failed to control switch");
          }

          return true;
        }
      );
    });
  };

  return { publishMessage };
};

module.exports = {
  connectToAWSIOTCoreAndAddCallbacks,
};
