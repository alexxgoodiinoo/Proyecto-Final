const express = require('express');
const jugadoresController = require('../controllers/jugadoresController');
const router = express.Router();

router.get("/", jugadoresController.getAllPlayers);

router.get("/:playerId", jugadoresController.getOnePlayer);

router.post("/", jugadoresController.createNewPlayer);

router.patch("/:playerId", jugadoresController.updateOnePlayer);

router.delete("/:playerId", jugadoresController.deleteOnePlayer);

module.exports = router;