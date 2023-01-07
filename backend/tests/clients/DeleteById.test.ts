import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Clients - DeleteById', () => {
  let cityId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/city')
      .send({ name: 'Teste' });

    cityId = resCidade.body;
  });


  it('Delete a register', async () => {
    const res1 = await testServer
      .post('/clients')
      .send({
        cityId,
        email: 'testedelete@gmail.com',
        name: 'Juca',
        lastName: 'Silva'
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const restDeleted = await testServer
      .delete(`/clients/${res1.body}`)
      .send();
    expect(restDeleted.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  it('Try to delete a register that does not exist', async () => {
    const res1 = await testServer
      .delete('/clients/99999')
      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});