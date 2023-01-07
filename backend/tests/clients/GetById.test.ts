import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Clients - GetById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .send({ name: 'Teste' });

    cityId = resCidade.body;
  });


  it('Get register by id', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        name: 'Juca',
        lastName: 'Silva',
        email: 'testegetbyid@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resGotById = await testServer
      .get(`/clients/${res1.body}`)
      .send();
    expect(resGotById.statusCode).toEqual(StatusCodes.OK);
    expect(resGotById.body).toHaveProperty('name');
  });
  it('Try to get a register that it does not exist', async () => {
    const res1 = await testServer
      .get('/clients/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});