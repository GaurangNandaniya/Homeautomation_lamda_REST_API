exports.seed = function (knex) {
  return knex("home").insert([
    {
      fk_user_id: 1,
      name: "Home 1",
      address: "123 Main St",
    },
    {
      fk_user_id: 2,
      name: "Home 2",
      address: "456 Elm St",
    },
  ]);
};
