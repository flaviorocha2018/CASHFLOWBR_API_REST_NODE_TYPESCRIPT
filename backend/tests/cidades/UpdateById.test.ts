import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Cidades - UpdateById', () => {

  it('Update a  register', async () => {

    const result = await testServer
      .post('/cidades')
      .send({ name: 'Petrópolis', state: 'RJ' });

    expect(result.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdated = await testServer
      .put(`/cidades/${result.body}`)
      .send({ nome: 'Caxias' });

    expect(resUpdated.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });
  
  it('Try to update a register that do not exist', async () => {

    const result = await testServer
      .put('/cidades/99999')
      .send({ nome: 'Caxias' });

    expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(result.body).toHaveProperty('errors.default');
  });
});