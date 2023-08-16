exports.seed = function (knex) {
  return knex("user").insert([
    {
      first_name: "John",
      last_name: "Doe",
      email: "john@example.com",
      password: "hashed_password",
    },
    {
      first_name: "Jane",
      last_name: "Smith",
      email: "jane@example.com",
      password: "hashed_password",
    },
  ]);
};
