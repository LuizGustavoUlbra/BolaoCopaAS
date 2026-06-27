exports.up = function (knex) {
  // Cria a tabela que guarda os usuários usados no login
  return knex.schema.createTable('usuarios', function (tabela) {
    tabela.increments('id').primary();
    tabela.string('nome').notNullable();
    tabela.string('email').notNullable().unique();
    tabela.string('senha').notNullable();
    tabela.timestamp('criado_em').defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  // Remove a tabela caso seja necessário desfazer a migration
  return knex.schema.dropTable('usuarios');
};
