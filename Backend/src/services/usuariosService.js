const {v4:uuid} = require('uuid');
const users = require('../models/users');

const getAllUsers = async () => {
    try{
        const allUsers = await users.getAllUsers();
        return allUsers;
    }catch(error){
        throw error;
    }
};

const getOneUser = async (userName, userPass) => {
    try{
        const user = await users.getOneUser(userName, userPass);
        return user;
    }catch(error){
        throw error;
    }
};

const createNewUser = async (newUser) => {
    const userToInsert = {
        id: uuid(),
        ...newUser,
    };
    try{
        const createdUser = await users.createNewUser(userToInsert);
        return createdUser;
    }catch(error){
        throw error;
    };
};

const updateOneUser = async (userId, changes) => {
    try{
        const updatedUser = await users.updateOneUser(userId, changes);
        return updatedUser;
    }catch(error){
        throw error;
    }
};

const deleteOneUser = async (userId) => {
    try{
        await users.deleteOneUser(userId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};