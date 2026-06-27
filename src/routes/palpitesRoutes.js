const express = require('express');
const palpitesController = require('../controllers/palpitesController');
const autenticar = require('../middlewares/autenticacaoMiddleware');

const rotas = express.Router();

// Todas as rotas de palpites exigem usuário autenticado
rotas.post('/palpites', autenticar, palpitesController.criar);
rotas.get('/palpites', autenticar, palpitesController.listar);
rotas.put('/palpites/:id', autenticar, palpitesController.atualizar);
rotas.delete('/palpites/:id', autenticar, palpitesController.deletar);

module.exports = rotas;
