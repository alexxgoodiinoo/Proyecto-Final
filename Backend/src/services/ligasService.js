const {v4:uuid} = require('uuid');
const leagues = require('../models/leagues');

const getAllLeagues = async () => {
    try{
        const allLeagues = await leagues.getAllLeagues();
        return allLeagues;
    }catch(error){
        throw error;
    }
};

const getOneLeague = async (leagueId) => {
    try{
        const league = await leagues.getOneLeague(leagueId);
        return league;
    }catch(error){
        throw error;
    }
};

const createNewLeague = async (newLeague) => {
    const leagueToInsert = {
        id: uuid(),
        ...newLeague,
    };
    try{
        const createdLeague = await leagues.createNewLeague(leagueToInsert);
        return createdLeague;
    }catch(error){
        throw error;
    };
};

const updateOneLeague = async (leagueId, changes) => {
    try{
        const updatedLeague = await leagues.updateOneLeague(leagueId, changes);
        return updatedLeague;
    }catch(error){
        throw error;
    }
};

const deleteOneLeague = async (leagueId) => {
    try{
        await leagues.deleteOneLeague(leagueId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllLeagues,
    getOneLeague,
    createNewLeague,
    updateOneLeague,
    deleteOneLeague,
};