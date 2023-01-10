import  { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
  return knex
    .schema
    .createTable(ETableNames.user, table => {
      table.bigIncrements('id').primary().index();
      table.string('userName').unique().index().notNullable().checkLength('>=', 3);
      table.string('email').unique().index().notNullable(),
      table.string('password').unique().notNullable().checkRegex('/(?=.*[A-Z])(?=.*[0-9]).*$/').checkLength('>=', 8);
  
      table
        .integer('accountId')
        .unique()
        .index()
        .references('id')
        .inTable(ETableNames.accounts)
        .onUpdate('CASCADE')
        .onDelete('RESTRICT');
      // user accountId is a FK for accounts

      table.comment('Table to insert "users"  in table user ');
    })
    .then(() => {
      console.log(`# Created Table ${ETableNames.user}`);
    });
}

export async function down(knex: Knex) {
  return knex
    .schema
    .dropTable(ETableNames.user)
    .then(() => {
      console.log(`# Dropped Table ${ETableNames.user}`);
    });
}

