import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.billings, table => {
      table.bigIncrements('id').primary().index();
      table.bigInteger('clientId').references('id').inTable(ETableNames.client)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.date('dateReference').notNullable();
      table.decimal('amount', 9,2 ).notNullable();
      table.bigInteger('invoiceNumber').notNullable();
      table.date('invoiceDate').notNullable();
      table.date('dueDate').notNullable();
      table.decimal('amountPaid', 9,2).notNullable();
      table.date('paymentDate').notNullable();
      table.bigInteger('status').references('id').inTable(ETableNames.status)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table to insert "bills" in billing table ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.billings}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.billings)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.billings}`);
    });
}