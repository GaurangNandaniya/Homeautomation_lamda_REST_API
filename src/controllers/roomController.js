const {
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
} = require("../models/Room");

const roomProperties = ["name", "id"];

const createNewRoom = async (data) => {
  const lastRoom = _.last(await getRoomByHomeId(data));

  const result = await createRoom({
    ...data,
    roomDetails: {
      ...data.roomDetails,
      display_sequence: _.get(lastRoom, "display_sequence", 1) || 1,
    },
  });
  return _.pick(result || {}, roomProperties);
};

const updateRoomDetails = async (data) => {
  const result = await updateRoom(data);
  return _.pick(result || {}, roomProperties);
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
  createNewRoom,
  removeRoom,
  updateRoomDetails,
  restoreRoom,
  getRoomByHomeId,
};
