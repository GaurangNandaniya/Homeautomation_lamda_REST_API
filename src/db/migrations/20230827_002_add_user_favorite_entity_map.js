exports.up = function (knex) {
  return knex.schema.createTable("user_favorite_entity_map", function (table) {
    table.increments("id").primary();
    table
      .integer("fk_user_id")
      .unsigned()
      .references("user_id")
      .inTable("user");
    table.integer("entity_id");
    table.string("entity_type");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("user_favorite_entity_map");
};
