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
  const { id, name, isFavorite } = switchDetails;

  const result = await db("switch")
    .update({
      name,
      updated_at: db.fn.now(),
      is_favorite: isFavorite,
    })
    .where({
      id,
      is_deleted: false,
    })
    .returning("*");

  return _.first(result);
};

const deleteSwitch = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { id } = switchDetails;

  const result = await db("switch")
    .where("id", id)
    .where("is_deleted", false)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return result;
};

const restoreSwichModal = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { id } = switchDetails;
  const { userId } = jwtUser;

  const result = await db("switch")
    .where("id", id)
    .where("is_deleted", true)
    .update({
      is_deleted: false,
    })
    .returning("*");
  console.log(result);
  return result;
};

const fetchSwitchesByRoomId = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { roomId } = switchDetails;
  const { userId } = jwtUser;

  const result = await db("switch as s")
    .select("s.id", "s.name", "s.type", "s.state", "s.power_value_percentage")
    .where({
      "s.is_deleted": false,
      "s.fk_room_id": roomId,
    });
  // .orderBy("s.created_at", "ASC");

  return result;
};

const fetchSwitchHardwareDetailsBySwitchId = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { id } = switchDetails;
  const { userId } = jwtUser;

  const result = await db("switch as s")
    .select("s.id", "s.state", "sh.switch_acronym", "sh.fk_microcontroller_id")
    .innerJoin("switch_hardware as sh", "sh.serial_id", "s.switch_serial_id")
    .where({ "s.is_deleted": false, id })
    .first();
  return result;
};

const updateSwitchStateInDb = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { id, state } = switchDetails;

  const result = await db("switch")
    .update({
      state,
    })
    .where({
      id,
      is_deleted: false,
    })
    .returning("*");

  return _.first(result);
};

module.exports = {
  createSwitches,
  updateSwitch,
  deleteSwitch,
  restoreSwichModal,
  fetchSwitchesByRoomId,
  fetchSwitchHardwareDetailsBySwitchId,
  updateSwitchStateInDb,
};
