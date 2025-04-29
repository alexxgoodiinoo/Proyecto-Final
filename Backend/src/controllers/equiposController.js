const equiposService = require("../services/equiposService");
const ligasService = require("../services/ligasService");

const getAllTeams = async (req, res) => {
  try {
    const allTeams = await equiposService.getAllTeams();
    res.send({ status: "OK", data: allTeams });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneTeam = async (req, res) => {
  const {
    params: { teamId },
  } = req;
  if (!teamId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':teamId' can not be empty" },
    });
  }
  try {
    const team = await equiposService.getOneTeam(teamId);
    res.send({ status: "OK", data: [team] });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getTeamPlayers = async (req, res) => {
  const { teamId } = req.params; 
  try {
    const jugadores = await equiposService.getTeamPlayers(teamId);
    if (jugadores.length === 0) {
      return res.status(404).send({
        status: "FAILED",
        data: { error: `No players found for team with ID '${teamId}'` },
      });
    }
    res.send({ status: "OK", data: jugadores });
  } catch (error) {
    res.status(500).send({
      status: "FAILED",
      data: { error: error.message || error },
    });
  }
};

const createNewTeam = async (req, res) => {
  const body = req.body;
  if (!body.nombre) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body",
      },
    });
    return;
  }

  // let id_liga = null;
  // if(body.id_liga){
  //     try{
  //         const liga = await ligasService.getOneLeague(body.id_liga);
  //         if(!liga){
  //             res.status(404).send({
  //                 status: "FAILED",
  //                 data: { error: "La liga con el id " + id_liga + " no existe" },
  //             });
  //             return;
  //         }
  //         id_liga = body.id_liga;
  //     } catch(error){
  //         res.status(500).send({
  //             status: "FAILED",
  //             data: { error: "Error al verificar la liga" },
  //         });
  //         return;
  //     }
  // }

  const newTeam = {
    nombre: body.nombre,
    escudo: body.escudo,
    // id_liga: id_liga,
  };
  try {
    const createdTeam = await equiposService.createNewTeam(newTeam);
    res.status(201).send({ status: "OK", data: createdTeam });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneTeam = async (req, res) => {
  const {
    body,
    params: { teamId },
  } = req;
  if (!teamId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':teamId' can not be empty" },
    });
    return;
  }
  try {
    const updatedTeam = await equiposService.updateOneTeam(teamId, body);
    res.send({ status: "OK", data: updatedTeam });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneTeam = async (req, res) => {
  const {
    params: { teamId },
  } = req;
  if (!teamId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':teamId' can not be empty" },
    });
  }
  try {
    await equiposService.deleteOneTeam(teamId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllTeams,
  getOneTeam,
  getTeamPlayers,
  createNewTeam,
  updateOneTeam,
  deleteOneTeam,
};
