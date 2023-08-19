const {
  createHome,
  updateHome,
  deleteHome,
  restoreHomeModal,
  fetchHomeByUserId,
} = require("../models/Home");

const createNewHome = async (data) => {
  const result = await createHome(data);
  return _.pick(result || {}, ["name", "id", "address"]);
};

const updateHomeDetails = async (data) => {
  const result = await updateHome(data);
  return _.pick(result || {}, ["name", "id", "address"]);
};

const removeHome = async (data) => {
  return await deleteHome(data);
};

const restoreHome = async (data) => {
  return await restoreHomeModal(data);
};

const getHomeByUserId = async (data) => {
  return await fetchHomeByUserId(data);
};

module.exports = {
  createNewHome,
  removeHome,
  updateHomeDetails,
  restoreHome,
  getHomeByUserId,
};
