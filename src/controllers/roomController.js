const {
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
} = require("../models/Room");

const createNewRoom = async (data) => {
  const result = await createRoom(data);
  return _.pick(result || {}, ["name", "id"]);
};

const updateRoomDetails = async (data) => {
  const result = await updateRoom(data);
  return _.pick(result || {}, ["name", "id"]);
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
