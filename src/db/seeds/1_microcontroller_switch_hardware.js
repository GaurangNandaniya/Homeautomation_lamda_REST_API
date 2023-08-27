exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("switch_hardware")
    .del()
    .then(function () {
      return knex("microcontroller_hardware").del();
    })
    .then(function () {
      // Inserts seed entries for microcontroller_hardware
      return knex("microcontroller_hardware").insert([
        {
          id: 1,
          name: "Microcontroller 1",
          bt_serial_uuid: "dbedefda-a895-4f09-ae65-245bec59e43a",
          bt_characteristic_uuid: "6931daf4-b223-44b7-b16b-ba1a24f2722b",
        },
        {
          id: 2,
          name: "Microcontroller 2",
          bt_serial_uuid: "UUID2",
          bt_characteristic_uuid: "CHAR2",
        },
        // Add more entries here if needed
      ]);
    })
    .then(function () {
      // Inserts seed entries for switch_hardware (12 switches for the first microcontroller, 8 for the second)
      const switchHardwareEntries = [];

      // Microcontroller 1 with 12 switches
      for (let i = 1; i <= 12; i++) {
        switchHardwareEntries.push({
          serial_id: `MC1-SWITCH${i}`,
          fk_microcontroller_id: 1,
          switch_acronym: `SWITCH_${i}`,
          created_at: knex.fn.now(),
        });
      }

      // Microcontroller 2 with 8 switches
      for (let i = 1; i <= 8; i++) {
        switchHardwareEntries.push({
          serial_id: `MC2-SWITCH${i}`,
          fk_microcontroller_id: 2,
          switch_acronym: `SWITCH_${i}`,
          created_at: knex.fn.now(),
        });
      }

      return knex("switch_hardware").insert(switchHardwareEntries);
    });
};
