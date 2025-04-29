const ligasService = require('../services/ligasService');

const getAllLeagues = async (req, res) => {
    try{
        const allLeagues = await ligasService.getAllLeagues();
        res.send({ status:'OK', data: allLeagues });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneLeague = async (req, res) => {
    const{
        params: {leagueId},
    } = req;
    if(!leagueId){
        return res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':leagueId' can not be empty" }, 
            });
    }
    try{
        const league = await ligasService.getOneLeague(leagueId);
        res.send({ status:'OK', data: league });
    }catch(error){
        return res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewLeague = async (req, res) => {
    const body = req.body;
    if(
        !body.nombre
    ){
        res.status(400).send({
            status: "FAILED",
            data:{
                error:
                    "One of the following keys is missing or is empty in request body"
            },
        });
        return;
    }

    const newLeague = {
        nombre: body.nombre
    };
    try{
        const createdLeague = await ligasService.createNewLeague(newLeague);
        res.status(201).send({status: 'OK', data: createdLeague});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneLeague = async (req, res) => {
    const {
        body,
        params: {leagueId}
    } = req;
    if(!leagueId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':leagueId' can not be empty" } 
            });
        return;
    }
    try{
        const updatedLeague = await ligasService.updateOneLeague(leagueId, body);
        res.send({status: 'OK', data: updatedLeague});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneLeague = async (req, res) => {
    const {
        params: {leagueId},
    } = req;
    if(!leagueId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':leagueId' can not be empty" } 
            });
    }
    try{
        await ligasService.deleteOneLeague(leagueId);
        res.status(204).send({status: 'OK'});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllLeagues,
    getOneLeague,
    createNewLeague,
    updateOneLeague,
    deleteOneLeague,
};