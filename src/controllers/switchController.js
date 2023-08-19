const {
  createSwitches,
  updateSwitch,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
} = require("../models/Switch");
const {
  getSwitchesByMicrocontrollerId,
} = require("../controllers/switchHardwareController");

const switchProperties = [
  "name",
  "id",
  "type",
  "state",
  "power_value_percentage",
];

const createNewSwitches = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { microcontrollerId } = switchDetails;

  const microcontrollerSwitches = await getSwitchesByMicrocontrollerId({
    jwtUser,
    switchDetails: { microcontrollerId },
  });

  const result = await createSwitches({
    jwtUser,
    switchDetails,
    microcontrollerSwitches,
  });

  return _.map(result, (item) => _.pick(item || {}, switchProperties));
};

const updateSwitchDetails = async (data) => {
  const result = await updateSwitch(data);
  return _.pick(result || {}, switchProperties);
};

const removeRoom = async (data) => {
  return await deleteRoom(data);
};

const restoreRoom = async (data) => {
  return await restoreRoomModal(data);
};

const getRoomByHomeId = async (data) => {
  return await fetchRoomByHomeId(data);
};

module.exports = {
  createNewSwitches,
  removeRoom,
  updateSwitchDetails,
  restoreRoom,
  getRoomByHomeId,
};
