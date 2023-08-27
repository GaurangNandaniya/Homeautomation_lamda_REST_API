const {
  createUserHomeMap,
  deleteUserHomeMap,
} = require("../models/UserHomeMap");

const addUserHomeMap = async (data) => {
  return await createUserHomeMap(data);
};

const removeUserHomeMap = async (data) => {
  return await deleteUserHomeMap(data);
};

module.exports = {
  addUserHomeMap,
  removeUserHomeMap,
};
