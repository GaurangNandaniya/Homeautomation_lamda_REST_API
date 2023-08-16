exports.seed = function (knex) {
  return knex("switch").insert([
    {
      fk_room_id: 1,
      name: "Switch 1",
      type: "SIMPLE",
      switch_serial_id: "SW123",
      state: "ON",
    },
    {
      fk_room_id: 1,
      name: "Switch 2",
      type: "CONTROLLER",
      switch_serial_id: "SW456",
      state: "OFF",
    },
    {
      fk_room_id: 2,
      name: "Switch 3",
      type: "SIMPLE",
      switch_serial_id: "SW789",
      state: "OFF",
    },
  ]);
};
