exports.up = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.timestamp("updated_at");
  });
};

exports.down = function (knex) {
  return knex.schema.table("user_home_map", function (table) {
    table.dropColumn("updated_at");
  });
};
