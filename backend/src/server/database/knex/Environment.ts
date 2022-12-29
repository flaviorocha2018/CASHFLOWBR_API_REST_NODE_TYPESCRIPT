import { Knex } from 'knex';
import path from 'path';


export const development: Knex.Config = {
  client: 'pg',
  
  connection: {
    user: 'postgres',
    password: '07021998',
    database: 'NGCash',
    host: 'localhost',
    port: 5432,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations' ),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds' ),
  },
};


export const test: Knex.Config = {
  ...development,
  connection: ':memory:'
};

export const production: Knex.Config = {
  ...development,
};
