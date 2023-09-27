const createUserHomeMap = async (data) => {
  const { jwtUser, homeDetails, userDetails } = data;
  const { id, display_sequence, user_role, user_role_expire_at } = homeDetails;

  const result = await db("user_home_map")
    .insert({
      fk_user_id: userDetails.id,
      fk_home_id: id,
      created_at: db.fn.now(),
      display_sequence,
      user_role,
      user_role_expire_at,
    })
    .returning("*");

  return _.first(result);
};

const updateUserHomeMapDetails = async (data) => {
  const { jwtUser, homeDetails, userDetails } = data;
  const { id, display_sequence, user_role, user_role_expire_at } = homeDetails;

  const result = await db("user_home_map")
    .update({
      updated_at: db.fn.now(),
      display_sequence,
      user_role,
      user_role_expire_at,
    })
    .where({
      fk_user_id: userDetails.id,
      fk_home_id: id,
      is_deleted: false,
    })
    .returning("*");

  return _.first(result);
};

const deleteUserHomeMap = async (data) => {
  const { jwtUser, homeDetails, userDetails } = data;
  const { id } = homeDetails;
  const { id: userId } = userDetails;

  const result = await db("user_home_map")
    .where("fk_user_id", userId)
    .where("fk_home_id", id)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};

const fetchUserHomeMapByHomeAndUserId = async (data) => {
  const { jwtUser, homeDetails, userDetails } = data;
  const { homeId } = homeDetails;
  const { userId } = userDetails;

  const result = await db
    .select("*")
    .from("user_home_map")
    .where({ fk_home_id: homeId, fk_user_id: userId, is_deleted: false });
  return result;
};

module.exports = {
  createUserHomeMap,
  deleteUserHomeMap,
  fetchUserHomeMapByHomeAndUserId,
  updateUserHomeMapDetails,
};
