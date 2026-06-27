exports.seed = async function (knex) {
  // Limpa os dados para evitar usuários duplicados ao rodar o seed mais de uma vez
  await knex('palpites').del();
  await knex('usuarios').del();

  // Cadastra usuários simples para testar o login da API
  await knex('usuarios').insert([
    {
      nome: 'Joao Silva',
      email: 'joao@email.com',
      senha: '123456'
    },
    {
      nome: 'Maria Souza',
      email: 'maria@email.com',
      senha: '123456'
    }
  ]);
};
