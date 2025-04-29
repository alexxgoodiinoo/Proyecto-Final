const DB = require("../database/usersDB");

const getAllUsers = async () => {
  try {
    let users = await DB.getUsers();
    return users;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneUser = async (userName, userPass) => {
  try {
    let user = await DB.getOneUser(userName, userPass);
    if (!user) {
      throw {
        status: 400,
        message: `Can't find user with the username '${userName}' or password incorrect`,
      };
    }
    return user;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewUser = async (newUser) => {
  try {
    await DB.createNewUser(newUser);
    return newUser;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneUser = async (userId, changes) => {
  try {
    const updateUser = {
      ...await DB.getOneUser(userId),
      ...changes,
    };
    await DB.updateOneUser(updateUser, userId);
    return updateUser;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneUser = async (userId) => {
    try{
        await DB.deleteOneUser(userId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllUsers,
  createNewUser,
  getOneUser,
  updateOneUser,
  deleteOneUser,
};