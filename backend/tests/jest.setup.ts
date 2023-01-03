import supertest from 'supertest';
import { Knex } from '../src/server/database/knex';
import { server } from '../src/server/Server';



import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['NG_CASH_KNEX/backend/setup-matchers.js'],
};

export default config;

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();

});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);