const {v4:uuid} = require('uuid');
const teams = require('../models/teams');

const getAllTeams = async () => {
    try{
        const allTeams = await teams.getAllTeams();
        return allTeams;
    }catch(error){
        throw error;
    }
};

const getOneTeam = async (teamId) => {
    try{
        const team = await teams.getOneTeam(teamId);
        return team;
    }catch(error){
        throw error;
    }
};

const createNewTeam = async (newTeam) => {
    const teamToInsert = {
        id: uuid(),
        ...newTeam,
    };
    try{
        const createdTeam = await teams.createNewTeam(teamToInsert);
        return createdTeam;
    }catch(error){
        throw error;
    };
};

const updateOneTeam = async (teamId, changes) => {
    try{
        const updatedTeam = await teams.updateOneTeam(teamId, changes);
        return updatedTeam;
    }catch(error){
        throw error;
    }
};

const deleteOneTeam = async (teamId) => {
    try{
        await teams.deleteOneTeam(teamId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllTeams,
    getOneTeam,
    createNewTeam,
    updateOneTeam,
    deleteOneTeam,
};