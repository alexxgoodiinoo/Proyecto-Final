const DB = require("../database/teamsDB");

const getAllTeams = async () => {
  try {
    let teams = await DB.getTeams();
    return teams;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getOneTeam = async (teamId) => {
  try {
    let team = await DB.getOneTeam(teamId);
    if (!team) {
      throw {
        status: 400,
        message: `Can't find team with the id '${teamId}'`,
      };
    }
    return team;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewTeam = async (newTeam) => {
  try {
    await DB.createNewTeam(newTeam);
    return newTeam;
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const updateOneTeam = async (teamId, changes) => {
  try {
    const updateTeam = {
      ...await DB.getOneTeam(teamId),
      ...changes,
    };
    await DB.updateOneTeam(updateTeam, teamId);
    return updateTeam;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const deleteOneTeam = async (teamId) => {
    try{
        await DB.deleteOneTeam(teamId);
    }catch(error){
        throw { status: error?.status || 500, message: error?.message || error };   
    }
};

module.exports = {
  getAllTeams,
  createNewTeam,
  getOneTeam,
  updateOneTeam,
  deleteOneTeam,
};