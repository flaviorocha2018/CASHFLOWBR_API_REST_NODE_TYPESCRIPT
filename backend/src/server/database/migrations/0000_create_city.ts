import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).checkLength('<=',150).index().notNullable();
      table.string('state', 2).checkLength('=',2).index().notNullable();

      table.comment('Table to insert "clients" city');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.city)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.city}`);
    });
}

