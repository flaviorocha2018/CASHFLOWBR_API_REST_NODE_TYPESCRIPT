import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Clients - UpdateById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCity = await testServer
      .post('/city')
      .send({ name: 'Teste' });

    cityId = resCity.body;
  });


  it('Updating a register', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        name: 'Juca',
        lastName: 'Silva',
        email: 'testeupdate@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/clients/${res1.body}`)
      .send({
        cityId,
        name: 'Juca',
        lastName: 'silva',
        email: 'testesupdates@gmail.com',
      });
    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Try to update a register that it does not exist', async () => {
    const res1 = await testServer
      .put('/clients/99999')
      .send({
        cityId,
        email: 'juca@gmail.com',
        name: 'Juca',
        lastName: 'silva',
      });

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});