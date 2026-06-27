const jwt = require('jsonwebtoken');
const { chaveJwt } = require('../services/loginService');

function autenticar(req, res, next) {
  const authorization = req.headers.authorization;

  // Verifica se o token foi enviado no cabeçalho Authorization
  if (!authorization) {
    return res.status(401).json({ mensagem: 'Token não informado' });
  }

  const partes = authorization.split(' ');
  const token = partes[1];

  if (partes[0] !== 'Bearer' || !token) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }

  try {
    // Confere se o token é válido e guarda o id do usuário na requisição
    const dados = jwt.verify(token, chaveJwt);
    req.usuarioId = dados.id;

    return next();
  } catch (erro) {
    return res.status(401).json({ mensagem: 'Token inválido' });
  }
}

module.exports = autenticar;
