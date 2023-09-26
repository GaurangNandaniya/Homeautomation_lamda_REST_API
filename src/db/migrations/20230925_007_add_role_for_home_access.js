exports.up = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.string("user_role").defaultTo("OWNER"); // Add the user_role column with default value "OWNER"
    table.bigInteger("user_role_expire_at").defaultTo(0); // Use bigInteger to store timestamps in milliseconds
  });
};

exports.down = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.dropColumn("user_role");
    table.dropColumn("user_role_expire_at");
  });
};
