const express = require('express');
const loginController = require('../controllers/loginController');

const rotas = express.Router();

// Rota pública para autenticar o usuário
rotas.post('/login', loginController.login);

module.exports = rotas;
