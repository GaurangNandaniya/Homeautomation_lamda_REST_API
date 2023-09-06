const fetchSwitchesByMicrocontrollerId = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { microcontrollerId } = switchDetails;
  const result = await db("switch_hardware as sh")
    .select("sh.serial_id", "sh.switch_acronym")
    .where("sh.fk_microcontroller_id", microcontrollerId)
    .where("sh.is_registered", false);

  return result;
};

const updateSwitchHardwareDataBySerialIds = async (data) => {
  const { jwtUser, switchHardwareSerialIds, updateData } = data;

  const { is_registered } = updateData;
  const updateObj = {
    is_registered,
    registered_at: _.isNil(is_registered) ? undefined : db.fn.now(),
  };

  const query = db("switch_hardware as sh")
    .update(updateObj)
    .whereIn("sh.serial_id", switchHardwareSerialIds)
    .returning("*");

  const result = await query;

  return _.first(result);
};

module.exports = {
  fetchSwitchesByMicrocontrollerId,
  updateSwitchHardwareDataBySerialIds,
};
