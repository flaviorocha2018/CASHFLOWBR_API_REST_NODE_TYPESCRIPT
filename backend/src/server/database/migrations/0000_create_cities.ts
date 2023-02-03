import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.cities, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();
      table.string('state', 2).index().notNullable();

      table.comment('Table used to store cities in this system.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cities}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.cities)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.cities}`);
    });
}
