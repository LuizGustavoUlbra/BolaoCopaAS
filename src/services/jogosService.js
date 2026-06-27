const axios = require('axios');

async function listarJogos() {
  // Busca os jogos da Copa 2026 em uma API pública sem chave
  const resposta = await axios.get('https://www.thestatsapi.com/world-cup/data/fixtures.json');
  const jogos = resposta.data.fixtures || [];

  // Retorna apenas as informações importantes para a API
  return jogos.map((jogo) => ({
    partida: jogo.matchNumber,
    time_a: jogo.homeTeam,
    time_b: jogo.awayTeam,
    data: jogo.date
  }));
}

module.exports = {
  listarJogos
};
