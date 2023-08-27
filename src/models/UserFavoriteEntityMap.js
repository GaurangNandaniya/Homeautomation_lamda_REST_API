const createUserFavoriteEntityMap = async (data) => {
  const { jwtUser, favoriteEntityDetails } = data;
  const { entityId, entityType } = favoriteEntityDetails;
  const { userId } = jwtUser;

  const result = await db("user_favorite_entity_map")
    .insert({
      fk_user_id: userId,
      entity_id: entityId,
      entity_type: entityType,
      created_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};

const deleteUserFavoriteEntityMap = async (data) => {
  const { jwtUser, favoriteEntityDetails } = data;
  const { entityId, entityType } = favoriteEntityDetails;
  const { userId } = jwtUser;

  const result = await db("user_favorite_entity_map")
    .where("fk_user_id", userId)
    .where("entity_id", entityId)
    .where("entity_type", entityType)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};

module.exports = {
  createUserFavoriteEntityMap,
  deleteUserFavoriteEntityMap,
};
