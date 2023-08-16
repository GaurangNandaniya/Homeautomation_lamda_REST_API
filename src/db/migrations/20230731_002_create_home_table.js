exports.up = function (knex) {
  return knex.schema.createTable("home", function (table) {
    table.increments("id").primary();
    table.integer("fk_user_id").unsigned().references("user.user_id");
    table.string("name");
    table.string("address");
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.boolean("is_deleted").defaultTo(false);
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("home");
};
