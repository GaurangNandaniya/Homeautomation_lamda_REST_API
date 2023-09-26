exports.up = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.string("user_role").defaultTo("OWNER"); // Add the user_role column with default value "OWNER"
    table.timestamp("user_role_expire_at"); // Add the user_role_expire_at column
  });
};

exports.down = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.dropColumn("user_role");
    table.dropColumn("user_role_expire_at");
  });
};
