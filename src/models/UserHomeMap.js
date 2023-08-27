const createUserHomeMap = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { id } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("user_home_map")
    .insert({
      fk_user_id: userId,
      fk_home_id: id,
      created_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};
const deleteUserHomeMap = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { id } = homeDetails;
  const { userId } = jwtUser;

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

module.exports = {
  createUserHomeMap,
  deleteUserHomeMap,
};
