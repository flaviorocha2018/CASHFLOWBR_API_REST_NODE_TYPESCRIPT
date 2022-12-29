import { table } from 'console';
import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.city, table => {
      table.bigIncrements('id').primary().index();
      table.string('name', 150).index().notNullable();
      table.string('state', 2).index().notNullable();
      table.comment('Table of "clients" city');
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

