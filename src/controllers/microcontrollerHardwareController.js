const {
  updateMicrocontrollerHardwareDataByIds,
} = require("../models/MicrocontrollerHardware");

const updateMicrocontrollerHardwareByIds = async (data) => {
  return await updateMicrocontrollerHardwareDataByIds(data);
};
module.exports = {
  updateMicrocontrollerHardwareByIds,
};
