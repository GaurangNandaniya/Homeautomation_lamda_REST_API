exports.up = function (knex) {
  return knex.schema.createTable("switch_hardware", function (table) {
    table.string("serial_id").primary();
    table
      .integer("fk_microcontroller_id")
      .unsigned()
      .references("microcontroller_hardware.id");
    table.string("switch_acronym");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("switch_hardware");
};
