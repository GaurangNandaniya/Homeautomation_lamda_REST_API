exports.up = function (knex) {
  return knex.schema.table("switch", function (table) {
    table.dropColumn("is_favorite");
  });
};

exports.down = function (knex) {
  return knex.schema.table("switch", function (table) {
    table.boolean("is_favorite").defaultTo(false);
  });
};
