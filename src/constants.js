const HOST_URL = "a25cd0s6rab9hp-ats.iot.ap-south-1.amazonaws.com";
const CLIENT_ID = "homeautomation_lamda_rest_api";
const CA_FILE_PATH = "./certificates/AmazonRootCA1.pem";
const CERTIFICATE_FILE_PATH = "./certificates/device-certificate.pem.crt";
const PRIVATE_KEY_FILE_PATH = "./certificates/private-key.pem.key";

const PORT = 3000;

//Do not change otherwise all the user will get logged out
const SECRET_KEY = "xY8eINQPH8";

module.exports = {
  HOST_URL,
  CLIENT_ID,
  CA_FILE_PATH,
  CERTIFICATE_FILE_PATH,
  PRIVATE_KEY_FILE_PATH,
  PORT,
  SECRET_KEY,
};
