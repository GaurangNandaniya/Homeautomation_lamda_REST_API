const createHome = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { name, address } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("home")
    .insert({
      fk_user_id: userId,
      name,
      address,
      updated_at: db.fn.now(),
      created_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};

const updateHome = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { id, name, address } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("home")
    .update({
      id,
      name,
      address,
      updated_at: db.fn.now(),
    })
    .where({
      fk_user_id: userId,
      is_deleted: false,
    })
    .returning("*");

  return _.first(result);
};

const deleteHome = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { id } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("home")
    .where("id", id)
    .where("is_deleted", false)
    .where("fk_user_id", userId)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return result;
};

const restoreHomeModal = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { id, name, address } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("home")
    .where("id", id)
    .where("is_deleted", true)
    .update({
      is_deleted: false,
    })
    .returning("*");

  return result;
};

const fetchHomeByUserId = async (data) => {
  const { jwtUser } = data;
  const { userId } = jwtUser;

  const result = await db("home as h")
    .select("h.id", "h.name", "h.address", db.raw("COUNT(r.id) as room_count"))
    .leftJoin("room as r", function () {
      this.on("r.fk_home_id", "h.id").on("r.is_deleted", db.raw("?", [false]));
    })
    .where({
      "h.is_deleted": false,
      "h.fk_user_id": userId,
    })
    .groupBy("h.id");

  return result;
};

module.exports = {
  createHome,
  updateHome,
  deleteHome,
  restoreHomeModal,
  fetchHomeByUserId,
};
