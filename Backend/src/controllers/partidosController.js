const partidosService = require("../services/partidosService");
const equiposService = require("../services/equiposService");

const getAllMatchs = async (req, res) => {
  try {
    const allMatch = await partidosService.getAllMatchs();
    res.send({ status: "OK", data: allMatch });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getOneMatch = async (req, res) => {
  const {
    params: { matchId },
  } = req;
  if (!matchId) {
    return res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':matchId' can not be empty" },
    });
  }
  try {
    const match = await partidosService.getOneMatch(matchId);
    res.send({ status: "OK", data: match });
  } catch (error) {
    return res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewMatch = async (req, res) => {
  const body = req.body;

  let id_equipo_local = null;
  if (body.id_equipo_local) {
    
    try {
      const equipo = await equiposService.getOneTeam(body.id_equipo_local);
      if (!equipo) {
        res.status(404).send({
          status: "FAILED",
          data: { error: "El equipo local con el id " + id_equipo_local + " no existe" },
        });
        return;
      }
      id_equipo_local = body.id_equipo_local;
    } catch (error) {
      res.status(500).send({
        status: "FAILED",
        data: { error: "Error al verificar el equipo local" },
      });
      return;
    }
  }

  let id_equipo_visitante = null;
  if (body.id_equipo_visitante) {
    try {
      const equipo = await equiposService.getOneTeam(body.id_equipo_visitante);
      if (!equipo) {
        res.status(404).send({
          status: "FAILED",
          data: {
            error: "El equipo visitante con el id " + body.id_equipo_visitante + " no existe",
          },
        });
        return;
      }
      id_equipo_visitante = body.id_equipo_visitante;
    } catch (error) {
      res.status(500).send({
        status: "FAILED",
        data: { error: "Error al verificar el equipo visitante" },
      });
      return;
    }
  }

  const newMatch = {
    fecha: body.fecha,
    resultado: body.resultado,
    equipo_local: id_equipo_local,
    equipo_visitante: id_equipo_visitante,
    hora: body.hora,
  };
  try {
    const createdMatch = await partidosService.createNewMatch(newMatch);
    res.status(201).send({ status: "OK", data: createdMatch });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const updateOneMatch = async (req, res) => {
  const {
    body,
    params: { matchId },
  } = req;
  if (!matchId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':matchId' can not be empty" },
    });
    return;
  }
  
  try {
    const updatedMatch = await partidosService.updateOneMatch(matchId, body);
    res.send({ status: "OK", data: updatedMatch });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const deleteOneMatch = async (req, res) => {
  const {
    params: { matchId },
  } = req;
  if (!matchId) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':matchId' can not be empty" },
    });
  }
  try {
    await partidosService.deleteOneMatch(matchId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  getAllMatchs,
  getOneMatch,
  createNewMatch,
  updateOneMatch,
  deleteOneMatch,
};
