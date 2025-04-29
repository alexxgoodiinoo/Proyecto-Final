const express = require('express');
const equiposController = require('../controllers/equiposController');
const router = express.Router();

router.get("/", equiposController.getAllTeams);

router.get("/:teamId", equiposController.getOneTeam);

router.get("/:teamId/jugadores", equiposController.getTeamPlayers);

router.post("/", equiposController.createNewTeam);

router.patch("/:teamId", equiposController.updateOneTeam);

router.delete("/:teamId", equiposController.deleteOneTeam);

module.exports = router;