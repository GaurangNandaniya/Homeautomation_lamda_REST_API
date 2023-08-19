const createSwitches = async (data) => {
  const { jwtUser, switchDetails, microcontrollerSwitches } = data;
  const { roomId } = switchDetails;

  const insertData = _.map(
    microcontrollerSwitches,
    (microcontrollerSwitch, index) => {
      const { serial_id } = microcontrollerSwitch;
      return {
        fk_room_id: roomId,
        name: `Switch ${index + 1}`,
        type: "SIMPLE",
        switch_serial_id: serial_id,
        state: "OFF",
        updated_at: db.fn.now(),
        created_at: db.fn.now(),
      };
    }
  );

  const result = await db("switch").insert(insertData).returning("*");

  return result;
};

const updateSwitch = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { id, name } = switchDetails;

  const result = await db("switch")
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
  const { id, name, address } = roomDetails;
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
    .leftJoin("switch as s", function () {
      this.on("s.fk_room_id", "r.id").on("s.is_deleted", db.raw("?", [false]));
    })
    .where({
      "r.is_deleted": false,
      "r.fk_home_id": homeId,
    })
    .groupBy("r.id");

  return result;
};

module.exports = {
  createSwitches,
  updateSwitch,
  deleteRoom,
  restoreRoomModal,
  fetchRoomByHomeId,
};
