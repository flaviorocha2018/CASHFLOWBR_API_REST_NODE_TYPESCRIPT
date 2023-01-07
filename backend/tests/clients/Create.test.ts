import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - Create', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/city')
      .send({ name: 'Teste' });

    cityId = resCidade.body;
  });


  it('Create a register', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'juca@gmail.com',
        name: 'Juca',
        lastName: 'Silva'
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Create a register 2', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        name: 'Juca',
        lastName: 'Silva',
        email: 'juca2@gmail.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });
  it('Trying to create a register with an email duplicated', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        name: 'Juca',
        lastName: 'Silva',
        email: 'jucaduplicated@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');

    const res2 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'jucaduplicated@gmail.com',
        name: 'duplicated',
        lastName: 'Duplicated',
      });
    expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res2.body).toHaveProperty('errors.default');
  });
  it('Trying to create a register with a name very short', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'juca@gmail.com',
        nome: 'Ju',
        lastName: 'Short',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });
  it('Trying to create a register without a name and last name', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'juca@gmail.com',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.name');
  });
  it('Trying to create a register without email', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        name: 'Juca',
        lastName: 'Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Trying to create a register with an invalid email', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'juca gmail.com',
        nome: 'Juca',
        lastName: 'Silva'
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
  });
  it('Trying to create a register without cityId', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        email: 'juca@gmail.com',
        name: 'Juca',
        lastName: 'da Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cityId');
  });
  it('Trying to create a register with an invalid cityId', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId: 'test',
        email: 'juca@gmail.com',
        name: 'Juca',
        lastName: 'da Silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.cityId');
  });
  it('Trying to create a register without any property', async () => {

    const res1 = await testServer
      .post('/clients')
      .send({});

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.email');
    expect(res1.body).toHaveProperty('errors.body.cityId');
    expect(res1.body).toHaveProperty('errors.body.name');
  });
});