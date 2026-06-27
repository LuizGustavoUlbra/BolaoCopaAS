exports.up = function (knex) {
  // Cria a tabela que guarda os palpites feitos por cada usuário
  return knex.schema.createTable('palpites', function (tabela) {
    tabela.increments('id').primary();
    tabela.integer('usuario_id').unsigned().notNullable();
    tabela.string('jogo').notNullable();
    tabela.integer('gols_a').notNullable();
    tabela.integer('gols_b').notNullable();
    tabela.string('data_jogo').notNullable();
    tabela.string('dolar_no_dia');
    tabela.boolean('dia_de_feriado').defaultTo(false);
    tabela.timestamp('criado_em').defaultTo(knex.fn.now());

    tabela.foreign('usuario_id').references('usuarios.id');
  });
};

exports.down = function (knex) {
  // Remove a tabela caso seja necessário desfazer a migration
  return knex.schema.dropTable('palpites');
};
