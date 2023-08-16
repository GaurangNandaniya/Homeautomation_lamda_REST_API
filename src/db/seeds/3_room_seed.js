exports.seed = function (knex) {
  return knex("room").insert([
    {
      fk_home_id: 1,
      name: "Living Room",
    },
    {
      fk_home_id: 1,
      name: "Bedroom",
    },
    {
      fk_home_id: 2,
      name: "Kitchen",
    },
  ]);
};
