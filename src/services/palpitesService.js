const axios = require('axios');
const banco = require('../database');

function validarGols(golsA, golsB) {
  // Não permite placares com gols negativos
  if (golsA < 0 || golsB < 0) {
    const erro = new Error('Gols não podem ser negativos');
    erro.status = 400;
    throw erro;
  }
}

async function buscarDadosExternos(dataJogo) {
  const ano = new Date(dataJogo).getFullYear();

  // Faz as duas consultas externas ao mesmo tempo, como pedido no trabalho
  const [respostaDolar, respostaFeriados] = await Promise.all([
    axios.get('https://economia.awesomeapi.com.br/json/last/USD-BRL'),
    axios.get(`https://brasilapi.com.br/api/feriados/v1/${ano}`)
  ]);

  const dolarNoDia = respostaDolar.data.USDBRL.bid;
  const feriados = respostaFeriados.data;
  const diaDeFeriado = feriados.some((feriado) => feriado.date === dataJogo);

  return {
    dolarNoDia,
    diaDeFeriado
  };
}

async function criarPalpite(usuarioId, dados) {
  const { jogo, gols_a, gols_b, data_jogo } = dados;

  validarGols(gols_a, gols_b);

  const dadosExternos = await buscarDadosExternos(data_jogo);

  // Salva o palpite com os dados externos consultados
  const [id] = await banco('palpites').insert({
    usuario_id: usuarioId,
    jogo,
    gols_a,
    gols_b,
    data_jogo,
    dolar_no_dia: dadosExternos.dolarNoDia,
    dia_de_feriado: dadosExternos.diaDeFeriado
  });

  return banco('palpites').where({ id }).first();
}

async function listarPalpites(usuarioId) {
  // Lista apenas os palpites do usuário logado
  return banco('palpites')
    .where({ usuario_id: usuarioId })
    .orderBy('id', 'desc');
}

async function buscarPalpiteDoUsuario(id, usuarioId) {
  const palpite = await banco('palpites').where({ id }).first();

  if (!palpite || palpite.usuario_id !== usuarioId) {
    const erro = new Error('Você não pode acessar este palpite');
    erro.status = 403;
    throw erro;
  }

  return palpite;
}

async function atualizarPalpite(id, usuarioId, dados) {
  const { gols_a, gols_b } = dados;

  validarGols(gols_a, gols_b);
  await buscarPalpiteDoUsuario(id, usuarioId);

  // Atualiza somente o placar do palpite
  await banco('palpites')
    .where({ id })
    .update({ gols_a, gols_b });

  return banco('palpites').where({ id }).first();
}

async function deletarPalpite(id, usuarioId) {
  await buscarPalpiteDoUsuario(id, usuarioId);

  // Remove o palpite depois de confirmar que pertence ao usuário logado
  await banco('palpites').where({ id }).del();

  return { mensagem: 'Palpite deletado com sucesso' };
}

module.exports = {
  criarPalpite,
  listarPalpites,
  atualizarPalpite,
  deletarPalpite
};
