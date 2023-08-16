exports.up = function (knex) {
  return knex.schema.createTable("microcontroller_hardware", function (table) {
    table.increments("id").primary();
    table.string("name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("microcontroller_hardware");
};
