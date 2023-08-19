const fetchSwitchesByMicrocontrollerId = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { microcontrollerId } = switchDetails;
  const result = await db("switch_hardware as sh")
    .select("sh.serial_id", "sh.switch_acronym")
    .where("sh.fk_microcontroller_id", microcontrollerId);

  return result;
};

module.exports = {
  fetchSwitchesByMicrocontrollerId,
};
