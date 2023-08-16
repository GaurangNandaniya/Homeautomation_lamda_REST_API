exports.up = function (knex) {
  return knex.schema.createTable("switch_state_logs", function (table) {
    table.increments("id").primary();
    table.timestamp("updated_at");
    table.integer("updated_by");
    table.integer("fk_switch_id");
    table.string("state");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("switch_state_logs");
};
