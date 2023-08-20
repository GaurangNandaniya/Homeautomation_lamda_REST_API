const {
  createSwitches,
  updateSwitch,
  deleteSwitch,
  restoreSwichModal,
  fetchSwitchesByRoomId,
  fetchSwitchHardwareDetailsBySwitchId,
  updateSwitchStateInDb,
} = require("../models/Switch");
const { publishMessage } = require("../controllers/awsIotController");
const {
  getSwitchesByMicrocontrollerId,
} = require("../controllers/switchHardwareController");
const {
  addSwitchStateUpdateLog,
} = require("../controllers/switchStateLogController");

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

const removeSwitch = async (data) => {
  return await deleteSwitch(data);
};

const restoreSwitch = async (data) => {
  return await restoreSwichModal(data);
};

const getSwitchesByRoomId = async (data) => {
  return await fetchSwitchesByRoomId(data);
};

const updateSwitchState = async (data) => {
  const { switchDetails } = data;
  const { state } = switchDetails;
  console.time("switchHardwareInfo");
  const switchHardwareInfo = await fetchSwitchHardwareDetailsBySwitchId(data);
  const { switch_acronym, fk_microcontroller_id } = switchHardwareInfo;
  console.timeEnd("switchHardwareInfo");

  console.time("publishMessage");
  await publishMessage({
    switchLocalId: switch_acronym,
    microcontrollerId: fk_microcontroller_id,
    state,
  });
  console.timeEnd("publishMessage");

  console.time("promise");
  const promise = [];
  promise.push(updateSwitchStateInDb(data));
  promise.push(addSwitchStateUpdateLog(data));

  await Promise.all(promise);
  console.timeEnd("promise");
};

module.exports = {
  createNewSwitches,
  removeSwitch,
  updateSwitchDetails,
  restoreSwitch,
  getSwitchesByRoomId,
  updateSwitchState,
};
