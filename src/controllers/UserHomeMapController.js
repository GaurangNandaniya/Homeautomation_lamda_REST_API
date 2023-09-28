const {
  createUserHomeMap,
  deleteUserHomeMap,
  fetchUserHomeMapByHomeAndUserId,
  updateUserHomeMapDetails,
  fetchHomeUsersByHomeId,
} = require("../models/UserHomeMap");

const userHomeMapProperties = [
  "id",
  "fk_user_id",
  "fk_home_id",
  "user_role",
  "user_role_expire_at",
];

const addUserHomeMap = async (data) => {
  return await createUserHomeMap(data);
};

const removeUserHomeMap = async (data) => {
  return await deleteUserHomeMap(data);
};

const getUserHomeMapByHomeAndUserId = async (data) => {
  return await fetchUserHomeMapByHomeAndUserId(data);
};

const updateUserHomeMap = async (data) => {
  return await updateUserHomeMapDetails(data);
};

const getHomeUsersByHomeId = async (data) => {
  return await fetchHomeUsersByHomeId(data);
};

module.exports = {
  addUserHomeMap,
  removeUserHomeMap,
  getUserHomeMapByHomeAndUserId,
  userHomeMapProperties,
  updateUserHomeMap,
  getHomeUsersByHomeId,
};
