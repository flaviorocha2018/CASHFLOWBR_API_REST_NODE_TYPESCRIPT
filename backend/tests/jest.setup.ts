import supertest from 'supertest';
import { server } from '../src/server/Server';
import type {Config} from 'jest';

const config: Config = {
  setupFilesAfterEnv: ['NG_CASH_KNEX/backend/setup-matchers.js'],
};

export default config;



export const testServer = supertest(server);