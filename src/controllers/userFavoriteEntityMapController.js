const {
  createUserFavoriteEntityMap,
  deleteUserFavoriteEntityMap,
  getUserFavoriteSwitchesByUserId,
} = require("../models/UserFavoriteEntityMap");

const addUserFavoriteEntity = async (data) => {
  return await createUserFavoriteEntityMap(data);
};

const removeUserFavoriteEntityMap = async (data) => {
  return await deleteUserFavoriteEntityMap(data);
};

const getUserFavoriteEntityMapByUserId = async (data) => {
  const { favoriteEntityDetails, jwtUser } = data;
  const { entityType } = favoriteEntityDetails;
  let result = [];
  switch (entityType) {
    case "SWITCH":
      result = await getUserFavoriteSwitchesByUserId(data);
      break;
  }
  return result;
};

module.exports = {
  addUserFavoriteEntity,
  removeUserFavoriteEntityMap,
  getUserFavoriteEntityMapByUserId,
};
