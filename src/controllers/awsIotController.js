const { ioTClient } = require("../clients/AwsIotClient");
const { getAWSIotPublishTopic } = require("../utils/awsIotUtils");
const { PublishCommand } = require("@aws-sdk/client-iot-data-plane");

const publishMessage = async ({ switchLocalId, microcontrollerId, state }) => {
  console.log(
    `publishing ${switchLocalId}:${state} of microcontroller: ${microcontrollerId}to IoT`
  );

  const switchInfo = {
    state,
    switchId: switchLocalId,
  };
  const params = {
    topic: getAWSIotPublishTopic({ microcontrollerId }),
    payload: JSON.stringify(switchInfo),
    qos: 0,
  };

  //https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/iot-data-plane/command/PublishCommand/
  const command = new PublishCommand(params);

  try {
    await ioTClient.send(command);
    console.log(
      `published ${switchInfo.switchId}:${switchInfo.state} of microcontroller: ${microcontrollerId} to IoT`
    );
    return true;
  } catch (err) {
    console.error("Error publishing to IoT:", err);
    throw new Error("Failed to control switch");
  }
};

module.exports = {
  publishMessage,
};

// const payload = [{
//   switchId: "SWITCH_6",
//   state: "ON",
// }];
//   const promisArray = _.map(payload, async (switchInfo) => {
//     console.log(`publishing ${switchInfo.switchId}:${switchInfo.state} to IoT`);
//     const params = {
//       topic: getAWSIotPublishTopic(), // Replace with your IoT topic
//       payload: JSON.stringify(switchInfo),
//       qos: 0,
//     };

//     //https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/iot-data-plane/command/PublishCommand/
//     const command = new PublishCommand(params);
//     console.log(command);
//     try {
//       await client.send(command);
//       console.log(
//         `published ${switchInfo.switchId}:${switchInfo.state} to IoT`
//       );
//       return true;
//     } catch (err) {
//       console.error("Error publishing to IoT:", err);
//       throw new Error("Failed to control switch");
//     }
//   });
//   await Promise.all(promisArray);
