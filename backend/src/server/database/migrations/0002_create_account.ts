import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';



export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.accounts, table => {
      table.bigIncrements('id').primary().index();
      table.decimal('balance', 9,2).index().notNullable().defaultTo(100);

      table.comment('Table used to store accounts in this system.');
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.accounts}`);
    });
}

export async function alterTable(knex: Knex) {
  return knex
    .schema
    .alterTable(ETableNames.accounts, table => {
      table.integer('accountId').unsigned().unique();
      table.foreign('accountId').references('id').inTable('accounts').onUpdate('CASCADE').onDelete('RESTRICT');
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.accounts)
    .then(() => {
      console.log(`# Dropped table ${ETableNames.accounts}`);
    });
}
