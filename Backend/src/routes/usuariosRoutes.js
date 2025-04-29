const express = require('express');
const usuariosController = require('../controllers/usuariosController');
const router = express.Router();

router.get("/", usuariosController.getAllUsers);

router.get("/:userName/:userPass", usuariosController.getOneUser);

router.post("/", usuariosController.createNewUser);

router.patch("/:userId", usuariosController.updateOneUser);

router.delete("/:userId", usuariosController.deleteOneUser);

module.exports = router;