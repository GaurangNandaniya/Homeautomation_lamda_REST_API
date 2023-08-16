exports.seed = function (knex) {
  const switchHardwareData = [];
  for (let i = 1; i <= 12; i++) {
    switchHardwareData.push({
      serial_id: `SW${i}`,
      fk_microcontroller_id: 1,
      switch_acronym: `SWITCH_${i}`,
    });
  }
  return knex("switch_hardware").insert(switchHardwareData);
};
