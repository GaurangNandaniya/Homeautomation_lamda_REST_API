const {
  createHome,
  updateHome,
  deleteHome,
  restoreHomeModal,
  fetchHomeByUserId,
} = require("../models/Home");
const {
  addUserHomeMap,
  getUserHomeMapByHomeAndUserId,
} = require("../controllers/UserHomeMapController");
const { getUserByEmail } = require("./userController");

const homeProperties = ["name", "id", "address"];

const createNewHome = async (data) => {
  const result = await createHome(data);
  const userHomes = await fetchHomeByUserId(data);
  await addUserHomeMap({
    ...data,
    userDetails: {
      id: data.jwtUser.userId,
    },
    homeDetails: {
      id: result.id,
      display_sequence: _.size(userHomes) + 1,
      user_role: "OWNER",
    },
  });
  return _.pick(result || {}, homeProperties);
};

const createUserHomeMapWithRole = async (data) => {
  const { jwtUser, userHomeRoleDetails } = data;
  const { id, role, homeId, expireAt } = userHomeRoleDetails;

  if (!_.includes(["OWNER", "CO_OWNER", "GUEST"], role)) {
    throw new Error("Requested role not found");
  }

  const userHomes = await fetchHomeByUserId({ jwtUser: { userId: id } });

  const result = await addUserHomeMap({
    ...data,
    userDetails: {
      id,
    },
    homeDetails: {
      id: homeId,
      display_sequence: _.size(userHomes) + 1,
      user_role: role,
      user_role_expire_at: expireAt,
    },
  });
  return result;
};

const checkUserHomeAvailibility = async (data) => {
  const { jwtUser, userDetails, homeDetails } = data;
  const { email } = userDetails;
  const user = await getUserByEmail(email);

  if (_.isEmpty(user)) {
    throw new Error("User doesn't exist");
  }

  const userHomeMap = await getUserHomeMapByHomeAndUserId({
    jwtUser,
    userDetails: { userId: user.user_id },
    homeDetails: { homeId: homeDetails.id },
  });

  if (!_.isEmpty(userHomeMap)) {
    throw new Error("User already exist in the home");
  }
  return user;
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
  createUserHomeMapWithRole,
  checkUserHomeAvailibility,
};
