const {
  createSwitches,
  updateSwitch,
  deleteSwitch,
  restoreSwichModal,
  fetchSwitchesByRoomId,
  fetchSwitchHardwareDetailsBySwitchId,
  updateSwitchStateInDb,
  fetchSwitchesOfMicrocontrollerBySwitchId,
} = require("../models/Switch");
const { publishMessage } = require("../controllers/awsIotController");
const {
  getSwitchesByMicrocontrollerId,
  updateSwitchHardwareBySerialIds,
} = require("../controllers/switchHardwareController");
const {
  addSwitchStateUpdateLog,
} = require("../controllers/switchStateLogController");
const {
  updateMicrocontrollerHardwareByIds,
} = require("./microcontrollerHardwareController");

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
  if (_.isEmpty(microcontrollerSwitches)) {
    throw new Error("No switches for given Microcontroller id");
  }

  const result = await createSwitches({
    jwtUser,
    switchDetails,
    microcontrollerSwitches,
  });

  await updateSwitchHardwareBySerialIds({
    jwtUser,
    switchHardwareSerialIds: _.map(microcontrollerSwitches, "serial_id"),
    updateData: {
      is_registered: true,
    },
  });

  await updateMicrocontrollerHardwareByIds({
    jwtUser,
    microcontrollerIds: [microcontrollerId],
    updateData: {
      is_registered: true,
    },
  });

  return _.map(result, (item) => _.pick(item || {}, switchProperties));
};

const updateSwitchDetails = async (data) => {
  const result = await updateSwitch(data);
  return _.pick(result || {}, switchProperties);
};

const removeSwitch = async (data) => {
  const { jwtUser, switchDetails } = data;
  const result = await deleteSwitch(data);

  const { fk_microcontroller_id } = await updateSwitchHardwareBySerialIds({
    jwtUser,
    switchHardwareSerialIds: [result.switch_serial_id],
    updateData: { is_registered: false },
  });

  const switchesResult = await getSwitchesOfMicrocontrollerBySwitchId({
    jwtUser,
    switchDetails,
  });

  if (_.size(switchesResult) == 0) {
    await updateMicrocontrollerHardwareByIds({
      jwtUser,
      microcontrollerIds: [fk_microcontroller_id],
      updateData: { is_registered: false },
    });
  }
  return result;
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
  const switchHardwareInfo = await fetchSwitchHardwareDetailsBySwitchId(data);
  const { switch_acronym, fk_microcontroller_id } = switchHardwareInfo;

  await publishMessage({
    switchLocalId: switch_acronym,
    microcontrollerId: fk_microcontroller_id,
    state,
  });

  const promise = [];
  promise.push(updateSwitch({ ...data, shouldUpdateUpdatedAt: false }));
  promise.push(addSwitchStateUpdateLog(data));

  await Promise.all(promise);
};

const getSwitchesOfMicrocontrollerBySwitchId = async (data) => {
  return await fetchSwitchesOfMicrocontrollerBySwitchId(data);
};

module.exports = {
  createNewSwitches,
  removeSwitch,
  updateSwitchDetails,
  restoreSwitch,
  getSwitchesByRoomId,
  updateSwitchState,
};
