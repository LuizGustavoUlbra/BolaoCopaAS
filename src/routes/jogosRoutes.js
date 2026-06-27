const express = require('express');
const jogosController = require('../controllers/jogosController');

const rotas = express.Router();

// Rota pública para listar jogos da Copa 2026
rotas.get('/jogos', jogosController.listar);

module.exports = rotas;
