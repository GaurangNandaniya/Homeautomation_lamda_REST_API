exports.up = function (knex) {
  // Drop the foreign key constraint
  return knex.schema.alterTable("switch_state_logs", function (table) {
    table.dropForeign(["fk_switch_id"]);
  });
};

exports.down = function (knex) {
  // Re-create the foreign key constraint
  return knex.schema.alterTable("switch_state_logs", function (table) {
    table.foreign("fk_switch_id").references("id").inTable("switch");
  });
};
