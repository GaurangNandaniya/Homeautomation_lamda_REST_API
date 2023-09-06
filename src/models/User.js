async function createUser(newUser) {
  const { firstName, lastName, email, password } = newUser;

  const result = await db("user")
    .insert({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      updated_at: db.fn.now(),
      created_at: db.fn.now(),
    })
    .returning("*");

  return result;
}

async function fetchUserByEmail(email) {
  return await db("user")
    .where("email", email)
    .where("is_deleted", false)
    .first();
}

async function fetchUserById(data) {
  const { jwtUser } = data;
  const { userId } = jwtUser;
  return await db("user")
    .where("user_id", userId)
    .where("is_deleted", false)
    .first();
}

const updateUser = async (data) => {
  const { firstName, lastName, userId } = data;

  // Update user data in the database
  const result = await db("user")
    .where("user_id", userId)
    .where("is_deleted", false)
    .update({
      first_name: firstName,
      last_name: lastName,
      updated_at: db.fn.now(),
    })
    .returning("*");

  return result;
};

const deleteUser = async (data) => {
  const { userId } = data;

  const result = await db("user")
    .where("user_id", userId)
    .where("is_deleted", false)
    .update({
      is_deleted: true,
      deleted_at: db.fn.now(),
    })
    .returning("*");

  return result;
};
const restoreUserModal = async (data) => {
  const { userId } = data;

  const result = await db("user")
    .where("user_id", userId)
    .where("is_deleted", true)
    .update({
      is_deleted: false,
    })
    .returning("*");

  return result;
};

module.exports = {
  createUser,
  fetchUserByEmail,
  fetchUserById,
  updateUser,
  deleteUser,
  restoreUserModal,
};
