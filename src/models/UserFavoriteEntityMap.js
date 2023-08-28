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

const getUserFavoriteSwitchesByUserId = async (data) => {
  const { favoriteEntityDetails, jwtUser } = data;
  const { userId } = jwtUser;

  const query = db("user_favorite_entity_map as ufem")
    .select(
      "s.id",
      "s.name as switch_name",
      "s.state",
      "r.name as room_name",
      "h.name as home_name"
    )
    .innerJoin("switch as s", function () {
      this.on("ufem.entity_id", "=", "s.id")
        .andOn("ufem.entity_type", "=", db.raw("?", ["SWITCH"]))
        .andOn("ufem.is_deleted", "=", db.raw("?", [false]))
        .andOn("ufem.fk_user_id", "=", userId);
    })
    .innerJoin("room as r", function () {
      this.on("s.fk_room_id", "=", "r.id").andOn(
        "r.is_deleted",
        "=",
        db.raw("?", [false])
      );
    })
    .innerJoin("home as h", function () {
      this.on("h.id", "=", "r.fk_home_id").andOn(
        "h.is_deleted",
        "=",
        db.raw("?", [false])
      );
    });
  return await query;
};

module.exports = {
  createUserFavoriteEntityMap,
  deleteUserFavoriteEntityMap,
  getUserFavoriteSwitchesByUserId,
};
