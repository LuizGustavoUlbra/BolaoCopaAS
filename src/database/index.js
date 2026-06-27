const knex = require('knex');
const configuracaoKnex = require('./knexfile');

// Inicializa a conexão com o banco utilizando as configurações de desenvolvimento
const conexao = knex(configuracaoKnex.development);

module.exports = conexao;
