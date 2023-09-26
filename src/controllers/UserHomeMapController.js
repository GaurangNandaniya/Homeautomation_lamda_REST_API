const {
  createUserHomeMap,
  deleteUserHomeMap,
  fetchUserHomeMapByHomeAndUserId,
} = require("../models/UserHomeMap");

const addUserHomeMap = async (data) => {
  return await createUserHomeMap(data);
};

const removeUserHomeMap = async (data) => {
  return await deleteUserHomeMap(data);
};

const getUserHomeMapByHomeAndUserId = async (data) => {
  return await fetchUserHomeMapByHomeAndUserId(data);
};

module.exports = {
  addUserHomeMap,
  removeUserHomeMap,
  getUserHomeMapByHomeAndUserId,
};
