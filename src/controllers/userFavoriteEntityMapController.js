const {
  createUserFavoriteEntityMap,
  deleteUserFavoriteEntityMap,
} = require("../models/UserFavoriteEntityMap");

const addUserFavoriteEntity = async (data) => {
  return await createUserFavoriteEntityMap(data);
};

const removeUserFavoriteEntityMap = async (data) => {
  return await deleteUserFavoriteEntityMap(data);
};

module.exports = {
  addUserFavoriteEntity,
  removeUserFavoriteEntityMap,
};
