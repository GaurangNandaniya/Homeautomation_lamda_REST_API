const { createUser } = require("../models/User");

const createNewUser = async (data) => {
  return await createUser(data);
};

module.exports = {
  createNewUser,
};
