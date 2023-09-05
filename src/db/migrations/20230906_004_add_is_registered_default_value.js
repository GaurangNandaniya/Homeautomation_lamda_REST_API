exports.up = function (knex) {
  return knex.schema
    .alterTable("microcontroller_hardware", function (table) {
      // Set the default value of is_registered to false
      table.boolean("is_registered").defaultTo(false).alter();
    })
    .alterTable("switch_hardware", function (table) {
      // Set the default value of is_registered to false
      table.boolean("is_registered").defaultTo(false).alter();
    });
};

exports.down = function (knex) {
  return knex.schema
    .alterTable("microcontroller_hardware", function (table) {
      // If necessary, you can revert the default value here
      table.boolean("is_registered").alter();
    })
    .alterTable("switch_hardware", function (table) {
      // If necessary, you can revert the default value here
      table.boolean("is_registered").alter();
    });
};
