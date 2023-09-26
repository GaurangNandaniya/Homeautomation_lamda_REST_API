const {
  createHome,
  updateHome,
  deleteHome,
  restoreHomeModal,
  fetchHomeByUserId,
} = require("../models/Home");
const { addUserHomeMap } = require("../controllers/UserHomeMapController");

const homeProperties = ["name", "id", "address"];

const createNewHome = async (data) => {
  const result = await createHome(data);
  const userHomes = await fetchHomeByUserId(data);
  await addUserHomeMap({
    ...data,
    homeDetails: { id: result.id, display_sequence: _.size(userHomes) + 1 },
  });
  return _.pick(result || {}, homeProperties);
};

const updateHomeDetails = async (data) => {
  const result = await updateHome(data);
  return _.pick(result || {}, homeProperties);
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
