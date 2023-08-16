exports.seed = function (knex) {
  return knex("microcontroller_hardware").insert([
    {
      name: "Microcontroller 1",
    },
    {
      name: "Microcontroller 2",
    },
  ]);
};
