const DB = require("../database/matchsDB");

const getAllMatchs = async () => {
  try {
    let matchs = await DB.getMatchs();
    return matchs;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneMatch = async (matchId) => {
  try {
    let match = await DB.getOneMatch(matchId);
    if (!match) {
      throw {
        status: 400,
        message: `Can't find match with the id '${matchId}'`,
      };
    }
    return match;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewMatch = async (newMatch) => {
  try {
    await DB.createNewMatch(newMatch);
    return newMatch;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneMatch = async (matchId, changes) => {
  try {
    const updateMatch = {
      ...await DB.getOneMatch(matchId),
      ...changes,
    };
    await DB.updateOneMatch(updateMatch, matchId);
    return updateMatch;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneMatch = async (matchId) => {
    try{
        await DB.deleteOneMatch(matchId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllMatchs,
  createNewMatch,
  getOneMatch,
  updateOneMatch,
  deleteOneMatch,
};