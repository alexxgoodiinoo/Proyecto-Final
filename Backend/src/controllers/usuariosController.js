const usuariosService = require('../services/usuariosService');
const equiposService = require('../services/equiposService');

const getAllUsers = async (req, res) => {
    try{
        const allUsers = await usuariosService.getAllUsers();
        res.send({ status:'OK', data: allUsers });
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getOneUser = async (req, res) => {
    const{
        params: {userName, userPass},
    } = req;
    if(!userName || !userPass){
        return res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':userName' or ':userPass' can not be empty" }, 
            });
    }
    try{
        const user = await usuariosService.getOneUser(userName, userPass);
        res.send({ status:'OK', data: user });
    }catch(error){
        return res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const createNewUser = async (req, res) => {
    const body = req.body;
    if(
        !body.username ||
        !body.password ||
        !body.email ||
        !body.tipo_usuario
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
        if(body.tipo_usuario === "manager"){
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
        }else{
            res.status(500).send({
                status: "FAILED",
                data: { error: "Error, no eres Manager como para tener un equipo" },
            });
            return;
        }
    }

    const newUser = {
        username: body.username,
        password: body.password,
        email: body.email,
        tipo_usuario: body.tipo_usuario,
        id_equipo: id_equipo,
    };
    
    try{
        const createdUser = await usuariosService.createNewUser(newUser);
        res.status(201).send({status: 'OK', data: createdUser});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const updateOneUser = async (req, res) => {
    const {
        body,
        params: {userId}
    } = req;
    if(!userId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':userId' can not be empty" } 
            });
        return;
    }
    try{
        const updatedUser = await usuariosService.updateOneUser(userId, body);
        res.send({status: 'OK', data: updatedUser});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const deleteOneUser = async (req, res) => {
    const {
        params: {userId},
    } = req;
    if(!userId){
        res
            .status(400)
            .send({ 
                status: "FAILED", 
                data: { error: "Parameter ':userId' can not be empty" } 
            });
    }
    try{
        await usuariosService.deleteOneUser(userId);
        res.status(204).send({status: 'OK'});
    }catch(error){
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    getAllUsers,
    getOneUser,
    createNewUser,
    updateOneUser,
    deleteOneUser,
};