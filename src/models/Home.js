const createHome = async (data) => {
  const { jwtUser, homeDetails } = data;
  const { name, address } = homeDetails;
  const { userId } = jwtUser;

  const result = await db("home")
    .insert({
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
      name,
      address,
      updated_at: db.fn.now(),
    })
    .where({
      id,
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

  const query = db("user as u")
    .count("r.id as room_count")
    .select("h.id", "h.name", "h.address")
    .select(db.raw("MIN(uhm.display_sequence) as display_sequence"))
    .innerJoin("user_home_map as uhm", function () {
      this.on("u.user_id", "=", "uhm.fk_user_id")
        .andOn("u.is_deleted", "=", db.raw("?", [false]))
        .andOn("uhm.is_deleted", "=", db.raw("?", [false]));
    })
    .innerJoin("home as h", function () {
      this.on("h.id", "=", "uhm.fk_home_id").andOn(
        "h.is_deleted",
        "=",
        db.raw("?", [false])
      );
    })
    .leftJoin("room as r", function () {
      this.on("h.id", "=", "r.fk_home_id").andOn(
        "r.is_deleted",
        "=",
        db.raw("?", [false])
      );
    })
    .where("u.user_id", userId)
    .groupBy("h.id")
    .orderBy("display_sequence", "asc");

  const result = await query;
  return result;
};

module.exports = {
  createHome,
  updateHome,
  deleteHome,
  restoreHomeModal,
  fetchHomeByUserId,
};
