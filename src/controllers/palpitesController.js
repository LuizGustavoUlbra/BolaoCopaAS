const palpitesService = require('../services/palpitesService');

function responderErro(res, erro) {
  const status = erro.status || 500;
  const mensagem = erro.status ? erro.message : 'Erro interno no servidor';

  return res.status(status).json({ mensagem });
}

async function criar(req, res) {
  try {
    const palpite = await palpitesService.criarPalpite(req.usuarioId, req.body);
    return res.status(201).json(palpite);
  } catch (erro) {
    return responderErro(res, erro);
  }
}

async function listar(req, res) {
  try {
    const palpites = await palpitesService.listarPalpites(req.usuarioId);
    return res.json(palpites);
  } catch (erro) {
    return responderErro(res, erro);
  }
}

async function atualizar(req, res) {
  try {
    const palpite = await palpitesService.atualizarPalpite(
      req.params.id,
      req.usuarioId,
      req.body
    );

    return res.json(palpite);
  } catch (erro) {
    return responderErro(res, erro);
  }
}

async function deletar(req, res) {
  try {
    const resposta = await palpitesService.deletarPalpite(req.params.id, req.usuarioId);
    return res.json(resposta);
  } catch (erro) {
    return responderErro(res, erro);
  }
}

module.exports = {
  criar,
  listar,
  atualizar,
  deletar
};
