import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.salesman, table => {
      table.bigIncrements('id').primary().index();
      table.string('firstName').index().notNullable();
      table.string('middleName').index().notNullable();
      table.string('lastName').index().notNullable();
      table.integer('identificationNumber').notNullable();
      table.date('dateIssued').notNullable();
      table.string('stateDepartment').notNullable();
      table.date('dateOfBirth').notNullable();
      table.integer('CPF').notNullable();
      table.string('email').notNullable();
      table.string('address').index().notNullable();
      table.string('complement').notNullable();
      table.string('neighborhood').notNullable();
      table.integer('cityId').notNullable();
      table.integer('cellular').notNullable();
    
      table.comment('Table to insert "salesman"  in salesman ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.salesman}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.salesman)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.salesman}`);
    });
}

