const {v4:uuid} = require('uuid');
const matchs = require('../models/matchs');

const getAllMatchs = async () => {
    try{
        const allMatchs = await matchs.getAllMatchs();
        return allMatchs;
    }catch(error){
        throw error;
    }
};

const getOneMatch = async (matchId) => {
    try{
        const match = await matchs.getOneMatch(matchId);
        return match;
    }catch(error){
        throw error;
    }
};

const createNewMatch = async (newMatch) => {
    const matchToInsert = {
        id: uuid(),
        ...newMatch,
    };
    try{
        const createdMatch = await matchs.createNewMatch(matchToInsert);
        return createdMatch;
    }catch(error){
        throw error;
    };
};

const updateOneMatch = async (matchId, changes) => {
    try{
        const updatedMatch = await matchs.updateOneMatch(matchId, changes);
        return updatedMatch;
    }catch(error){
        throw error;
    }
};

const deleteOneMatch = async (matchId) => {
    try{
        await matchs.deleteOneMatch(matchId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllMatchs,
    getOneMatch,
    createNewMatch,
    updateOneMatch,
    deleteOneMatch,
};