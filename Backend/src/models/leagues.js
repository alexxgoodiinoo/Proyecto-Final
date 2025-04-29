const DB = require("../database/leaguesDB");

const getAllLeagues = async () => {
  try {
    let leagues = await DB.getLeagues();
    return leagues;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneLeague = async (leagueId) => {
  try {
    let league = await DB.getOneLeague(leagueId);
    if (!league) {
      throw {
        status: 400,
        message: `Can't find league with the id '${leagueId}'`,
      };
    }
    return league;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewLeague = async (newLeague) => {
  try {
    await DB.createNewLeague(newLeague);
    return newLeague;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneLeague = async (leagueId, changes) => {
  try {
    const updateLeague = {
      ...await DB.getOneLeague(leagueId),
      ...changes,
    };
    await DB.updateOneLeague(updateLeague, leagueId);
    return updateLeague;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneLeague = async (leagueId) => {
    try{
        await DB.deleteOneLeague(leagueId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllLeagues,
  createNewLeague,
  getOneLeague,
  updateOneLeague,
  deleteOneLeague,
};