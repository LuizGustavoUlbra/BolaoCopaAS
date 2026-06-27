const loginService = require('../services/loginService');

async function login(req, res) {
  const { email, senha } = req.body;

  // Chama o service para validar usuário e gerar o token
  const resultado = await loginService.fazerLogin(email, senha);

  if (!resultado) {
    return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
  }

  return res.json(resultado);
}

module.exports = {
  login
};
