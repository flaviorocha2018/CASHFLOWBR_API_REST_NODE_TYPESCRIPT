import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.transactions, table => {
      table.bigIncrements('id').primary().index();
      table.integer('debitedAccountId').index().notNullable();
      table.integer('creditedAccountId').index().notNullable();
      table.decimal('value', 9,2).notNullable();
      table.timestamp('creditedAt').defaultTo(knex.fn.now());
      table.integer('accountId').unsigned().unique();
      table.foreign('debitedAccountId').references('accountId').inTable('user').onUpdate('CASCADE').onDelete('RESTRICT');
      table.foreign('creditedAccountId').references('accountId').inTable('user').onUpdate('CASCADE').onDelete('RESTRICT');
    
      // references all transactions of users accountId 
      // references credit and debit transactions to an account
      table.comment('Table to insert "transactions"  in transactions ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.transactions}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.transactions)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.transactions}`);
    });
}