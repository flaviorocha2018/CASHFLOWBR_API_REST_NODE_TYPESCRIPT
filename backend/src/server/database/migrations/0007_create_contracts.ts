import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.contracts, table => {
      table.bigIncrements('id').primary().index();
      table.date('dateSignature').notNullable();
      table
        .integer('clientId')
        .index().unique()
        .notNullable()
        .references('id')
        .inTable(ETableNames.client)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.string('url').notNullable();
      table.string('terms').notNullable();
      table.string('addictiveTerm');
      table.date('dateAddictiveTerm').notNullable();
      table.integer('status').notNullable().unique()
        .references('id')
        .inTable(ETableNames.status)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.decimal('amount', 9,2).notNullable();

      table.comment('Table to insert "contracts"  in contracts ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.contracts}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.contracts)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.contracts}`);
    });
}

