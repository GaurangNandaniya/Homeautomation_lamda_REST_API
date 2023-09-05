exports.up = async function (knex) {
  // Update all records in microcontroller_hardware to set is_registered to false
  await knex("microcontroller_hardware").update({ is_registered: false });

  // Update all records in switch_hardware to set is_registered to false
  await knex("switch_hardware").update({ is_registered: false });
};

exports.down = async function (knex) {
  // In a down migration, you could revert these updates if necessary.
  // However, since this is a data update and not a schema change, there's typically no need for a down migration.
};
