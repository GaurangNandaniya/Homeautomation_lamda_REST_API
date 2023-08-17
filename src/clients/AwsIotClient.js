const { IoTDataPlaneClient } = require("@aws-sdk/client-iot-data-plane");
const { REGION } = require("../constants/awsIot");

// https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/iot-data-plane/command/PublishCommand/
const ioTClient = new IoTDataPlaneClient({
  region: REGION,
});

module.exports = {
  ioTClient,
};
