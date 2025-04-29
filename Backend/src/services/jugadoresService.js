const {v4:uuid} = require('uuid');
const players = require('../models/players');

const getAllPlayers = async () => {
    try{
        const allPlayers = await players.getAllPlayers();
        return allPlayers;
    }catch(error){
        throw error;
    }
};

const getOnePlayer = async (playerId) => {
    try{
        const player = await players.getOnePlayer(playerId);
        return player;
    }catch(error){
        throw error;
    }
};

const createNewPlayer = async (newPlayer) => {
    const playerToInsert = {
        id: uuid(),
        ...newPlayer,
    };
    try{
        const createdPlayer = await players.createNewPlayer(playerToInsert);
        return createdPlayer;
    }catch(error){
        throw error;
    };
};

const updateOnePlayer = async (playerId, changes) => {
    try{
        const updatedPlayer = await players.updateOnePlayer(playerId, changes);
        return updatedPlayer;
    }catch(error){
        throw error;
    }
};

const deleteOnePlayer = async (playerId) => {
    try{
        await players.deleteOnePlayer(playerId);
    }catch(error){
        throw error;
    }
};

module.exports = {
    getAllPlayers,
    getOnePlayer,
    createNewPlayer,
    updateOnePlayer,
    deleteOnePlayer,
};