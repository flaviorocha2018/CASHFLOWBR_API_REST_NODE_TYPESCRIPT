import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.attendance, table => {
      table.bigIncrements('id').primary().index();
      table.integer('clientId').index().notNullable().references('id')
        .inTable(ETableNames.client).onUpdate('CASCADE').onDelete('RESTRICT');
      table.date('dateReference').notNullable();
      table.string('issue').notNullable();
      table.integer('userId').notNullable().references('id')
        .inTable(ETableNames.user).onUpdate('CASCADE').onDelete('RESTRICT');
      table.date('followUp').notNullable();
      table.integer('status').notNullable().references('id')
        .inTable(ETableNames.status).onUpdate('CASCADE').onDelete('RESTRICT');

      table.comment('Table to insert "attendance" in attendance table ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.attendance}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.attendance)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.attendance}`);
    });
}