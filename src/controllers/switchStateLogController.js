const { insertSwitchStateLog } = require("../models/SwitchStateLog");

const addSwitchStateUpdateLog = async (data) => {
  return await insertSwitchStateLog(data);
};

module.exports = { addSwitchStateUpdateLog };
