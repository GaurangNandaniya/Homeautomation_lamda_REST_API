// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
const express = require("express");
const app = express();
const AWSIoT = require("aws-iot-device-sdk");
const bodyParser = require("body-parser");
const {
  HOST_URL,
  CLIENT_ID,
  CA_FILE_PATH,
  CERTIFICATE_FILE_PATH,
  PRIVATE_KEY_FILE_PATH,
} = require("./constants");
const { getAWSIotPublishTopic, getAWSIotSubscribeTopic } = require("./utils");

app.use(bodyParser.json());

// Replace the values of '<YourUniqueClientIdentifier>' and '<YourCustomEndpoint>'
// with a unique client identifier and custom host endpoint provided in AWS IoT.
// NOTE: client identifiers must be unique within your AWS account; if a client attempts
// to connect with a client identifier which is already in use, the existing
// connection will be terminated.
//

const device = AWSIoT.device({
  keyPath: PRIVATE_KEY_FILE_PATH,
  certPath: CERTIFICATE_FILE_PATH,
  caPath: CA_FILE_PATH,
  clientId: CLIENT_ID,
  host: HOST_URL,
});

//
// Device is an instance returned by mqtt.Client(), see mqtt.js for full
// documentation.
//

// const payload = {
//   switchId: "SWITCH_6",
//   state: "ON",
// };

// console.log("connect");
device.on("connect", function () {
  console.log("Server connected to IOT");
  device.subscribe(getAWSIotSubscribeTopic());
});

// console.log("message");
device.on("message", function (topic, payload) {
  console.log("message", topic, payload.toString());
});

device.on("error", function (topic, payload) {
  console.log("error", topic, payload.toString());
});

const publishMessage = ({ message, res }) => {
  device.publish(getAWSIotPublishTopic(), JSON.stringify(message), (err) => {
    if (err) {
      console.error("Error publishing to IoT:", err);
      return res.status(500).json({ error: "Failed to control switch" });
    }

    return res.json({ message: `${message.switchId} turned ${message.state}` });
  });
};

app.post("/switch", (req, res) => {
  return publishMessage({ message: req.body, res });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
