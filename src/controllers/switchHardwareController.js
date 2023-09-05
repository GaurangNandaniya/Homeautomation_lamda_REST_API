const {
  fetchSwitchesByMicrocontrollerId,
  updateSwitchHardwareDataBySerialIds,
} = require("../models/SwitchHardware");

const getSwitchesByMicrocontrollerId = async (data) => {
  return await fetchSwitchesByMicrocontrollerId(data);
};

const updateSwitchHardwareBySerialIds = async (data) => {
  return await updateSwitchHardwareDataBySerialIds(data);
};

module.exports = {
  getSwitchesByMicrocontrollerId,
  updateSwitchHardwareBySerialIds,
};
