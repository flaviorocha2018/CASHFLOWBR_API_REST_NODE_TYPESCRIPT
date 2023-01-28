import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cnae, table => {
      table.bigIncrements('id').primary().index();
      table.string('code').notNullable();
      table.string('description').checkLength('<=', 150).index().notNullable();

      table.comment('Table used to store cities in this system.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cnae}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cnae)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cnae}`);
    });
}
