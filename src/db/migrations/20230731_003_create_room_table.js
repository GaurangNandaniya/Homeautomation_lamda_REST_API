exports.up = function (knex) {
  return knex.schema.createTable("room", function (table) {
    table.increments("id").primary();
    table.integer("fk_home_id").unsigned().references("home.id");
    table.string("name");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("room");
};
