exports.up = function (knex) {
  return knex.schema.createTable("switch", function (table) {
    table.increments("id").primary();
    table.integer("fk_room_id").unsigned().references("room.id");
    table.string("name");
    table.string("type");
    table.string("switch_serial_id");
    table.string("state");
    table.integer("power_value_percentage");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("switch");
};
