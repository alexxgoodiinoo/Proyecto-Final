const express = require('express');
const ligasController = require('../controllers/ligasController');
const router = express.Router();

router.get("/", ligasController.getAllLeagues);

router.get("/:leagueId", ligasController.getOneLeague);

router.post("/", ligasController.createNewLeague);

router.patch("/:leagueId", ligasController.updateOneLeague);

router.delete("/:leagueId", ligasController.deleteOneLeague);

module.exports = router;