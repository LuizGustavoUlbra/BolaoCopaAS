const jogosService = require('../services/jogosService');

async function listar(req, res) {
  try {
    const jogos = await jogosService.listarJogos();
    return res.json(jogos);
  } catch (erro) {
    return res.status(500).json({ mensagem: 'Erro ao buscar jogos' });
  }
}

module.exports = {
  listar
};
