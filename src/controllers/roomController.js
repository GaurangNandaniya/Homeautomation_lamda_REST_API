const {
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
} = require("../models/Room");

const roomProperties = ["name", "id"];

const createNewRoom = async (data) => {
  const result = await createRoom(data);
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
