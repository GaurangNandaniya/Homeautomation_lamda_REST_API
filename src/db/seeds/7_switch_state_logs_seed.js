exports.seed = function (knex) {
  return knex("switch_state_logs").insert([
    {
      fk_switch_id: 1,
      updated_by: 1,
      state: "ON",
    },
    {
      fk_switch_id: 2,
      updated_by: 1,
      state: "OFF",
    },
    {
      fk_switch_id: 3,
      updated_by: 2,
      state: "OFF",
    },
  ]);
};
