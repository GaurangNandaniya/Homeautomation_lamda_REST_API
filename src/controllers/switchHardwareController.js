const {
  fetchSwitchesByMicrocontrollerId,
} = require("../models/SwitchHardware");

const getSwitchesByMicrocontrollerId = async (data) => {
  return await fetchSwitchesByMicrocontrollerId(data);
};

module.exports = {
  getSwitchesByMicrocontrollerId,
};
