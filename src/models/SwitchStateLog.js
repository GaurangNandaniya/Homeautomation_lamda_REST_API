const insertSwitchStateLog = async (data) => {
  const { jwtUser, switchDetails } = data;
  const { userId } = jwtUser;
  const { id, state } = switchDetails;

  const result = await db("switch_state_logs").insert({
    updated_at: db.fn.now(),
    updated_by: userId,
    state,
    fk_switch_id: id,
  });

  return result;
};

module.exports = {
  insertSwitchStateLog,
};
