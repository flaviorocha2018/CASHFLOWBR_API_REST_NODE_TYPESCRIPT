import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.client, table => {
      table.bigIncrements('id').primary().index().unique();
      table.string('corporateName').index().notNullable();
      table.string('address').index().notNullable();
      table.string('complement').notNullable();
      table.string('neighborhood').notNullable();
      table
        .bigInteger('cityId')
        .index()
        .notNullable()
        .references('id')
        .inTable(ETableNames.cities)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      table.string('email').notNullable();
      table.bigInteger('cnpj').notNullable();
      table.bigInteger('inscrState').notNullable();
      table.bigInteger('inscrCity').notNullable();
      table.string('cnae').notNullable();
      table.string('typeOfBusiness').notNullable();
      table.string('contactName').notNullable();
      table.bigInteger('celular1').notNullable();
      table.bigInteger('celular2').notNullable();
      table.bigInteger('telephone').notNullable();
      table.date('sinceDate').notNullable();
      table.string('url').notNullable();
      table.bigInteger('salesManId').notNullable();
      table.bigInteger('status').notNullable();
      table.bigInteger('contractNumber');

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

