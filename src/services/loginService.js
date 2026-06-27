const jwt = require('jsonwebtoken');
const banco = require('../database');

const chaveJwt = 'segredo-bolao-copa-2026';

async function fazerLogin(email, senha) {
  // Busca um usuário com o mesmo email e senha enviados na requisição
  const usuario = await banco('usuarios')
    .where({ email, senha })
    .first();

  if (!usuario) {
    return null;
  }

  // Gera o token colocando o id do usuário no payload
  const token = jwt.sign(
    { id: usuario.id },
    chaveJwt,
    { expiresIn: '1d' }
  );

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email
    }
  };
}

module.exports = {
  fazerLogin,
  chaveJwt
};
