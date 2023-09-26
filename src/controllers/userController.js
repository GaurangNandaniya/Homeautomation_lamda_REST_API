const {
  fetchUserByEmail,
  updateUser,
  deleteUser,
  restoreUserModal,
  fetchUserById,
} = require("../models/User");

const userProperties = ["user_id", "first_name", "last_name", "email"];

const getUserByEmail = async (data) => {
  return await fetchUserByEmail(data);
};

const getUserById = async (data) => {
  const result = await fetchUserById(data);
  return _.pick(result, userProperties);
};

const updateUserDetails = async (data) => {
  return await updateUser(data);
};

const removeUser = async (data) => {
  return await deleteUser(data);
};
const restoreUser = async (data) => {
  return await restoreUserModal(data);
};

module.exports = {
  getUserByEmail,
  getUserById,
  updateUserDetails,
  removeUser,
  restoreUser,
  userProperties,
};
