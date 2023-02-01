import { Knex } from 'knex';
import path from 'path';


// https://stackoverflow.com/questions/49697082/node-postgres-connection-terminated-unexpectedly
export const development: Knex.Config = {
  // client: 'sqlite3',
  client: 'pg',
  
  connection: {
    // filename: path.resolve(__dirname, '..', '..', '..', '..', 'database.sqlite')
    user: 'postgres',
    password: '07021998',
    database: 'Cashflow_Billing',
    host: 'localhost',
    port: 5432,
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    afterCreate: (connection: any, done: Function) => {
      // connection.run('PRAGMA foreign_keys = ON');
      done();
    }
  }
};

export const test: Knex.Config = {
  ...development,
  connection: ':memory:',
};

export const production: Knex.Config = {
  ...development,
};