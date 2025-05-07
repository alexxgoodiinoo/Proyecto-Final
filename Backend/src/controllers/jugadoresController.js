const jugadoresService = require('../services/jugadoresService');
const equiposService = require('../services/equiposService');

const getAllPlayers = async (req, res) => {
    try{
        const allPlayers = await jugadoresService.getAllPlayers();
        res.send({ status:'OK', data: allPlayers });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOnePlayer = async (req, res) => {
    const{
        params: {playerId},
    } = req;
    if(!playerId){
        return res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':playerId' can not be empty" }, 
            });
    }
    try{
        const player = await jugadoresService.getOnePlayer(playerId);
        res.send({ status:'OK', data: [player] });
    }catch(error){
        return res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewPlayer = async (req, res) => {
    const body = req.body;
    if(
        !body.nombre ||
        !body.apellidos ||
        !body.dorsal
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

    let id_equipo = null;
    if(body.id_equipo){
        try{
            const equipo = await equiposService.getOneTeam(body.id_equipo);
            if(!equipo){
                res.status(404).send({
                    status: "FAILED",
                    data: { error: "El equipo con el id " + id_equipo + " no existe" },
                });
                return;
            }
            id_equipo = body.id_equipo;
        } catch(error){
            res.status(500).send({
                status: "FAILED",
                data: { error: "Error al verificar el equipo" },
            });
            return;
        }
    }

    const newPlayer = {
        nombre: body.nombre,
        apellidos: body.apellidos,
        imagen: body.imagen,
        dorsal: body.dorsal,
        posicion: body.posicion,
        id_equipo: id_equipo,
    };
    try{
        const createdPlayer = await jugadoresService.createNewPlayer(newPlayer);
        res.status(201).send({status: 'OK', data: createdPlayer});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOnePlayer = async (req, res) => {
    const {
        body,
        params: {playerId}
    } = req;
    if(!playerId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':playerId' can not be empty" } 
            });
        return;
    }
    try{
        const updatedPlayer = await jugadoresService.updateOnePlayer(playerId, body);
        res.send({status: 'OK', data: updatedPlayer});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOnePlayer = async (req, res) => {
    const {
        params: {playerId},
    } = req;
    if(!playerId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':playerId' can not be empty" } 
            });
    }
    try{
        await jugadoresService.deleteOnePlayer(playerId);
        res.status(204).send({status: 'OK'});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllPlayers,
    getOnePlayer,
    createNewPlayer,
    updateOnePlayer,
    deleteOnePlayer,
};