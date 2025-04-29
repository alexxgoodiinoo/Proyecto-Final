const DB = require("../database/playersDB");

const getAllPlayers = async () => {
  try {
    let players = await DB.getPlayers();
    return players;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOnePlayer = async (playerId) => {
  try {
    let player = await DB.getOnePlayer(playerId);
    if (!player) {
      throw {
        status: 400,
        message: `Can't find player with the id '${playerId}'`,
      };
    }
    return player;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewPlayer = async (newPlayer) => {
  try {
    await DB.createNewPlayer(newPlayer);
    return newPlayer;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOnePlayer = async (playerId, changes) => {
  try {
    const updatePlayer = {
      ...await DB.getOnePlayer(playerId),
      ...changes,
    };
    await DB.updateOnePlayer(updatePlayer, playerId);
    return updatePlayer;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOnePlayer = async (playerId) => {
    try{
        await DB.deleteOnePlayer(playerId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllPlayers,
  createNewPlayer,
  getOnePlayer,
  updateOnePlayer,
  deleteOnePlayer,
};