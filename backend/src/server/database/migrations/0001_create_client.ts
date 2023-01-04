import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.client, table => {
      table.bigIncrements('id').primary().index();
      table.string('name').index().notNullable();
      table.string('lastName').index().notNullable();
      table.string('email').unique().notNullable();

      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.city)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');

      table.comment('Table to insert "clients"  in client ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.client}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.client)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.client}`);
    });
}

