exports.up = function (knex) {
  return knex.schema
    .table("user_home_map", function (table) {
      table.integer("display_sequence").notNullable().defaultTo(1);
    })
    .table("room", function (table) {
      table.integer("display_sequence").notNullable().defaultTo(1);
    })
    .table("switch", function (table) {
      table.integer("display_sequence").notNullable().defaultTo(1);
    });
};

exports.down = function (knex) {
  return knex.schema
    .table("user_home_map", function (table) {
      table.dropColumn("display_sequence");
    })
    .table("room", function (table) {
      table.dropColumn("display_sequence");
    })
    .table("switch", function (table) {
      table.dropColumn("display_sequence");
    });
};
