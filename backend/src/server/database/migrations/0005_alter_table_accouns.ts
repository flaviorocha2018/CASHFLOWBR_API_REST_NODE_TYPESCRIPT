import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';

export async function alterTable(knex: Knex) {
  return knex
    .schema
    .alterTable(ETableNames.accounts, table => {
      table.integer('accountId').unsigned().unique();
      table.foreign('accountId').references('id').inTable('accounts').onUpdate('CASCADE').onDelete('RESTRICT');

      table.comment('Adding a FK accountId to table accounts.');
    })
    .then(() => {
      console.log(`# Altered table ${ETableNames.accounts}`);
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
