const updateMicrocontrollerHardwareDataByIds = async (data) => {
  const { jwtUser, microcontrollerIds, updateData } = data;

  const { is_registered } = updateData;
  const updateObj = {
    is_registered,
    registered_at: _.isNil(is_registered) ? undefined : db.fn.now(),
  };

  const result = await db("microcontroller_hardware as mh")
    .update(updateObj)
    .whereIn("mh.id", microcontrollerIds)
    .where("mh.is_registered", false);

  return result;
};
module.exports = {
  updateMicrocontrollerHardwareDataByIds,
};
