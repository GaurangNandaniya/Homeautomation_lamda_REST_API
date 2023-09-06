const createRoom = async (data) => {
  const { jwtUser, roomDetails } = data;
  const { name, address, homeId } = roomDetails;

  const result = await db("room")
    .insert({
      fk_home_id: homeId,
      name,
      updated_at: db.fn.now(),
      created_at: db.fn.now(),
    })
    .returning("*");

  return _.first(result);
};

const updateRoom = async (data) => {
  const { jwtUser, roomDetails } = data;
  const { id, name } = roomDetails;

  const result = await db("room")
    .update({
      name,
      updated_at: db.fn.now(),
    })
    .where({
      id,
      is_deleted: false,
    })
    .returning("*");

  return _.first(result);
};

const deleteRoom = async (data) => {
  const { jwtUser, roomDetails } = data;
  const { id } = roomDetails;

  const result = await db("room")
    .where("id", id)
    .where("is_deleted", false)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return result;
};

const restoreRoomModal = async (data) => {
  const { jwtUser, roomDetails } = data;
  const { id } = roomDetails;
  const { userId } = jwtUser;

  const result = await db("room")
    .where("id", id)
    .where("is_deleted", true)
    .update({
      is_deleted: false,
    })
    .returning("*");

  return result;
};

const fetchRoomByHomeId = async (data) => {
  const { jwtUser, roomDetails } = data;
  const { homeId } = roomDetails;
  const { userId } = jwtUser;

  const result = await db("room as r")
    .select("r.id", "r.name", db.raw("COUNT(s.id) as switch_count"))
    .select(db.raw("MIN(r.display_sequence) as display_sequence"))
    .leftJoin("switch as s", function () {
      this.on("s.fk_room_id", "r.id").on("s.is_deleted", db.raw("?", [false]));
    })
    .where({
      "r.is_deleted": false,
      "r.fk_home_id": homeId,
    })
    .groupBy("r.id")
    .orderBy("display_sequence", "asc");

  return result;
};

module.exports = {
  createRoom,
  updateRoom,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
};
