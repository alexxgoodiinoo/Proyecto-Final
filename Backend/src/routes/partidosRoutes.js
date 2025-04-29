const express = require('express');
const partidosController = require('../controllers/partidosController');
const router = express.Router();

router.get("/", partidosController.getAllMatchs);

router.get("/:matchId", partidosController.getOneMatch);

router.post("/", partidosController.createNewMatch);

router.patch("/:matchId", partidosController.updateOneMatch);

router.delete("/:matchId", partidosController.deleteOneMatch);

module.exports = router;