const {
  fetchUserByEmail,
  updateUser,
  deleteUser,
  restoreUserModal,
} = require("../models/User");

const getUserByEmail = async (data) => {
  return await fetchUserByEmail(data);
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
  updateUserDetails,
  removeUser,
  restoreUser,
};
